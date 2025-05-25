# 📞 Spam Detection API – NestJS + Prisma

This is a backend REST API for a spam detection and caller identity system, similar to apps like Truecaller. It allows user registration, contact import, spam reporting, and global number/name search.

---

## 🚀 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (Passport.js)
- **Validation**: DTOs using `class-validator`
- **Documentation**: Swagger (`@nestjs/swagger`)
- **Architecture**: Modular & type-safe (SOLID principles)

---

## 📦 Features

### 👤 Authentication

- Register new user (`POST /auth/register`)
- Login and receive JWT token (`POST /auth/login`)
- Fetch profile info (`GET /auth/profile`)

### 📇 Contacts

- Import user phone contacts in bulk (`POST /contacts/import`)

### 🚫 Spam Reporting

- Mark any phone number as spam (`POST /spam/report`)
- Fetch spam count for any number (`GET /spam/count`)

### 🔍 Search

- Search globally by name (`GET /search/name?query=...`)
- Search by phone number (`GET /search/phone?phone=...`)
- Conditional email visibility based on contact relation

### 🔒 Admin

- List all users (Admin only) – `GET /auth/users` with `@Roles('ADMIN')`

---

## 📂 Folder Structure

src/
├── auth/ # Auth module: login, register, JWT
├── contact/ # Contact import logic
├── spam/ # Spam report handling
├── search/ # Global search module
├── common/ # Middleware, guards, pipes, interceptors
├── prisma/ # PrismaService and DB client
├── main.ts # App entry point

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/spam_api
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=3600s


# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env

# 3. Run database migrations
npx prisma migrate dev
npx prisma generate

# 4. Seed sample data (optional)
npm run seed

# 5. Start the dev server
npm run start:dev
```
# spam-detection-nestjs-backend
