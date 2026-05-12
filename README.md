# **📂 Project Structure & Architecture Guidelines**

เอกสารฉบับนี้อธิบายโครงสร้างไฟล์และการจัดเก็บโค้ดของโปรเจค เพื่อให้ทีมพัฒนาเข้าใจตรงกันและสามารถดูแลรักษาโค้ดได้ง่ายในระยะยาว โดยโปรเจคนี้ยึดหลักการ **Feature-based Architecture** (แยกโฟลเดอร์ตามฟีเจอร์การทำงาน)

---

## **🌳 Overview**

ภาพรวมโครงสร้างโฟลเดอร์หลักของโปรเจค

```bash
├── app/                 # Next.js App Router (Routing Layer เท่านั้น)
├── components/          # Global / Shared UI Components ที่ใช้ร่วมกันทั้งเว็บ
│   ├── ui/              # Shadcn UI components (ห้ามแก้ไข core files)
│   └── share/           # Custom reusable components (Navbar, Footer, etc.)
├── feature/             # Business Logic หลัก แบ่งตาม Feature
│   ├── auth/            # ตัวอย่าง Feature: Authentication
│   │   ├── login/       # Sub-feature: Login
│   │   │   ├── action/     # Server Actions
│   │   │   ├── component/  # UI Components เฉพาะหน้า Login
│   │   │   └── db/         # Database Queries / API Calls
│   └── ...
├── lib/                 # Utilities, Helper Functions, Constants
└── public/              # Static Assets (Images, Fonts, Icons)
```

---

## **📝 Detailed Guideline**

### 1. app/ (Routing Layer)

- โฟลเดอร์นี้ทำหน้าที่จัดการ Routing ของแอปพลิเคชันตามมาตรฐาน Next.js App Router เท่านั้น

- **หน้าที่:** เก็บไฟล์ `page.tsx`, `layout.tsx`, `loading.tsx` เพื่อกำหนด URL Path

- **ข้อตกลง:** พยายามเขียน Logic ในนี้น้อยที่สุด ให้เน้นการ import Components จาก feature/ มาแสดงผลแทน เพื่อให้โค้ดดูสะอาดและจัดการ Route ได้ง่าย

- **ตัวอย่าง:** `/app/auth/login/page.tsx -> สำหรับ URL /auth/login`

### 2. components/ (Global UI Components)

- เก็บ UI Component กลางที่ถูกเรียกใช้ซ้ำๆ ในหลายส่วนของโปรเจค โดยแบ่งเป็น 2 ส่วนหลัก:

- **`ui/` (Shadcn UI):** เก็บ Base Component ที่ติดตั้งมาจาก shadcn/ui (เช่น Button, Input, Card)

> ⛔️ ห้ามแก้ไขไฟล์ในนี้หากไม่จำเป็น เพื่อให้ง่ายต่อการอัปเดต library ในอนาคต หากต้องการปรับแก้ Style ให้ทำผ่าน Props หรือ className แทน

- **`share/` (Custom Shared Components):** เก็บ Component ที่เราเขียนเองและ ถูกใช้ซ้ำในหลาย Page, Feature (เช่น Navbar, Footer, CustomLoader, ErrorState)

> ✅ คำแนะนำ: ควรสร้างเป็น Folder ย่อยตามชื่อ Component นั้นๆ เพื่อความเป็นระเบียบ

### 3. feature/ (Business Logic & Features) ⭐ สำคัญ

- นี่คือหัวใจหลักของโปรเจค เราใช้โครงสร้างแบบ Vertical Slice คือการรวมทุกไฟล์ที่เกี่ยวข้องกับ Feature หนึ่งๆ ไว้ด้วยกัน แทนที่จะแยกตามประเภทไฟล์

- ให้สร้าง Folder ตามชื่อ Feature หลัก และ Feature ย่อย (ถ้ามี) ภายในประกอบด้วย:

- **`action/`:** เก็บ Server Actions ('use server') สำหรับจัดการ Logic ฝั่ง Server, Form Handling หรือ API Calls

- **`component/`:** เก็บ React Component ที่ใช้ เฉพาะใน Feature นี้เท่านั้น (ไม่ได้ถูกใช้ที่อื่น)

- **`db/`**: เก็บฟังก์ชันสำหรับติดต่อ Database (Prisma/SQL)

- **`types.ts` (Optional):** เก็บ Type/Interface เฉพาะของ Feature นี้

ตัวอย่างโครงสร้าง:

