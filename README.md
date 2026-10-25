# SATIT Glory League

เว็บ SATIT Glory League ใช้ GitHub Pages สำหรับหน้าเว็บ และ Cloudflare Workers + D1 สำหรับ API และข้อมูลถาวร

- หน้าเว็บหลัก: https://wictorz.github.io/football-league/
- Worker API: https://satit-glory-league.ewikzorpc.workers.dev
- Worker อนุญาต CORS เฉพาะ `https://wictorz.github.io` และใช้ HttpOnly partitioned session cookie สำหรับ Admin

## Cloudflare setup

`wrangler.jsonc` มี D1 database ID ที่สร้างไว้แล้ว ใช้ Node.js 20+ จากโฟลเดอร์ repo:

```sh
npm install
npx wrangler login
npm run db:migrate:remote
npx wrangler secret put ADMIN_PASSWORD
npm run deploy
```

เมื่อตั้ง secret ให้พิมพ์รหัส Admin อย่างน้อย 16 ตัวอักษรใน prompt ของ Wrangler และอย่า commit รหัสลง Git

Cloudflare Worker ให้บริการ API และไฟล์ static ของตัวเอง ส่วน GitHub Pages ให้บริการหน้าเว็บที่ URL เดิม โดย frontend เรียก API ที่ Worker URL ด้านบน

## Local development

```sh
npm install
npm run db:migrate:local
npm run dev
```

Wrangler ใช้ D1 local แยกจากฐานข้อมูล production

