import React, { useState } from 'react';
import { initialGames } from './data/initialGames';

export default function App() {
  const [games, setGames] = useState(initialGames);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0B0F17',
        color: '#F1F5F9',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}
      className="app-container"
    >
      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Sections will be mounted here (Navbar, HeroStats, Toolbar, CatalogGrid, Recommendations, Modal, Footer) */}
      </main>
    </div>
  );
}
