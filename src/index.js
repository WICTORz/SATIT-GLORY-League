const COOKIE_NAME = "sgl_session";
const SESSION_MS = 8 * 60 * 60 * 1000;
const MAX_BODY = 2_500_000;
const BASE_KEYS = ["muted","notices","awards","feeStatuses","announcement","rules","feeNote","poster","posterText","matchNotes","teamDescriptions"];

function defaults() {
  return {
    muted: false, notices: [], messages: [], players: [], stats: [], awards: [],
    feeStatuses: {}, announcement: "", rules: "", feeNote: "", poster: null,
    posterText: "", matchNotes: {}, teamDescriptions: {}, nextPlayerId: 1,
    statuses: {}, scores: {}, admin: false
  };
}

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Frame-Options": "DENY",
      ...extra
    }
  });
}

const TRUSTED_ORIGINS = new Set([
  "https://wictorz.github.io",
  "http://localhost:8787",
  "http://127.0.0.1:8787"
]);

function isTrustedOrigin(request) {
  const origin = request.headers.get("Origin");
  return Boolean(origin && (origin === new URL(request.url).origin || TRUSTED_ORIGINS.has(origin)));
}

function corsHeaders(request) {
  const origin = request.headers.get("Origin");
  if (!isTrustedOrigin(request)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}

function withCors(request, response) {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(corsHeaders(request))) headers.set(name, value);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

async function readJson(request) {
  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_BODY) throw new Response("Request too large", { status: 413 });
  try { return JSON.parse(text); }
  catch { throw new Response("Invalid JSON", { status: 400 }); }
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function cleanBaseState(input) {
  if (!isRecord(input)) throw new Error("state must be an object");
  const state = defaults();
  for (const key of BASE_KEYS) {
    if (Object.hasOwn(input, key)) state[key] = input[key];
  }
  if (!Array.isArray(state.notices) || !Array.isArray(state.awards) ||
      !isRecord(state.feeStatuses) || !isRecord(state.matchNotes) ||
      !isRecord(state.teamDescriptions)) throw new Error("invalid state data");
  if (typeof state.announcement !== "string" || state.announcement.length > 12000 ||
      typeof state.rules !== "string" || state.rules.length > 12000 ||
      typeof state.feeNote !== "string" || state.feeNote.length > 12000 ||
      typeof state.posterText !== "string" || state.posterText.length > 12000 ||
      (state.poster !== null && (typeof state.poster !== "string" || state.poster.length > 1_800_000))) {
    throw new Error("state field is too large or invalid");
  }
  state.muted = Boolean(state.muted);
  return state;
}

async function saveBase(env, state) {
  const data = JSON.stringify(cleanBaseState(state));
  if (new TextEncoder().encode(data).byteLength > 1_900_000) throw new Error("state is larger than the D1 row limit");
  const now = Date.now();
  await env.DB.prepare(
    "INSERT INTO app_state (id, data, updated_at) VALUES (1, ?, ?) ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at"
  ).bind(data, now).run();
}

function toHex(bytes) {
  return Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, "0")).join("");
}

async function sha256(value) {
  return toHex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
}

function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function constantTimeEqual(left, right) {
  let difference = left.length ^ right.length;
  const length = Math.max(left.length, right.length);
  for (let i = 0; i < length; i++) difference |= (left.charCodeAt(i) || 0) ^ (right.charCodeAt(i) || 0);
  return difference === 0;
}

async function getSession(request, env) {
  const cookie = request.headers.get("Cookie") || "";
  const item = cookie.split(";").map(value => value.trim()).find(value => value.startsWith(COOKIE_NAME + "="));
  if (!item) return null;
  const token = item.slice(COOKIE_NAME.length + 1);
  if (!token) return null;
  const hash = await sha256(token);
  const row = await env.DB.prepare("SELECT expires_at FROM sessions WHERE token_hash = ?").bind(hash).first();
  if (!row || row.expires_at <= Date.now()) {
    if (row) await env.DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(hash).run();
    return null;
  }
  return { tokenHash: hash };
}

function cookieHeader(value, request, maxAge) {
  return COOKIE_NAME + "=" + value + "; Path=/; HttpOnly; SameSite=None; Secure; Partitioned; Max-Age=" + maxAge;
}

