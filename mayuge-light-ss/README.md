# 🎓 Mayuge Light Secondary School — Official Website

A premium, full-stack, production-ready website for **Mayuge Light Secondary School** (Mayuge Light SS), Mayuge, Uganda. Built with React, Tailwind CSS, Framer Motion on the frontend and Node.js, Express & MongoDB on the backend — ready to deploy on **Render.com**.

---

## ✨ Features

- 🏠 **7 fully designed pages** — Home, About, Academics, Admissions, Student Life, News, Contact + Admin dashboard & 404
- 🎨 **Premium UI** — deep-blue & gold theme, smooth Framer Motion animations, card-based layouts, sticky navbar with dropdown
- 📱 **Fully responsive** — mobile-first design that looks great on every screen
- 🔄 **Live news/blog** — articles served dynamically from the database with search, category filters & pagination
- 📝 **Working forms** — admissions application & contact form both store data in MongoDB
- 🔐 **Admin dashboard** — JWT-authenticated CRUD for news, applications & messages
- ⚡ **Production-ready** — SEO meta tags, toast notifications, loading spinners, form validation, error handling, rate limiting, helmet security
- 🚀 **Deploy-ready** — separate client/server folders, env configuration, build scripts, Render guide

---

## 🛠️ Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React (Vite), Tailwind CSS, Framer Motion, React Router, Axios, React Helmet, React Toastify |
| Backend    | Node.js, Express.js, MongoDB (Mongoose), JWT, bcrypt |
| Deployment | Render.com + MongoDB Atlas |

---

## 📁 Project Structure

```
mayuge-light-ss/
├── client/                      # React frontend (Vite)
│   ├── public/
│   │   └── images/             # School photos (campus, students, choir, gallery)
│   ├── src/
│   │   ├── api/                # Axios client config
│   │   ├── components/         # Navbar, Footer, cards, loaders, etc.
│   │   ├── data/               # School constants & sample data
│   │   ├── pages/              # Home, About, Academics, Admissions, etc.
│   │   ├── App.jsx             # Routes
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Tailwind + global styles
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── server/                      # Express + MongoDB backend
│   ├── src/
│   │   ├── config/             # DB connection & app config
│   │   ├── controllers/        # Route logic (auth, news, applications, contact)
│   │   ├── middleware/         # Auth, error handling
│   │   ├── models/             # User, News, Application, ContactMessage
│   │   ├── routes/             # REST API routes
│   │   ├── utils/              # Helpers (AppError, catchAsync)
│   │   ├── data/               # Sample news for seeding
│   │   ├── seed.js             # Database seeder script
│   │   └── server.js           # Entry point
│   ├── .env.example
│   └── package.json
├── package.json                 # Root orchestration scripts
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js** v18 or higher
- **MongoDB** — either a [local install](https://www.mongodb.com/try/download/community) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone & install dependencies

```bash
git clone https://github.com/YOUR_USERNAME/mayuge-light-ss.git
cd mayuge-light-ss

# Install all dependencies (root + client + server)
npm run install:all
```

### 2. Configure environment variables

```bash
# Server
cp server/.env.example server/.env
# Edit server/.env — set MONGO_URI and JWT_SECRET

# Client
cp client/.env.example client/.env
# Leave VITE_API_URL=/api for local dev (Vite proxies to the server)
```

### 3. Seed the database (creates an admin user + sample news)

```bash
npm run seed
```

> 📌 Note your admin credentials from `server/.env` — you'll use them to log into `/admin`.

### 4. Run both servers

Open two terminals:

```bash
# Terminal 1 — Backend (runs on http://localhost:5000)
npm run dev:server

# Terminal 2 — Frontend (runs on http://localhost:5173)
npm run dev:client
```

Visit **http://localhost:5173** 🎉

---

## 🔑 Environment Variables

### Server (`server/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `development` / `production` |
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret for signing tokens | a long random string |
| `JWT_EXPIRES_IN` | Token lifetime | `7d` |
| `CLIENT_URL` | Allowed CORS origins (comma-separated) | `https://your-site.onrender.com` |
| `ADMIN_NAME` | Default admin name (for seed) | `Administrator` |
| `ADMIN_EMAIL` | Default admin email (for seed) | `admin@mayugelightss.sc.ug` |
| `ADMIN_PASSWORD` | Default admin password (for seed) | `ChangeMe123!` |

### Client (`client/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `/api` (dev) or `https://api.onrender.com/api` (prod) |

---

## 📡 API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/api/health` | Public | Health check |
| `POST` | `/api/auth/register` | Public | Create admin account |
| `POST` | `/api/auth/login` | Public | Login → returns JWT |
| `GET` | `/api/auth/me` | Admin | Current user profile |
| `GET` | `/api/news` | Public | List published news (paginated) |
| `GET` | `/api/news/featured` | Public | Featured news for homepage |
| `GET` | `/api/news/:slug` | Public | Single article |
| `POST` | `/api/news` | Admin | Create article |
| `PUT` | `/api/news/:id` | Admin | Update article |
| `DELETE` | `/api/news/:id` | Admin | Delete article |
| `POST` | `/api/applications` | Public | Submit admission application |
| `GET` | `/api/applications` | Admin | List applications |
| `PATCH` | `/api/applications/:id` | Admin | Update application status |
| `DELETE` | `/api/applications/:id` | Admin | Delete application |
| `POST` | `/api/contact` | Public | Submit contact message |
| `GET` | `/api/contact` | Admin | List messages |
| `PATCH` | `/api/contact/:id` | Admin | Mark read/unread |
| `DELETE` | `/api/contact/:id` | Admin | Delete message |

