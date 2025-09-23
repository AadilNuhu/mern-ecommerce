# MERN E‑commerce (Frontend + Backend)

A small e‑commerce frontend built with React + TypeScript + Vite and a placeholder backend directory.

Quick highlights:
- Frontend: Vite + React (TSX), Tailwind CSS, React Router.
- Backend: placeholder directory with basic package.json.

Project structure (important files)
- Frontend root: [frontend/package.json](frontend/package.json)
- Vite config: [frontend/vite.config.ts](frontend/vite.config.ts)
- TypeScript configs: [frontend/tsconfig.app.json](frontend/tsconfig.app.json), [frontend/tsconfig.node.json](frontend/tsconfig.node.json), [frontend/tsconfig.json](frontend/tsconfig.json)

Frontend entry & app
- App entry: [frontend/src/main.tsx](frontend/src/main.tsx)
- Root app: [`App`](frontend/src/App.tsx) — [frontend/src/App.tsx](frontend/src/App.tsx)
- Routes are configured inside [`App`](frontend/src/App.tsx)

Key UI components & pages
- [`Navbar`](frontend/src/components/Navbar.tsx) — [frontend/src/components/Navbar.tsx](frontend/src/components/Navbar.tsx)
- [`Footer`](frontend/src/components/Footer.tsx) — [frontend/src/components/Footer.tsx](frontend/src/components/Footer.tsx)
- Pages:
  - [`Home`](frontend/src/pages/Home.tsx) — [frontend/src/pages/Home.tsx](frontend/src/pages/Home.tsx)
  - [`About`](frontend/src/pages/About.tsx) — [frontend/src/pages/About.tsx](frontend/src/pages/About.tsx)
  - [`FeaturedProducts`](frontend/src/pages/FeaturedProducts.tsx) — [frontend/src/pages/FeaturedProducts.tsx](frontend/src/pages/FeaturedProducts.tsx)
  - [`Products`](frontend/src/pages/Products.tsx) — [frontend/src/pages/Products.tsx](frontend/src/pages/Products.tsx)
  - [`Contact`](frontend/src/pages/Contact.tsx) — [frontend/src/pages/Contact.tsx](frontend/src/pages/Contact.tsx)

Styling & assets
- Tailwind import: [frontend/src/index.css](frontend/src/index.css)
- App-specific styles: [frontend/src/App.css](frontend/src/App.css)
- Assets: [frontend/src/assets](frontend/src/assets) (backgrounds and images referenced from pages)

Backend
- Backend placeholder: [backend/package.json](backend/package.json)

Run & build (frontend)
1. cd frontend
2. Install deps:
   npm install
3. Run dev server:
   npm run dev
4. Build for production:
   npm run build
5. Preview production build:
   npm run preview
6. Lint:
   npm run lint

Notes & pointers
- Routes are client-side using React Router (see [`App`](frontend/src/App.tsx)).
- The mobile menu state and simple auth placeholder lives in [`Navbar`](frontend/src/components/Navbar.tsx).
- The homepage hero uses a background image at [frontend/src/App.css](frontend/src/App.css) referencing [frontend/src/assets/watchBackground.jpg](frontend/src/assets/watchBackground.jpg).
- Tailwind is wired via package.json plugins and the single import in [frontend/src/index.css](frontend/src/index.css). See [frontend/vite.config.ts](frontend/vite.config.ts) for plugin setup.
