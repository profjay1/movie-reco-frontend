// src/components/Movies.jsx
import React, { useEffect, useState } from 'react';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Vite env var (must start with VITE_)
  const API = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API}/api/movies`, {
          headers: { Accept: 'application/json' }
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
        }

        const data = await res.json();
        if (mounted) setMovies(data);
      } catch (err) {
        if (mounted) setError(err.message || 'Fetch error');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => { mounted = false; };
  }, [API]);

  if (loading) return <div>Loading movies…</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Movies</h2>
      {movies.length === 0 ? (
        <p>No movies found. Add one via the backend or seed script.</p>
      ) : (
        <ul>
          {movies.map(m => (
            <li key={m._id ?? m.id ?? m.title} style={{ marginBottom: 12 }}>
              <strong>{m.title}</strong>{m.year ? ` (${m.year})` : ''}<br/>
              <small>{m.genre ?? ''}</small>
              {m.overview ? <p style={{ margin: '6px 0' }}>{m.overview}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
