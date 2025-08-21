
---

# `README.md` — Frontend (Vite + React)

```markdown
# MovieReco — Frontend (Vite + React)

React + Vite frontend for the Movie Recommendation app. Fetches data from a backend API and displays movie lists.

---

## Table of contents

- [Tech stack](#tech-stack)  
- [Prerequisites](#prerequisites)  
- [Environment variables](#environment-variables)  
- [Install & Run (local)](#install--run-local)  
- [Build & Deploy (Vercel)](#build--deploy-vercel)  
- [Using the API in React (example)](#using-the-api-in-react-example)  
- [CORS notes](#cors-notes)  
- [Removing `node_modules` from git](#removing-nodemodules-from-git)  
- [Troubleshooting](#troubleshooting)  
- [License](#license)

---

## Tech stack

- React (functional components + hooks)
- Vite (fast dev server & build)
- fetch API or Axios for requests

---

## Prerequisites

- Node.js & npm
- Git
- Backend API deployed (e.g. Railway) or running locally

---

## Environment variables

Vite requires env variables to start with `VITE_`. Create `.env.local` in the frontend root for local development:

VITE_API_URL=http://localhost:3000


On Vercel (or other host) set `VITE_API_URL` to the backend production URL:


VITE_API_URL=https://movie-reco-backend-production.up.railway.app


---

## Install & Run (local)

1. From the frontend project root:

```bash
# install (if you removed node_modules from repo)
npm ci
# or
npm install


Start dev server:

npm run dev
# default Vite dev server -> http://localhost:5173


Build for production:

npm run build
# Outputs to `dist/` by default (Vite)


Preview production build locally:

npm run preview

Build & Deploy (Vercel recommended)

Push your frontend repo to GitHub.

In Vercel: New Project → Import Git Repository → choose your repo.

Vercel auto-detects Vite. Confirm:

Build Command: npm run build

Output Directory: dist

Add Environment Variable in Vercel:

Key: VITE_API_URL

Value: https://movie-reco-backend-production.up.railway.app

Deploy. After deploy, the frontend will be available at the Vercel domain.

Using the API in React (example)

Copy this component into src/components/Movies.jsx and import it in App.jsx:

import React, { useEffect, useState } from 'react';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API}/api/movies`, { headers: { Accept: 'application/json' }});
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`HTTP ${res.status}: ${txt || res.statusText}`);
        }
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        setError(err.message || 'Fetch error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [API]);

  if (loading) return <div>Loading movies…</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      <h2>Movies</h2>
      {movies.length === 0 ? <p>No movies found.</p> : (
        <ul>{movies.map(m => <li key={m._id ?? m.id}>{m.title} ({m.year})</li>)}</ul>
      )}
    </div>
  );
}


Notes:

import.meta.env.VITE_API_URL is injected at build time by Vite.

Make sure VITE_API_URL is set in Vercel for production builds.

CORS notes

If your frontend is on a different origin than your backend, you must enable CORS on the backend:

import cors from 'cors';
app.use(cors()); // or configure specific origin(s)

Removing node_modules from git (if present)

If you accidentally committed node_modules/ to your frontend repo, remove it from git history or at least from the current commit:

# from frontend repo root
git rm -r --cached node_modules
git add .gitignore
git commit -m "chore: remove node_modules from repo"
git push origin HEAD


If node_modules exists in earlier history and you want to purge it entirely, use BFG or git filter-repo (advanced, rewrites history).

Troubleshooting

Frontend can't reach API: Check console for CORS errors and verify VITE_API_URL is set correctly.

import.meta.env.VITE_API_URL undefined: Ensure Vite env var name starts with VITE_, restart dev server after editing .env.local, and set var in Vercel for production.

404 on static files: Ensure the build uses dist as output directory and Vercel's settings match.

SSL issues with curl on Windows: Use PowerShell Invoke-RestMethod or disable revocation check only for local testing (curl --ssl-no-revoke).

Useful npm scripts (suggested package.json)
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint src --ext .js,.jsx"
}

License
MIT