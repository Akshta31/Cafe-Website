# Dusk & Brew (Cafe Website)

A single-page React (Vite) café website featuring a browsing menu and a multi-step ordering flow (cart → details → payment → confirmation).

## Features
- **Navigation**: Home, Menu, Order, About, Contact (fixed top nav + footer)
- **Menu**: Category tabs + search + “Add to Cart”
- **Ordering**:
  - Cart quantity controls
  - Order type: **Dine-in** / **Takeaway**
  - Step flow: **Cart → Details → Payment → Done**
  - Payment UI options (Card / Cash / Apple Pay / Google Pay)
  - Fake order confirmation with a generated order number
- **About + Contact**: Café story, values/team, and a simple contact form

## Tech Stack
- React ^19
- Vite ^7
- ESLint (for linting)

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run in development mode

```bash
npm run dev
```

Open the local URL shown in your terminal.

### 3) Build for production

```bash
npm run build
```

### 4) Preview the production build

```bash
npm run preview
```

### 5) Lint
```bash
npm run lint
```

## Project Structure (high level)

- `src/App.jsx` – Main app + all page components (Home, Menu, Order, About, Contact) and cart/order state
- `index.html` – Vite entry HTML
- `vite.config.js` – Vite configuration
- `public/` – Static assets
- `src/assets/` – Image/SVG assets

## Notes
- Styling is largely inline in `App.jsx`, with global font styling injected via a `<style>` tag.
- The “ordering” and “payment” steps are UI-only (no backend integration).

