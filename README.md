# ResumeForge PRO 🚀

A modern, high-performance ATS-friendly interactive resume builder built with **React**, **Tailwind CSS**, **Material UI (MUI)**, **GSAP Animations**, **Node.js Express**, **PostgreSQL (JSONB)**, and **Docker**.

---

## 🌟 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, PostCSS, Material UI (`@mui/material`), GSAP, Canvas Confetti, Lucide Icons
- **Backend**: Node.js, Express, `pg` (PostgreSQL Client), `dotenv`
- **Database**: PostgreSQL 16 (JSONB storage with automatic table creation & indexing)
- **Containerization**: Docker & Docker Compose (Multi-stage build)

---

## 🚀 Key Features

- **5 Premium ATS Templates**: Modern Pro, Two-Column Sidebar, Classic Executive, Tech Minimal, and Corporate Elegant.
- **Live ATS Optimization Analyzer**: Instant score calculation (0–100%) with actionable recommendations (metrics, keywords, action verbs, and confetti trigger at 90%+).
- **Material UI & Tailwind Design**: Sleek dark mode editor, fluid form accordions, and real-time live preview.
- **GSAP Animations**: Smooth transitions on template changes, score meters, and interactive controls.
- **PostgreSQL Cloud Sync**: Save, load, and manage resumes in a PostgreSQL database with REST APIs.
- **Theme & Palette Customizer**: Accent color presets, custom font pairings, and real-time live preview.
- **Interactive Floating Zoom Controls**: Zoom In (+), Zoom Out (-), Reset 100%, and Fit to Screen.
- **Print / PDF Export**: Clean A4 print layout without header/editor interference.

---

## 🛠️ Getting Started

### 1. Local Development (Frontend + Backend in One Command) ⚡
```bash
# Install dependencies
npm install

# Start both Backend Server (Port 3000) and React Vite Frontend (Port 5173) together:
npm run dev
```

> **Note**: Vite frontend proxy automatically forwards all `/api/*` calls to the Node.js Express server on `http://localhost:3000`.


### 2. Running with Docker Compose 🐳
```bash
# Start PostgreSQL and Resume Maker App containers
docker compose up -d
```
Access the application at `http://localhost:3000`.

### 3. Production Build
```bash
# Build React application
npm run build

# Start Node server
npm start
```
