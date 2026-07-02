# PixelCraft Studios

A Vite + React site for PixelCraft Studios, with separate React routes for Services, Portfolio, 8-bit Arcade, and Contact.

## Features

- React single-page app with route-style navigation
- Home page keeps the service cards and recent projects
- Dedicated pages for `/services`, `/portfolio`, `/8-bit`, and `/contact`
- Playable canvas arcade with Snake, Tetris, and Pong
- Responsive neon studio UI with shared component data

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
PixelCraft-Studios/
├── index.html
├── package.json
├── src/
│   ├── App.jsx
│   ├── data.js
│   ├── main.jsx
│   ├── styles.css
│   └── components/
│       └── Arcade.jsx
└── README.md
```

## Routes

- `/` - Home, service cards, and recent projects
- `/services` - Service details and process
- `/portfolio` - Filterable project showcase
- `/8-bit` - Playable arcade page
- `/contact` - Contact information and form
