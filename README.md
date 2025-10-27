
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


## 🌐 Live Deployment

Live URL: https://b5a7-portfolio-server.vercel.app

---