async function readFullState(env, admin) {
  const statements = [
    env.DB.prepare("SELECT data FROM app_state WHERE id = 1"),
    env.DB.prepare("SELECT id, name, full_name, team, position FROM players ORDER BY id"),
    env.DB.prepare("SELECT id, week, name, team, goals, assists, points FROM player_stats ORDER BY id"),
    env.DB.prepare("SELECT week, match_index, home_score, away_score, status FROM matches ORDER BY week, match_index")
  ];
  if (admin) statements.push(env.DB.prepare("SELECT id, type, name, text, created_at FROM inbox ORDER BY id DESC LIMIT 500"));
  const results = await env.DB.batch(statements);
  let base = defaults();
  try {
    const stored = results[0].results?.[0]?.data;
    if (stored) base = { ...base, ...JSON.parse(stored) };
  } catch { /* Keep safe defaults if an older state row is malformed. */ }

  base.players = (results[1].results || []).map(row => ({
    id: "Player " + row.id, name: row.name, full: row.full_name, team: row.team, position: row.position
  }));
  base.nextPlayerId = Math.max(1, ...base.players.map(player => Number(String(player.id).replace("Player ", "")) + 1));
  base.stats = (results[2].results || []).map(row => ({
    id: row.id, week: row.week, name: row.name, team: row.team,
    goals: row.goals, assists: row.assists, points: row.points
  }));
  base.statuses = {};
  base.scores = {};
  for (const row of results[3].results || []) {
    const key = row.week + "-" + row.match_index;
    if (row.status) base.statuses[key] = row.status;
    if (row.home_score !== null || row.away_score !== null) {
      base.scores[key] = {};
      if (row.home_score !== null) base.scores[key].homeScore = row.home_score;
      if (row.away_score !== null) base.scores[key].awayScore = row.away_score;
    }
  }
  base.messages = admin ? (results[4]?.results || []).map(row => ({
    id: row.id, type: row.type, name: row.name, text: row.text,
    time: new Date(row.created_at).toLocaleString("th-TH")
  })) : [];
  base.admin = admin;
  return base;
}

async function checkMessageLimit(request, env) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const key = await sha256((env.ADMIN_PASSWORD || "") + ":message:" + ip);
  const now = Date.now(), reset = now + 15 * 60 * 1000;
  await env.DB.prepare(
    "INSERT INTO message_attempts (ip_hash, attempts, reset_at) VALUES (?, 1, ?) " +
    "ON CONFLICT(ip_hash) DO UPDATE SET attempts = CASE WHEN reset_at <= ? THEN 1 ELSE attempts + 1 END, " +
    "reset_at = CASE WHEN reset_at <= ? THEN ? ELSE reset_at END"
  ).bind(key, reset, now, now, reset).run();
  const row = await env.DB.prepare("SELECT attempts FROM message_attempts WHERE ip_hash = ?").bind(key).first();
  return (row?.attempts || 0) > 100;
}

async function checkLoginLimit(request, env) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const key = await sha256((env.ADMIN_PASSWORD || "") + ":" + ip);
  const now = Date.now(), reset = now + 15 * 60 * 1000;
  await env.DB.prepare(
    "INSERT INTO login_attempts (ip_hash, attempts, reset_at) VALUES (?, 1, ?) " +
    "ON CONFLICT(ip_hash) DO UPDATE SET attempts = CASE WHEN reset_at <= ? THEN 1 ELSE attempts + 1 END, " +
    "reset_at = CASE WHEN reset_at <= ? THEN ? ELSE reset_at END"
  ).bind(key, reset, now, now, reset).run();
  const row = await env.DB.prepare("SELECT attempts FROM login_attempts WHERE ip_hash = ?").bind(key).first();
  return (row?.attempts || 0) > 30;
}