```bash
feature/
└── auth/                # Main Feature
    ├── login/           # Sub-feature: Login
    │   ├── action/      # action-login.ts (Login Logic)
    │   ├── component/   # login-form.tsx (UI Form)
    │   └── db/          # get-user.ts (DB Query)
    └── logout/          # Sub-feature: Logout

```

### 4. lib/ (Utilities & Helpers)

- เก็บฟังก์ชันอำนวยความสะดวก, ค่าคงที่ (Constants), หรือ Configuration ที่ต้องถูกเรียกใช้จากหลายๆ ที่ในโปรเจค

- **ข้อตกลง:** ควรสร้าง Folder แยกตามหมวดหมู่การใช้งาน

- **ตัวอย่าง:**

  `lib/auth/`: ฟังก์ชันเกี่ยวกับการแกะ Session, Auth Options

  `lib/token/`: ฟังก์ชัน Verify/Sign Token

  `lib/utils.ts`: Utility function ทั่วไป (เช่น cn class merge)

  `lib/EnumToThai/`: ฟังก์ชันแปลง Enum Value เป็นภาษาไทย

### 5. public/ (Static Assets)

- เก็บไฟล์ Static ที่เข้าถึงได้ผ่าน URL โดยตรง

- **`image/`:** เก็บรูปภาพ โดยควรแยก Folder ย่อย เช่น bg, logo, icon

- **`font/`:** เก็บไฟล์ Font

---

## 💡 Summary Checklist สำหรับ Dev

- [x] จะเพิ่มหน้าเว็บใหม่? -> สร้าง Folder ใน **`app/`**

- [x] จะสร้างปุ่ม SubmitBTN ที่ใช้ได้ทุกหน้า? -> ใน **`components/share`**/submit-btn

- [x] จะทำระบบ "สมัครสมาชิก"? -> สร้าง Folder **`feature`**/register แล้วใส่ไว้ใน folder `action`, `component`, `db` ไว้ในนั้น

- [x] จะเขียนฟังก์ชันแปลงวันที่? -> ใส่ใน **`lib`**/date-format

---

## 🗂️ การตั้งชื่อโฟลเดอร์ ไฟล์ และ Function

- โดยรวมหากชื่อ**โฟลเดอร์**หรือ**ไฟล์**มีการเว้นวรรคให้ใช้ `-` ในการเว้นวรรค
- ในขณะที่ในชื่อ**ฟังก์ชั่น**ให้วรรคด้วยการใช้ตัวพิมพ์ใหญ่

โดยจะมีข้อตกลงพิเศษอื่นๆ ดังนี้

### URL (Path Name)

- ให้ตั้งชื่อ Main Function ใน `layout.tsx` ว่า `{ชื่อ url_path}Layout()`
- ให้ตั้งชื่อ Main Function ใน `page.tsx` ว่า `{ชื่อ url_path}Page()`
- **ตัวอย่างเช่น** : จะสร้าง Path สำหรับ Select Role

```
  └── app/
      └── select-role/
          ├── page.tsx --> SelectRole() - (Func ใน .tsx ต้องขึ้นต้นด้วยตัวพิมพ์ใหญ่)
          └── layout.tsx --> SelectRoleLayout() - (Func ใน .tsx ต้องขึ้นต้นด้วยตัวพิมพ์ใหญ่)
```

### Component

- ตั้งชื่อ Main Function ให้สอดคล้องกับชื่อไฟล์
- **ตัวอย่างเช่น** : จะสร้าง Component ปุ่มสำหรับ submit
  - **ชื่อไฟล์** : `submit-btn.tsx`
  - **main function** : `SubmitBtn()` - (Func ใน .tsx ต้องขึ้นต้นด้วยตัวพิมพ์ใหญ่)

### Action

- ตั้งชื่อไฟล์หรือโฟลเดอร์ด้วยรูปแบบดังนี้ `action-{ชื่อ action}`
- ตั้งชื่อ Main Function ให้สอดคล้องกับชื่อไฟล์ โดยมีรูปแบบว่า `{ชื่อ action}Action()`
- **ตัวอย่างเช่น** : จะสร้าง action สำหรับปุ่ม login

```
    feature/
    └── auth/
        └── login/
           └── action/
                └── action-submit-login.ts --> submitLoginAction()
```

### DB

- ตั้งชื่อไฟล์หรือโฟลเดอร์ด้วยรูปแบบดังนี้ `db-{รูปแบบการสื่อสาร}-{ข้อมูล}`
- **รูปแบบการสื่อสาร** เช่น
  - get
  - create
  - update
  - delete
