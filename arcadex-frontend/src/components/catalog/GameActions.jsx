import React from 'react';

export default function GameActions({ onEdit, onDelete }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        backgroundColor: 'rgba(15, 20, 32, 0.85)',
        backdropFilter: 'blur(8px)',
        padding: '0.25rem',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        title="Edit Game"
        onClick={onEdit}
        style={{
          width: '28px',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
          color: '#94A3B8',
          transition: 'all 0.15s ease',
          backgroundColor: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#FFFFFF';
          e.currentTarget.style.backgroundColor = '#1E293B';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#94A3B8';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>

      <button
        type="button"
        title="Delete Game"
        onClick={onDelete}
        style={{
          width: '28px',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
          color: '#F87171',
          transition: 'all 0.15s ease',
          backgroundColor: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#EF4444';
          e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#F87171';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
    </div>
  );
}