async function migrateLegacy(request, env) {
  if (!isTrustedOrigin(request)) return json({ error: "same-origin request required" }, 403);
  const session = await getSession(request, env);
  if (!session) return json({ error: "admin login required" }, 401);
  const body = await readJson(request);
  if (!isRecord(body) || !isRecord(body.state)) return json({ error: "invalid request" }, 400);
  let base;
  try { base = cleanBaseState(body.state); }
  catch (error) { return json({ error: error.message }, 400); }
  const legacy = body.state;
  const counts = await env.DB.batch([
    env.DB.prepare("SELECT COUNT(*) AS count FROM players"),
    env.DB.prepare("SELECT COUNT(*) AS count FROM player_stats"),
    env.DB.prepare("SELECT COUNT(*) AS count FROM inbox"),
    env.DB.prepare("SELECT COUNT(*) AS count FROM matches"),
    env.DB.prepare("SELECT data FROM app_state WHERE id = 1")
  ]);
  const storedText = counts[4].results?.[0]?.data || "{}";
  let existing = {};
  try { existing = JSON.parse(storedText); } catch {}
  const existingHasData = (counts[0].results?.[0]?.count || 0) +
    (counts[1].results?.[0]?.count || 0) + (counts[2].results?.[0]?.count || 0) +
    (counts[3].results?.[0]?.count || 0) > 0 ||
    Boolean(existing.announcement || existing.rules || existing.poster);
  if (existingHasData) return json({ error: "server already contains saved data" }, 409);

  const importToken = randomToken();
  const statements = [
    env.DB.prepare("INSERT OR IGNORE INTO app_meta (key, value) VALUES ('legacy_import', ?)").bind(importToken),
    env.DB.prepare(
      "INSERT INTO app_state (id, data, updated_at) SELECT 1, ?, ? WHERE (SELECT value FROM app_meta WHERE key='legacy_import') = ? " +
      "ON CONFLICT(id) DO UPDATE SET data=excluded.data, updated_at=excluded.updated_at"
    ).bind(JSON.stringify(base), Date.now(), importToken),
    env.DB.prepare(
      "INSERT OR IGNORE INTO players (id, name, full_name, team, position) " +
      "SELECT CAST(REPLACE(json_extract(value,'$.id'),'Player ','') AS INTEGER), " +
      "substr(json_extract(value,'$.name'),1,80), substr(json_extract(value,'$.full'),1,120), " +
      "substr(json_extract(value,'$.team'),1,80), substr(json_extract(value,'$.position'),1,80) " +
      "FROM json_each(?) WHERE (SELECT value FROM app_meta WHERE key='legacy_import') = ?"
    ).bind(JSON.stringify(Array.isArray(legacy.players) ? legacy.players : []), importToken),
    env.DB.prepare(
      "INSERT INTO player_stats (week, name, team, goals, assists, points) " +
      "SELECT substr(json_extract(value,'$.week'),1,20), substr(json_extract(value,'$.name'),1,80), " +
      "substr(json_extract(value,'$.team'),1,80), min(max(CAST(json_extract(value,'$.goals') AS INTEGER),0),100), " +
      "min(max(CAST(json_extract(value,'$.assists') AS INTEGER),0),100), min(max(CAST(json_extract(value,'$.points') AS INTEGER),0),100) " +
      "FROM json_each(?) WHERE (SELECT value FROM app_meta WHERE key='legacy_import') = ?"
    ).bind(JSON.stringify(Array.isArray(legacy.stats) ? legacy.stats : []), importToken),
    env.DB.prepare(
      "INSERT INTO matches (week, match_index, home_score, away_score) " +
      "SELECT CAST(substr(key,1,instr(key,'-')-1) AS INTEGER), CAST(substr(key,instr(key,'-')+1) AS INTEGER), " +
      "json_extract(value,'$.homeScore'), json_extract(value,'$.awayScore') FROM json_each(?) " +
      "WHERE (SELECT value FROM app_meta WHERE key='legacy_import') = ?"
    ).bind(JSON.stringify(isRecord(legacy.scores) ? legacy.scores : {}), importToken),
    env.DB.prepare(
      "INSERT INTO matches (week, match_index, status) " +
      "SELECT CAST(substr(key,1,instr(key,'-')-1) AS INTEGER), CAST(substr(key,instr(key,'-')+1) AS INTEGER), " +
      "substr(value,1,20) FROM json_each(?) WHERE (SELECT value FROM app_meta WHERE key='legacy_import') = ? " +
      "ON CONFLICT(week,match_index) DO UPDATE SET status=excluded.status"
    ).bind(JSON.stringify(isRecord(legacy.statuses) ? legacy.statuses : {}), importToken)
  ];
  const batch = await env.DB.batch(statements);
  if ((batch[0]?.meta?.changes || 0) === 0) return json({ error: "legacy data was already imported" }, 409);
  return json({ ok: true, migrated: true });
}

