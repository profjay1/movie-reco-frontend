// src/App.jsx
import React from 'react';
import Movies from './components/Movies';
import './App.css';

export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 900, margin: '2rem auto' }}>
      <header style={{ textAlign: 'center', marginBottom: 20 }}>
        <h1>MovieReco</h1>
        <p style={{ color: '#555' }}>Discover and save your favorite movies</p>
      </header>

      <main>
        <Movies />
      </main>

      <footer style={{ textAlign: 'center', marginTop: 40, color: '#888' }}>
        <small>Frontend: Vite + React • Backend: Express + MongoDB</small>
      </footer>
    </div>
  );
}
