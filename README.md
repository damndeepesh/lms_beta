# Model Training Suite - Learning Management System

I'm trying to build a Learning Management System.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Implemented Features

So far, the following features have been implemented:

- **Next.js Project Setup:** The basic project structure using Next.js is in place.
- **Prisma Integration:** Prisma is set up for database interactions (PostgreSQL).
- **Login/Authentication Flow:** Users can log in.
- **Role-Based Dashboards:** Basic dashboard structure exists, intended to show different content based on user roles (ADMIN, MANAGEMENT, FINANCE, STUDENT, TEACHER).
- **Admin User Creation:** An API endpoint (`/api/admin/users/create`) allows creating new users with specific roles and generates a temporary password.
- **Password Reset Requirement:** New users are flagged to require a password reset on their first login.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.