async function api(request, env) {
  const url = new URL(request.url);
  const method = request.method;
  if (method === "GET" && url.pathname === "/api/health") return json({ ok: true, storage: "D1" });
  if (method === "GET" && url.pathname === "/api/state") {
    const session = await getSession(request, env);
    const state = await readFullState(env, Boolean(session));
    return json({ authenticated: Boolean(session), state });
  }
  if (method === "GET" && url.pathname === "/api/events") {
    return json({ error: "Live updates use state polling on the free tier." }, 410);
  }
  if (method === "POST" && url.pathname === "/api/login") {
    if (!isTrustedOrigin(request)) return json({ error: "same-origin request required" }, 403);
    if (!env.ADMIN_PASSWORD || env.ADMIN_PASSWORD.length < 16) return json({ error: "Admin password is not configured." }, 503);
    if (await checkLoginLimit(request, env)) return json({ error: "try again later" }, 429);
    const body = await readJson(request);
    const password = isRecord(body) && typeof body.password === "string" ? body.password.slice(0, 256) : "";
    if (!constantTimeEqual(password, env.ADMIN_PASSWORD)) return json({ error: "invalid credentials" }, 401);
    const token = randomToken(), tokenHash = await sha256(token), expires = Date.now() + SESSION_MS;
    await env.DB.batch([
      env.DB.prepare("DELETE FROM sessions WHERE expires_at <= ?").bind(Date.now()),
      env.DB.prepare("INSERT INTO sessions (token_hash, expires_at) VALUES (?, ?)").bind(tokenHash, expires),
      env.DB.prepare("DELETE FROM login_attempts WHERE reset_at <= ?").bind(Date.now())
    ]);
    return json({ authenticated: true }, 200, { "Set-Cookie": cookieHeader(token, request, SESSION_MS / 1000) });
  }
  if (method === "POST" && url.pathname === "/api/logout") {
    if (!isTrustedOrigin(request)) return json({ error: "same-origin request required" }, 403);
    const session = await getSession(request, env);
    if (session) await env.DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(session.tokenHash).run();
    return json({ ok: true }, 200, { "Set-Cookie": cookieHeader("", request, 0) });
  }
  if (method === "POST" && url.pathname === "/api/migrate-state") return migrateLegacy(request, env);
  if (method === "PUT" && url.pathname === "/api/state") {
    if (!isTrustedOrigin(request)) return json({ error: "same-origin request required" }, 403);
    if (!await getSession(request, env)) return json({ error: "admin login required" }, 401);
    const body = await readJson(request);
    try { await saveBase(env, body?.state); }
    catch (error) { return json({ error: error.message }, 400); }
    return json({ ok: true, updatedAt: Date.now() });
  }
  if (method === "POST" && url.pathname === "/api/match-update") {
    if (!isTrustedOrigin(request)) return json({ error: "same-origin request required" }, 403);
    if (!await getSession(request, env)) return json({ error: "admin login required" }, 401);
    const body = await readJson(request);
    const week = Number(body?.week), index = Number(body?.index), field = body?.field;
    if (!Number.isInteger(week) || week < 1 || week > 11 || !Number.isInteger(index) || index < 0 || index > 5) return json({ error: "invalid match" }, 400);
    if (field === "status") {
      if (!["Upcoming...", "HT", "FT", "◉ LIVE!"].includes(body.value)) return json({ error: "invalid status" }, 400);
      await env.DB.prepare(
        "INSERT INTO matches (week, match_index, status) VALUES (?, ?, ?) ON CONFLICT(week,match_index) DO UPDATE SET status=excluded.status"
      ).bind(week, index, body.value).run();
    } else if (field === "homeScore" || field === "awayScore") {
      const value = body.value;
      if (value !== null && (!Number.isInteger(value) || value < 0 || value > 99)) return json({ error: "invalid score" }, 400);
      const column = field === "homeScore" ? "home_score" : "away_score";
      await env.DB.prepare(
        "INSERT INTO matches (week, match_index, " + column + ") VALUES (?, ?, ?) ON CONFLICT(week,match_index) DO UPDATE SET " + column + "=excluded." + column
      ).bind(week, index, value).run();
    } else return json({ error: "invalid field" }, 400);
    return json({ ok: true, updatedAt: Date.now() });
  }
  if (method === "POST" && url.pathname === "/api/players") {
    if (!isTrustedOrigin(request)) return json({ error: "same-origin request required" }, 403);
    if (!await getSession(request, env)) return json({ error: "admin login required" }, 401);
    const body = await readJson(request);
    const name = typeof body?.name === "string" ? body.name.trim().slice(0, 80) : "";
    const full = typeof body?.full === "string" ? body.full.trim().slice(0, 120) : "";
    const team = typeof body?.team === "string" ? body.team.trim().slice(0, 80) : "";
    const position = typeof body?.position === "string" ? body.position.trim().slice(0, 80) : "";
    if (!name || !team || !position) return json({ error: "name, team and position are required" }, 400);
    const inserted = await env.DB.prepare("INSERT INTO players (name, full_name, team, position) VALUES (?, ?, ?, ?)").bind(name, full, team, position).run();
    const id = Number(inserted.meta.last_row_id);
    return json({ ok: true, player: { id: "Player " + id, name, full, team, position }, nextPlayerId: id + 1 }, 201);
  }
  if (method === "POST" && url.pathname === "/api/players/remove") {
    if (!isTrustedOrigin(request)) return json({ error: "same-origin request required" }, 403);
    if (!await getSession(request, env)) return json({ error: "admin login required" }, 401);
    const body = await readJson(request);
    const match = typeof body?.id === "string" ? body.id.match(/^Player (\d+)$/) : null;
    if (!match) return json({ error: "invalid player id" }, 400);
    await env.DB.prepare("DELETE FROM players WHERE id = ?").bind(Number(match[1])).run();
    return json({ ok: true });
  }
  if (method === "POST" && url.pathname === "/api/player-stats") {
    if (!isTrustedOrigin(request)) return json({ error: "same-origin request required" }, 403);
    if (!await getSession(request, env)) return json({ error: "admin login required" }, 401);
    const body = await readJson(request);
    const name = typeof body?.name === "string" ? body.name.trim().slice(0, 80) : "";
    const team = typeof body?.team === "string" ? body.team.trim().slice(0, 80) : "";
    const week = String(body?.week || "").slice(0, 20);
    const goals = Number(body?.goals), assists = Number(body?.assists), points = Number(body?.points);
    if (!name || !team || !week || ![goals, assists, points].every(value => Number.isInteger(value) && value >= 0 && value <= 100)) return json({ error: "invalid player stats" }, 400);
    await env.DB.prepare("INSERT INTO player_stats (week, name, team, goals, assists, points) VALUES (?, ?, ?, ?, ?, ?)").bind(week, name, team, goals, assists, points).run();
    return json({ ok: true }, 201);
  }
  if (method === "POST" && url.pathname === "/api/messages/remove") {
    if (!isTrustedOrigin(request)) return json({ error: "same-origin request required" }, 403);
    if (!await getSession(request, env)) return json({ error: "admin login required" }, 401);
    const body = await readJson(request);
    const id = Number(body?.id);
    if (!Number.isInteger(id) || id < 1) return json({ error: "invalid message id" }, 400);
    await env.DB.prepare("DELETE FROM inbox WHERE id = ?").bind(id).run();
    return json({ ok: true });
  }
  if (method === "POST" && url.pathname === "/api/messages") {
    if (!isTrustedOrigin(request)) return json({ error: "same-origin request required" }, 403);
    if (await checkMessageLimit(request, env)) return json({ error: "too many messages" }, 429);
    const body = await readJson(request);
    const name = typeof body?.name === "string" ? body.name.trim().slice(0, 100) : "";
    const text = typeof body?.text === "string" ? body.text.trim().slice(0, 2000) : "";
    const type = typeof body?.type === "string" ? body.type.trim().slice(0, 60) : "";
    if (!name || !text || !type) return json({ error: "name, type and text are required" }, 400);
    const result = await env.DB.prepare("INSERT INTO inbox (type, name, text, created_at) VALUES (?, ?, ?, ?)").bind(type, name, text, Date.now()).run();
    return json({ ok: true, id: result.meta.last_row_id }, 201);
  }
  if (url.pathname.startsWith("/api/")) return json({ error: "not found" }, 404);
  return env.ASSETS.fetch(request);
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      if (!isTrustedOrigin(request)) return json({ error: "origin not allowed" }, 403);
      return withCors(request, new Response(null, { status: 204 }));
    }
    try { return withCors(request, await api(request, env)); }
    catch (error) {
      if (error instanceof Response) return withCors(request, error);
      console.error("Worker request failed", error);
      return withCors(request, json({ error: "server error" }, 500));
    }
  }
};

