import React from 'react';

export default function NavSearch({ searchQuery, onSearchChange }) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: '320px',
      }}
    >
      <span
        style={{
          position: 'absolute',
          left: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          color: '#64748B',
          pointerEvents: 'none',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        type="text"
        placeholder="Search games, genres, platforms.."
        value={searchQuery || ''}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          width: '100%',
          backgroundColor: '#111724',
          border: '1px solid #1E2738',
          borderRadius: '9999px',
          padding: '0.55rem 1rem 0.55rem 2.4rem',
          color: '#F1F5F9',
          fontSize: '0.82rem',
          outline: 'none',
          transition: 'all 0.2s ease',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
          e.currentTarget.style.boxShadow = '0 0 10px rgba(139, 92, 246, 0.2)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#1E2738';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}
