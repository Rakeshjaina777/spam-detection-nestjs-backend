# 📞 Spam Detection & Caller ID REST API – NestJS + Prisma

A production-grade backend system similar to Truecaller. Built using **NestJS** and **Prisma ORM**, this API allows registration, login, contact management, spam reporting, and intelligent global search for caller identities and phone numbers.

---

## 🚀 Tech Stack

| Layer         | Tool/Tech                       |
|---------------|---------------------------------|
| Framework     | [NestJS](https://nestjs.com/)   |
| Database      | PostgreSQL                      |
| ORM           | Prisma                          |
| Auth          | JWT (Passport)                  |
| Validation    | `Class-validator` in DTOs       |
| API Docs      | Swagger (`@nestjs/swagger`)     |
| Architecture  | Clean, modular, SOLID-principled|

---

## 📦 Features

### 👤 Auth
- `POST /auth/register` – Register user (Name, Phone, Password, optional Email)
- `POST /auth/login` – Login and get JWT token
- `GET /auth/profile` – Get logged-in user profile
- `GET /auth/users` – List users (Admin-only)

### 📇 Contacts
- `POST /contacts/import` – Import personal contacts in bulk (with name + number)

### 🚫 Spam Reporting
- `POST /spam/report` – Mark number as spam
- `GET /spam/count?phone=...` – Get spam report count for a number

### 🔍 Search
- `GET /search/name?query=...` – Search by name (ranked by match quality)
- `GET /search/phone?phone=...` – Search by phone number

🔒 **Email visibility logic:** Email shown only if:
- Queried user is registered, and
- Searching user exists in queried user's contacts

---

## 🗃️ ER Diagram

```plaintext
┌────────────┐      ┌────────────┐      ┌────────────┐
│   User     │◄────►│  Contact   │◄────►│ SpamReport │
└────────────┘      └────────────┘      └────────────┘
   id (PK)              id (PK)            id (PK)  
   name                 name               reporterId (FK: User)
   phone (unique)       phone              phone (reported number)
   email (optional)     ownerId (FK: User) createdAt
   passwordHash         createdAt          
   role (USER | ADMIN)  updatedAt          
   createdAt
```                       

## 🔁 Data Flow Overview

[Mobile App]
     ↓
Register/Login (JWT)
     ↓
Authenticated API access:
  ↳ Import contacts
  ↳ Mark spam
  ↳ Search globally
     ↓
[API server (NestJS)]
     ↓
[PostgreSQL via Prisma]


---

## 🛡️ Security

- JWT-based authentication using `passport-jwt`
- Global guards and role-based access control
- DTO-based input validation using `class-validator`
- Custom exception filters for detailed error reporting
- Rate-limiting and helmet ready for production

---

## 📂 Folder Structure

src/
├── auth/         # Registration, login, profile, guards
├── contact/      # Contact import and owner linkage
├── spam/         # Spam marking and statistics
├── search/       # Global name/phone search
├── prisma/       # PrismaService, seed logic
├── common/       # Guards, Interceptors, Utils
├── main.ts       # App bootstrap


Includes:

- Authenticated endpoints
- Role-protected routes
- DTO validation schema
- Request and response examples

---

## 🧪 Sample Data (Seeding)

To populate the DB with mock data:

```bash
npm run seed


## ⚙️ Setup Instructions
# 1. Clone project
git clone https://github.com/yourname/spam-detection-backend.git
cd spam-detection-backend

# 2. Install dependencies
npm install

# 3. Set environment variables
cp .env.example .env
# Fill in DATABASE_URL and JWT_SECRET in .env

# 4. Setup the database
npx prisma migrate dev
npx prisma generate

# 5. Seed data (optional)
npm run seed

# 6. Run server
npm run start:dev

## 👨‍💻 Author

**Rakesh Jain**  
Backend Developer | NestJS | Prisma | PostgreSQL  
📧 [Rakeshjain](mailto:rakeshjaina777@gmail.com)  
📞 +91-9021633960  

