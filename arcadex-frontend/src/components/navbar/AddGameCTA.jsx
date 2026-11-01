import React from 'react';

export default function AddGameCTA({ onOpenModal }) {
  return (
    <button
      onClick={onOpenModal}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        backgroundColor: '#8B5CF6',
        backgroundImage: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
        color: '#FFFFFF',
        fontSize: '0.84rem',
        fontWeight: '600',
        padding: '0.55rem 1.15rem',
        borderRadius: '9999px',
        boxShadow: '0 2px 14px rgba(139, 92, 246, 0.4)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.6)';
        e.currentTarget.style.filter = 'brightness(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 14px rgba(139, 92, 246, 0.4)';
        e.currentTarget.style.filter = 'brightness(1)';
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      <span>Add Game</span>
    </button>
  );
}
