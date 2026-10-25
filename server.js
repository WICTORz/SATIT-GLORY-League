'use strict';

const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');

const PORT = Number(process.env.PORT || 3000);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'league-state.json');
const MAX_BODY = 2_500_000;
const SESSION_TTL = 8 * 60 * 60 * 1000;
const COOKIE_NAME = 'sgl_admin';
const sessions = new Map();
const limits = new Map();
let writeQueue = Promise.resolve();
let store = null;

if (ADMIN_PASSWORD.length < 16) {
  console.error('Set ADMIN_PASSWORD to a secret of at least 16 characters before starting the server.');
  process.exit(1);
}

const defaults = () => ({
  _updatedAt: Date.now(), admin: false, muted: false, notices: [], messages: [],
  players: [], stats: [], awards: [], feeStatuses: {}, announcement: '', rules: '',
  feeNote: '', poster: null, posterText: '', matchNotes: {}, teamDescriptions: {},
  nextPlayerId: 1, statuses: {}
});

function send(res, status, body, headers = {}) {
  const payload = body == null ? '' : JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...headers
  });
  res.end(payload);
}

function secureHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
}

function requestOriginMatches(req) {
  const origin = req.headers.origin;
  if (!origin) return false;
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim();
  const proto = (req.headers['x-forwarded-proto'] || (req.socket.encrypted ? 'https' : 'http')).split(',')[0].trim();
  if (!host || !['http', 'https'].includes(proto)) return false;
  try { return new URL(origin).origin === proto + '://' + host; } catch { return false; }
}

function clientIp(req) {
  return (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim();
}

function limited(key, max, windowMs) {
  const now = Date.now();
  let entry = limits.get(key);
  if (!entry || entry.resetAt <= now) entry = { count: 0, resetAt: now + windowMs };
  entry.count += 1;
  limits.set(key, entry);
  if (limits.size > 2000) {
    for (const [k, v] of limits) if (v.resetAt <= now) limits.delete(k);
  }
  return entry.count > max;
}

function sessionFor(req) {
  const header = req.headers.cookie || '';
  const item = header.split(';').map(v => v.trim()).find(v => v.startsWith(COOKIE_NAME + '='));
  if (!item) return false;
  const token = item.slice(COOKIE_NAME.length + 1);
  const expiry = sessions.get(token);
  if (!expiry) return false;
  if (expiry <= Date.now()) { sessions.delete(token); return false; }
  sessions.set(token, Date.now() + SESSION_TTL);
  return true;
}

function cookie(value, req, maxAge) {
  const secure = process.env.NODE_ENV === 'production' || req.headers['x-forwarded-proto'] === 'https';
  return COOKIE_NAME + '=' + value + '; Path=/; HttpOnly; SameSite=Strict; Max-Age=' + maxAge + (secure ? '; Secure' : '');
}

function publicState() {
  return { ...store, admin: false, messages: [] };
}

function cleanState(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('state must be an object');
  const allowed = ['muted','notices','players','stats','awards','feeStatuses','announcement','rules','feeNote','poster','posterText','matchNotes','teamDescriptions','nextPlayerId','statuses','messages'];
  const next = defaults();
  for (const key of allowed) if (Object.hasOwn(input, key)) next[key] = input[key];
  if (!Array.isArray(next.messages) || !Array.isArray(next.notices) ||
      !Array.isArray(next.players) || !Array.isArray(next.stats) || !Array.isArray(next.awards)) {
    throw new Error('invalid list data');
  }
  next.admin = false;
  next._updatedAt = Date.now();
  return next;
}

async function readJson(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY) throw Object.assign(new Error('request too large'), { status: 413 });
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw Object.assign(new Error('invalid JSON'), { status: 400 }); }
}

async function persist(next) {
  writeQueue = writeQueue.then(async () => {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const temp = DATA_FILE + '.' + crypto.randomBytes(6).toString('hex') + '.tmp';
    await fs.writeFile(temp, JSON.stringify(next), { encoding: 'utf8', mode: 0o600 });
    await fs.rename(temp, DATA_FILE);
    store = next;
  });
  return writeQueue;
}

