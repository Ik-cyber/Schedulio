# 📦 Schedulio – Project Overview

Schedulio is a **full-stack SaaS web application** for **automated report creation, scheduling, and delivery**.  
Built for normal consumers & enterprise users.

---

## 🚀 Project Goals

✅ Users create rich reports (text + optional attachments)  
✅ Schedule reports to be automatically delivered (daily, weekly, etc.)  
✅ Deliver via email, Slack, or webhooks  
✅ Modular, scalable, clean codebasen

---

## 🛠 Tech Stack

| Layer      | Choice                       | Notes                                      |
| ---------- | ---------------------------- | ------------------------------------------ |
| Frontend   | Next.js (App Router)         | Modern React, SSR, API routes              |
| Styling    | Tailwind CSS                 | Customizable, clean UI                     |
| Auth       | NextAuth.js                  | Social login (GitHub etc.)                 |
| Database   | MongoDB (via Prisma)         | Flexible, schema in `prisma/schema.prisma` |
| ORM        | Prisma                       | Type-safe DB access                        |
| PDF Export | `pdf.ts` utils               | Generate PDFs                              |
| Scheduling | Node cron / custom scheduler | Queue jobs                                 |
| Delivery   | Nodemailer / Slack SDK       | Deliver reports                            |

---

## 📂 Folder Structure

```txt
schedulio/
├── app/                            # Next.js app routes & pages
│   ├── (public)/                   # Marketing: Landing, About, Pricing, Contact
│   ├── (auth)/                     # Login, Register, Forgot password
│   ├── (dashboard)/                # Authenticated dashboard
│   │   ├── reports/                # List, view, edit reports
│   │   ├── schedules/              # Manage schedules
│   │   └── settings/               # User & app settings
│   ├── api/                        # API routes
│   │   ├── reports/                # CRUD reports
│   │   ├── schedules/              # CRUD schedules
│   │   ├── delivery/               # Trigger delivery
│   │   └── auth/[...nextauth].ts   # NextAuth
│   └── layout.tsx                  # Global layout with SessionProvider
│
├── components/                     # Reusable UI
│   ├── ui/                         # Buttons, inputs, cards
│   ├── dashboard/                  # Dashboard widgets
│   └── public/                     # Marketing components
│
├── lib/                            # Core logic
│   ├── auth/                       # NextAuth config & helpers
│   ├── db.ts                       # Prisma client
│   ├── scheduler.ts                # Scheduling
│   └── pdf.ts                      # PDF generation
│
├── services/                       # Business/domain logic
│   ├── reportService.ts
│   ├── deliveryService.ts
│   └── scheduleService.ts
│
├── prisma/                         # Prisma schema & migrations
│   └── schema.prisma
│
├── public/                         # Static assets
├── styles/                         # Tailwind & global CSS
├── types/                          # TS types
├── config/                         # Site & email config
├── .env                            # Environment variables
├── middleware.ts
├── next.config.js
├── tailwind.config.js
└── package.json
```

## 📌 Current Prisma Schema (simplified)

```prisma

model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  name      String?
  image     String?
  reports   Report[]
  createdAt DateTime @default(now())
}

model Report {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  title     String
  content   String
  attachment Attachment?     // optional
  userId    String           @db.ObjectId
  user      User             @relation(fields: [userId], references: [id])
  schedules Schedule[]
  createdAt DateTime @default(now())
}

model Attachment {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  fileName  String
  fileUrl   String
  mimeType  String
  size      Int
  reportId  String           @unique @db.ObjectId
  report    Report           @relation(fields: [reportId], references: [id])
  uploadedAt DateTime @default(now())
}

model Schedule {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  cron      String
  reportId  String           @db.ObjectId
  report    Report           @relation(fields: [reportId], references: [id])
  nextRun   DateTime
  createdAt DateTime @default(now())
}
```

## 🧪 Testing (API)

#### Use Postman/ Insomia, But Still in development

```http

GET    /api/reports
POST   /api/reports
GET    /api/reports/:id
DELETE /api/reports/:id

GET    /api/schedules
POST   /api/schedules
GET    /api/schedules/:id
DELETE /api/schedules/:id
```
