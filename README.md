# SATIT GLORY League

เว็บลีกพร้อม API และฐานข้อมูลถาวรบน Cloudflare Workers + D1 มีโควต้าฟรีที่เหมาะกับเว็บลีกขนาดเล็ก ไม่ต้องใช้ Render หรือ disk server

## ตั้งค่า Cloudflare ฟรี

ต้องมี Node.js 20+ และบัญชี Cloudflare

1. Merge PR นี้เข้าที่ `main` แล้ว clone repository ลงเครื่อง
2. ติดตั้ง Wrangler: `npm install`
3. ล็อกอิน Cloudflare: `npx wrangler login`
4. สร้าง D1 database: `npm run db:create`
5. คัดลอก `database_id` ที่ Wrangler แสดง ไปแทน `REPLACE_WITH_D1_DATABASE_ID` ใน `wrangler.jsonc` แล้ว commit/push
6. สร้าง schema: `npm run db:migrate:remote`
7. ตั้งรหัส Admin เป็น secret (อย่างน้อย 16 ตัวอักษร): `npx wrangler secret put ADMIN_PASSWORD`
8. Deploy เว็บและ API: `npm run deploy`

Cloudflare จะให้ URL แบบ `*.workers.dev`; เปิด URL นี้แล้วกดปุ่มเฟืองเพื่อเข้า Admin รหัสเดียวกันใช้ล็อกอินจากโทรศัพท์ทีมงานหลายเครื่องได้ แต่แต่ละเครื่องได้ session cookie แยกกัน

## ใช้ในเครื่อง

```sh
npm install
npm run db:migrate:local
npm run dev
```

เปิด URL ที่ Wrangler แสดง โดย local development จะใช้ D1 local แยกจากฐานข้อมูล production

## ข้อมูลที่บันทึก

- ผล/สถานะแต่ละคู่, รายชื่อนักเตะ, สถิติ, ประกาศ, ตารางคะแนน, โปสเตอร์ และกล่องข้อความเก็บใน D1
- คะแนนและข้อมูลนักเตะบันทึกเป็นรายการแยก เพื่อไม่ให้การแก้ข้อมูลลีกจากอุปกรณ์อื่นเขียนทับกัน
- หน้าที่เปิดอยู่ดึงข้อมูลล่าสุดจาก API ทุก 5 วินาที
- session และข้อมูล inbox ถูกแยกจาก public state; รหัสผ่านอยู่ใน Worker secret เท่านั้น
- หากมีข้อมูลนักเตะและสถิติเดิมใน local storage ระบบจะนำเข้าครั้งแรกที่ Admin ล็อกอิน หากฐานข้อมูล D1 ยังไม่มีข้อมูล

โควต้าปัจจุบันของ D1 Free คือ 500 MB ต่อฐานข้อมูล และ Workers Free จำกัด 100,000 requests ต่อวัน; static assets เสิร์ฟฟรีและไม่จำกัดจำนวน request ทั้งนี้ quota อาจเปลี่ยนแปลงได้ตาม Cloudflare