async function route(req, res) {
  secureHeaders(res);
  const url = new URL(req.url, 'http://localhost');
  const isAdmin = sessionFor(req);

  if (req.method === 'GET' && url.pathname === '/api/health') {
    return send(res, 200, { ok: true, storage: 'ready' });
  }
  if (req.method === 'GET' && url.pathname === '/api/state') {
    return send(res, 200, { authenticated: isAdmin, state: isAdmin ? store : publicState() });
  }
  if (req.method === 'POST' && url.pathname === '/api/login') {
    if (!requestOriginMatches(req)) return send(res, 403, { error: 'same-origin request required' });
    const ip = clientIp(req);
    if (limited('login:' + ip, 8, 15 * 60 * 1000)) return send(res, 429, { error: 'try again later' });
    const body = await readJson(req);
    const supplied = typeof body.password === 'string' ? body.password : '';
    const expected = Buffer.from(ADMIN_PASSWORD);
    const actual = Buffer.from(supplied);
    const matches = actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
    if (!matches) return send(res, 401, { error: 'invalid credentials' });
    const token = crypto.randomBytes(32).toString('base64url');
    sessions.set(token, Date.now() + SESSION_TTL);
    return send(res, 200, { authenticated: true }, { 'Set-Cookie': cookie(token, req, SESSION_TTL / 1000) });
  }
  if (req.method === 'POST' && url.pathname === '/api/logout') {
    if (!requestOriginMatches(req)) return send(res, 403, { error: 'same-origin request required' });
    const header = req.headers.cookie || '';
    const item = header.split(';').map(v => v.trim()).find(v => v.startsWith(COOKIE_NAME + '='));
    if (item) sessions.delete(item.slice(COOKIE_NAME.length + 1));
    return send(res, 200, { ok: true }, { 'Set-Cookie': cookie('', req, 0) });
  }
  if (req.method === 'PUT' && url.pathname === '/api/state') {
    if (!requestOriginMatches(req)) return send(res, 403, { error: 'same-origin request required' });
    if (!isAdmin) return send(res, 401, { error: 'admin login required' });
    const body = await readJson(req);
    let next;
    try { next = cleanState(body.state); }
    catch (error) { return send(res, 400, { error: error.message }); }
    await persist(next);
    return send(res, 200, { ok: true, updatedAt: next._updatedAt });
  }
  if (req.method === 'POST' && url.pathname === '/api/messages') {
    if (!requestOriginMatches(req)) return send(res, 403, { error: 'same-origin request required' });
    if (limited('messages:' + clientIp(req), 20, 15 * 60 * 1000)) return send(res, 429, { error: 'too many messages' });
    const body = await readJson(req);
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : '';
    const text = typeof body.text === 'string' ? body.text.trim().slice(0, 2000) : '';
    const type = typeof body.type === 'string' ? body.type.trim().slice(0, 60) : '';
    if (!name || !text || !type) return send(res, 400, { error: 'name, type and text are required' });
    const next = { ...store, messages: [{ type, name, text, time: new Date().toLocaleString('th-TH') }, ...store.messages].slice(0, 500), _updatedAt: Date.now() };
    await persist(next);
    return send(res, 201, { ok: true });
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 404, { error: 'not found' });
  const pathname = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
  const filePath = path.resolve(__dirname, '.' + pathname);
  if (!filePath.startsWith(path.resolve(__dirname) + path.sep)) return send(res, 403, { error: 'forbidden' });
  try {
    const data = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml' };
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream', 'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600' });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { send(res, 404, { error: 'not found' }); }
}

async function start() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const parsed = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
    store = cleanState(parsed);
    store._updatedAt = parsed._updatedAt || Date.now();
  } catch (error) {
    if (error.code !== 'ENOENT') console.error('Could not load saved data; starting with an empty league state:', error.message);
    store = defaults();
    await persist(store);
  }
  http.createServer((req, res) => {
    route(req, res).catch(error => {
      console.error('Request failed:', error.message);
      if (!res.headersSent) send(res, error.status || 500, { error: error.status ? error.message : 'server error' });
      else res.destroy();
    });
  }).listen(PORT, '0.0.0.0', () => console.log('SATIT Glory League server listening on port ' + PORT));
}

start().catch(error => { console.error('Server startup failed:', error); process.exit(1); });
