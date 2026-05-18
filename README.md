# Hivelvy Frontend

Welcome to the **Hivelvy** frontend repository. This project is built using modern web development standards to ensure scalability, performance, and a delightful user experience. 

It provides interfaces for tenants, property managers, and administrators to interact seamlessly with the AI-driven Hivelvy platform.

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling & UI**: [Material UI (MUI)](https://mui.com/), Custom CSS, [Lucide React](https://lucide.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Visualization**: [Recharts](https://recharts.org/)

## 📂 Architecture Overview

The project is structured following a highly modular and feature-based approach, ensuring separation of concerns and easy navigation for large teams.

```
src/
├── assets/        # Static files (images, icons)
├── components/    # Reusable UI components (buttons, cards, badges)
├── hooks/         # Custom React hooks
├── layouts/       # Structural layouts (AdminLayout, TenantLayout)
├── lib/           # Utility functions and mock data
├── pages/         # Page-level components (entry points for routes)
├── sections/      # Feature-specific page sections (admin, tenant, landing)
├── styles/        # Global CSS and theming
├── types/         # TypeScript type definitions
├── App.tsx        # Main application router
└── main.tsx       # Entry point
```

**Key Architectural Decisions:**
- **Absolute Imports**: Uses professional path aliases (e.g., `@/components/GlowCard`) to avoid messy `../../../` relative paths.
- **Section Pattern**: Complex pages are broken down into logical sections inside `src/sections/` instead of massive god-files.
- **Optimized Builds**: Vite configuration includes chunk splitting (`vendor`, `mui`, `charts`) for improved loading speeds in production.

## ⚙️ Local Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm (v10+)

### 1. Clone & Install
```bash
# Install all dependencies cleanly
npm install
```

### 2. Environment Configuration
Create a `.env` file based on the example:
```bash
cp .env.example .env
```
_Edit the `.env` file if you have a local API instance running._

### 3. Run Development Server
```bash
# Starts the Vite development server with HMR
npm run dev
```

## 📜 Available Scripts

- `npm run dev`: Starts the local development server.
- `npm run build`: Compiles TypeScript and builds the production bundle with optimized chunking.
- `npm run preview`: Serves the production build locally to test performance and routing.
- `npm run lint`: Runs ESLint to check for stylistic and type-aware errors.

## 🚢 Deployment-Ready Notes
- Ensure your CI/CD pipeline runs `npm run lint` and `npm run build` before merging PRs.
- Environment variables must be injected into your deployment platform (Vercel, Netlify, AWS Amplify) matching the variables defined in `.env.example`.
- Routing works out-of-the-box for SPAs, but ensure your server is configured to rewrite all paths to `index.html` (Vite handles this automatically locally via `npm run preview`).
