# Dating‑App

Project status – environment setup only. The current codebase contains tooling, configuration and an initial mock API. Core features are not implemented yet.

## Tech Stack

| Layer         | Choice            | Reason                      |
| ------------- | ----------------- | --------------------------- |
| Build & Dev   | Vite              | Fast start & HMR            |
| UI            | React             | Mature ecosystem            |
| UI components | shadcn/ui         | Tailwind-native, accessible |
| Styling       | Tailwind CSS v4   | Utility-first, themeable    |
| Language      | TypeScript 5      | Static type checking        |
| Mock API      | JSON Server       | Simple to setup mock API    |
| Lint/Format   | ESLint + Prettier | Auto lint & format          |

## Getting Started

```bash
# 1 – Install dependencies
npm install

# 2 – Start the React dev server  ➜  http://localhost:5173
npm run dev

# 3 – In another terminal, start the mock REST API  ➜  http://localhost:4000
npm run json-server
```

### NPM Scripts

| Script        | Description                                |
| ------------- | ------------------------------------------ |
| `dev`         | Launch Vite with HMR                       |
| `build`       | Type‑check then create a production bundle |
| `preview`     | Serve the built bundle locally             |
| `lint`        | Run ESLint                                 |
| `format`      | Run Prettier over the workspace            |
| `json-server` | Start the mock REST API                    |

> **Proxy note** – During development, all requests starting with `/api/*` are transparently proxied to `http://localhost:4000`. See the `vite.config.ts` file.

## Current Structure

```bash
├─ mock/
│  └─ db.json
├─ src/
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
│  └─ vite-env.d.ts
├─ eslint.config.js
├─ index.html
├─ tsconfig.json
└─ vite.config.ts
```

## Assignment Requirements (to be implemented)

- [ ] Display a recommendation list with user cards.
- [ ] Like / Skip interactions.
- [ ] User authentication via Facebook or SMS.
- [ ] Real‑time chat between matched users.
- [ ] Location switch to fetch recommendations from a different region.
- [ ] Search filters: age range, gender, distance.
- [ ] Responsive layout for desktop & mobile web.

## Demo & Delivery

- The repository will be pushed to a public GitHub repo with a short architecture overview.

- When features are ready, record a screen‑cast (YouTube) showing core flows; link it here.
