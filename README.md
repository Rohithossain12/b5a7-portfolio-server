Thik ache! Ami tumar **backend README** ke sundor, professional, fully formatted file e sajai dichi jeta copy-paste kore `.md` file hisebe use kora jabe:

---

````markdown
# 🌐 B5A7 – Portfolio Backend

> Backend API for My Portfolio Website built with Node.js, ExpressJS, TypeScript, and Prisma (PostgreSQL).

---

## 🔹 Project Overview

This backend serves as the API for the portfolio website, handling authentication, blog and project management, and file uploads.  

**Core Features:**

- **Authentication & Authorization:** JWT-based authentication for owner-only access.
- **Admin User:** Seeded default admin user for testing.
- **Blog & Project CRUD:** Create, Read, Update, Delete operations for blogs and projects.
- **File Uploads:** Supports image uploads via Cloudinary.
- **Secure Passwords:** Passwords hashed with bcrypt.
- **Error Handling:** API errors handled with meaningful messages.

---

## 🛠 Tech Stack

| Layer            | Technology/Library |
|-----------------|------------------|
| Backend         | Node.js, ExpressJS, TypeScript |
| Database        | PostgreSQL + Prisma |
| Authentication  | JWT + bcrypt |
| File Uploads    | Multer + Cloudinary |
| Validation      | express-validator |
| Dev Tools       | ts-node-dev, TypeScript |

---

## 🌐 API Endpoints

### 🔑 Auth
| Method | Endpoint                  | Description                  |
|--------|---------------------------|------------------------------|
| POST   | `/api/v1/users/login`       | Admin login                  |


### 📝 Blogs
| Method | Endpoint                  | Description                       |
|--------|---------------------------|-----------------------------------|
| GET    | `/api/v1/blogs`            | Fetch all blogs                   |
| GET    | `/api/v1/blogs/:id`        | Fetch single blog by ID           |
| POST   | `/api/v1/blogs`            | Create new blog (Admin only)      |
| PUT    | `/api/v1/blogs/:id`        | Update existing blog (Admin only) |
| DELETE | `/api/v1/blogs/:id`        | Delete blog (Admin only)          |

### 💻 Projects
| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| GET    | `/api/v1/projects`           | Fetch all projects                   |
| GET    | `/api/v1/projects/:id`       | Fetch single project by ID           |
| POST   | `/api/v1/projects`           | Create new project (Admin only)      |
| PUT    | `/api/v1/projects/:id`       | Update existing project (Admin only) |
| DELETE | `/api/v1/projects/:id`       | Delete project (Admin only)          |

---

## 📦 Installation & Local Setup

1. Clone the repository:

```bash
https://github.com/Rohithossain12/b5a7-portfolio-server
cd b5a7-portfolio-server
````

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file with the following variables:

```env
PORT=3005
NODE_ENV=development
DATABASE_URL=postgresql://postgres:12345@localhost:5432/my_portfolio?schema=public
JWT_SECRET=baae0ef19653b98c99df0a7c8688312668ff36588572a21a2ea9888d3884ddc2

ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin1022

CLOUDINARY_CLOUD_NAME=dibooxmnd
CLOUDINARY_API_KEY=331717668182556
CLOUDINARY_API_SECRET=_9ylDA42kAQZ5_BSgfvoM2pxtJo
```

4. Run the development server:

```bash
npm run dev
```

---

## 🌐 Live Deployment

Live URL: [https://your-backend-url.com](https://your-backend-url.com) *(replace with actual URL later)*

---


