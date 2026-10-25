# CampusOS — Framer-Grade University Student Management System

A reimagined, digital-operating-system caliber university management platform designed with the visual direction of [framer.com](https://www.framer.com/).

> **"Every student. Every detail. One campus."**  
> *A smarter way to manage student records, academic information and enrolment.*

---

## 🎨 Visual Direction & Design System

- **Framer Signature Aesthetics**: Bold, tight-tracked geometric typography (**Plus Jakarta Sans** & **Inter**), luminous dark and light themes, subtle ambient glow mesh backdrops, and frosted glass cards (`backdrop-filter: blur(20px)`).
- **Harmonious Gradients**: Electric indigo (`#6366F1`), cosmic violet (`#8B5CF6`), fuchsia flare (`#EC4899`), radiant cyan (`#06B6D4`), and deep royal blue (`#3B82F6`).
- **Interactive Micro-Interactions**: Spring-like hover scaling, live status pulse indicators, slide-over student dossier drawer, interactive SVG charts with gradient area curves and donut slices.
- **Data Density with High Readability**: Clean table typography, GPA achievement pills, status tags, and intuitive multi-dimensional filters.

---

## ⚙️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 18 + Vite | Single Page Application with bespoke Vanilla CSS design tokens and Lucide icons |
| **Backend** | Node.js + Express | RESTful API with MongoDB Mongoose schemas and aggregation pipelines |
| **Database** | MongoDB | Official Docker image `mongo:7.0` with persistent volumes; auto-fallback to embedded MongoDB engine during local development |
| **Containers** | Docker & Docker Compose | Multi-stage production `Dockerfile` for frontend (Nginx) and backend |

---

## 🚀 Quick Start

### Option 1: Local Development (Instant)

```bash
# 1. Install all dependencies
npm run install:all

# 2. Start the Express Backend (Port 5000)
npm run dev:backend

# 3. In a second terminal, start the React + Vite Frontend (Port 3000)
npm run dev:frontend
```

Visit **`http://localhost:3000`** in your browser.

> [!NOTE]
> If a local MongoDB instance is not currently running, the backend automatically spins up an in-memory development engine and auto-seeds 5 departments, 8 courses, and realistic student profiles.

---

### Option 2: Production Containerization (Docker Compose)

```bash
# Build and run MongoDB, Express Backend, and React Frontend containers
docker compose up --build
```

- **Frontend**: `http://localhost:3000` (served via Nginx)
- **Backend API**: `http://localhost:5000`
- **MongoDB**: `localhost:27017`

---

## 🏛️ System Features

1. **Striking Framer Hero & Live KPIs**:
   - Live metrics calculated dynamically from MongoDB (Total Students, Active Rate, Average GPA, Academic Divisions).
   - Instant quick search and Add Student trigger with key navigation.

2. **Full Student CRUD & Registry**:
   - **Create**: Add student with auto-ID generator, avatar preview, department & major selector, GPA, and emergency contact.
   - **Read**: Rich table with sorting, status badges, GPA color-coding, and pagination.
   - **Update**: Modal with tabbed editing (General, Academic, Contact & Location).
   - **Delete**: Protected confirmation modal.
   - **Export**: Direct one-click CSV export (`/api/students/export/csv`).

3. **Slide-over Student Dossier Drawer**:
   - Inspect full student profile, registered courses, attendance rates, and advising remarks.

4. **Curriculum & Department Management**:
   - Department cards with dynamic student counts and course counts derived via MongoDB aggregation.
   - Course catalog with instructor assignments, credit weights, and enrollment capacity.

5. **Institutional Analytics**:
   - Interactive SVG Enrolment Trajectory chart with multi-year velocity.
   - Interactive donut chart of department distribution with hover highlights.
   - Academic standing GPA distribution benchmark bars.

6. **Theme Switcher**:
   - Toggle seamlessly between Framer Dark Mode and clean Framer Light Mode.
