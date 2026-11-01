import React from 'react';

export default function NavLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
      <img
        src="/arcadex-logo.png"
        alt="Arcadex Logo"
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          objectFit: 'contain',
          filter: 'drop-shadow(0 0 12px rgba(124, 58, 237, 0.5))',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      />
      <span
        style={{
          fontSize: '1.35rem',
          fontWeight: '700',
          color: '#FFFFFF',
          letterSpacing: '-0.03em',
        }}
      >
        Arcadex
      </span>
    </div>
  );
}