---

## ☁️ Deployment Guide (Render.com + MongoDB Atlas)

This guide covers the full production deployment.

### Step 1 — Create a MongoDB Atlas database

1. Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas) and create a free **M0** cluster.
2. Under **Database Access**, create a database user (username + password).
3. Under **Network Access**, allow access from anywhere (`0.0.0.0/0`) — or add Render's IPs.
4. Click **Connect → Drivers** and copy your connection string. It looks like:
   ```
   mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/mayuge_light_ss?retryWrites=true&w=majority
   ```
   Replace `USERNAME`, `PASSWORD`, and the database name. **Save this string** — you'll use it as `MONGO_URI`.

### Step 2 — Push the project to GitHub

```bash
git init
git add .
git commit -m "Initial commit — Mayuge Light SS website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mayuge-light-ss.git
git push -u origin main
```

### Step 3 — Deploy the Backend (API) to Render

1. Go to [dashboard.render.com](https://dashboard.render.com) → **New + → Web Service**.
2. Connect your GitHub repo and select it.
3. Configure:
   - **Name**: `mayuge-light-ss-api`
   - **Region**: closest to your users
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid for always-on)
4. Under **Environment**, add these variables:

   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `MONGO_URI` | *(your Atlas connection string)* |
   | `JWT_SECRET` | *(a long random string)* |
   | `JWT_EXPIRES_IN` | `7d` |
   | `CLIENT_URL` | `https://YOUR-FRONTEND.onrender.com` *(add after Step 4)* |
   | `ADMIN_NAME` | `Administrator` |
   | `ADMIN_EMAIL` | `admin@mayugelightss.sc.ug` |
   | `ADMIN_PASSWORD` | *(a strong password)* |

5. Click **Create Web Service**. Render builds & deploys automatically.
6. Once live, note the backend URL (e.g. `https://mayuge-light-ss-api.onrender.com`).
7. **Create the admin user**: open a Render **Shell** for the service and run:
   ```bash
   npm run seed
   ```

### Step 4 — Deploy the Frontend (Static Site) to Render

1. **Dashboard → New + → Static Site**.
2. Connect the same repo.
3. Configure:
   - **Name**: `mayuge-light-ss`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Under **Environment**, add:

   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://YOUR-BACKEND.onrender.com/api` |

5. **Add rewrite rules** (so client-side routing works). Go to **Redirects/Rewrites**:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: Rewrite

6. Click **Create Static Site**. Once deployed, note the frontend URL.

### Step 5 — Connect the two

1. Go back to your **backend** service → **Environment**.
2. Update `CLIENT_URL` to your frontend URL: `https://mayuge-light-ss.onrender.com`.
3. This enables CORS so the frontend can call the API.

### Step 6 — Verify

- Visit your frontend URL — the homepage should load with sample news from the database.
- Test the **Admissions** and **Contact** forms.
- Go to `/admin` and log in with your seeded admin credentials.
- Create a news article and watch it appear on the News page.

> 💡 **Tip**: On Render's free tier, services spin down after inactivity (first request may take ~30s). For a school site that's always available, consider a paid plan.

---

## 📝 Admin Usage

1. Navigate to **`/admin`** on the live site.
2. Log in with the admin email & password set during seeding.
3. **News tab** — create new articles (title, excerpt, content, category, image, featured) or delete existing ones.
4. **Applications tab** — view admission applications, update their status (Pending → Reviewing → Accepted/Rejected), or delete.
5. **Messages tab** — read contact messages, mark as read/unread, or delete.

---

## 🎨 Customization

| What | Where |
|------|-------|
| School name, motto, contact info | `client/src/data/school.js` |
| Homepage statistics | `client/src/data/school.js` (`STATS`) |
| Brand colours | `client/tailwind.config.js` (`navy` & `gold` palettes) |
| Sample news | `server/src/data/sampleNews.js` |
| Images | `client/public/images/` |
| Class options in application form | `client/src/data/school.js` (`CLASS_OPTIONS`) |

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run install:all` | Install all dependencies (root + client + server) |
| `npm run dev:client` | Start Vite dev server |
| `npm run dev:server` | Start Express server with nodemon |
| `npm run build` | Build the React client for production |
| `npm run start` | Start the production Express server |
| `npm run seed` | Seed MongoDB with admin user + sample news |

---

## 📄 License

MIT © Mayuge Light Secondary School. Built with care for the Mayuge Light SS community.

> **"Knowledge is Light"** — Mayuge Light SS 🌟