- ตั้งชื่อ Main Function ให้สอดคล้องกับชื่อไฟล์ โดยมีรูปแบบว่า `{รูปแบบการสื่อสาร}-{ข้อมูล}-DB()`
- **ตัวอย่างเช่น** : จะสร้างไฟล์สำหรับขอข้อมูล user

```
    feature/
    └── user/
        └── db/
            └── db-get-user-data.ts -> getUserDataDB()
```

---

## ⚙️ ENV

- เมื่อ Clone Project ลงเครื่องแล้ว ให้เพิ่มไฟล์ `.env` โดยดูตัวอย่าง key ต่างๆ ที่จำเป็นต้องใช้ใน `.env.example`

- อธิบาย KEY ใน .env

  **`JWT_SECRET_KEY`** : เก็บ key ที่ใช้สำหรับเข้ารหัส JWT Token ในขั้นตอนทำ user authen

  **`BACKEND_URL`** : เก็บ url ของ Backend Server ของระบบ ไม่ต้องมี `/` ปิดท้าย เช่น `BACKEND_URL=http://localhost:3030`

  **`DATABASE_URL`** : เก็บ url ของ PostgreSQL Server ของระบบ

---

## 💾 Prisma Generate

  - ใน src code เวอร์ชั่นใดที่มีการติดตั้ง Prisma ไว้แล้ว ให้เช็คว่าทุกคนในทีมพัฒนาใช้ DB ที่มี Schema ตรงกันและให้เป็น version ล่าสุดเสมอ (กรุณาติดตามการอัปเดทฐานข้อมูลอย่างสม่ำเสมอ) 
  - ใช้คำสั่ง **`npx prisma generate`** ทุกครั้งเมื่อมีการเปลี่ยนแปลงแก้ไขโครงสร้างฐานข้อมูล หรือ schema.prisma เพื่อความชัวร์ให้ทำทุกครั้งก่อนการพัฒนาก็ได้ เพื่อให้ prisma client รู้จักโครงสร้างฐานข้อมูลในเครื่อง

---

## 💽 Git Commit Message

ให้เขียน git commit message ในรูปแบบเดียวกันนี้ เพื่อง่ายต่อการพัฒนาร่วมกัน และการติดตาม ver ของ Project

# **`<type>: <subject>`**

- **Type มีดังนี้ :**
  - **`feat`** : **New Feature (เพิ่มฟีเจอร์ใหม่)**
    - เมื่อมีการเพิ่มหน้าใหม่, เพิ่มปุ่มใหม่, หรือเพิ่ม logic การทำงานใหม่
  - **`fix`** : **Bug Fix (แก้ไขบั๊ก)**
    - เมื่อโค้ดเดิมทำงานผิดพลาด แล้วเราไปแก้ให้ถูก
  - **`ui`** : **Edit, Change UI (แก้ไข UI)**
    - เมื่อแก้ไขสไตล์ UI ของหน้าหรือ Component ใดๆ
  - **`pris`** : **Update Prisma Schema (อัปเดต Prisma Schema)**
    - เมื่อมีการอัปเดต schema.prisma จากการแก้ไข DB
  - **`refactor`** : **Refactoring (รื้อโค้ดใหม่แต่ผลลัพธ์เดิม)**
    - เมื่อมีกาปรับโครงสร้างโค้ดให้สะอาดขึ้น, ลดความซับซ้อน, เปลี่ยนชื่อตัวแปร แต่ ไม่แก้บั๊กและไม่เพิ่มฟีเจอร์
  - **`perf`** : **Performance (ปรับปรุงประสิทธิภาพ)**
    - แก้โค้ดเพื่อให้เว็บโหลดเร็วขึ้น, ลดการใช้แรม
  - **`style`** : **Styles (จัดรูปแบบโค้ด)**
    - การจัดย่อหน้า, เคาะบรรทัด, ลบ semicolon ที่เกินมา (Code Formatting)
  - **`docs`** : **Documentation (เอกสาร)**
    - แก้ไขไฟล์ README, เพิ่ม Comment อธิบายโค้ด
  - **`chore`** : **Chores (งานจิปาถะ)**
    - งานที่ไม่เกี่ยวกับโค้ดหลัก เช่น อัปเดต version library, ลบไฟล์ขยะ
  - **`build`** : **Build System**
    - แก้ไขไฟล์ config ของโปรเจค เช่น package.json, next.config.ts
  - **`ci`** : **CI/CD**
    - แก้ไขไฟล์ Pipeline เช่น GitHub Actions, Dockerfile
