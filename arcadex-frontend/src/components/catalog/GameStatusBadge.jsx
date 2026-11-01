import React from 'react';
import { STATUS_CONFIG } from '../../data/statusOptions';

export default function GameStatusBadge({ status = 'Backlog' }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG['Backlog'];

  // Status-specific icons
  const renderIcon = () => {
    if (status === 'Now Playing') {
      return (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#10B981',
            boxShadow: '0 0 6px #10B981',
            flexShrink: 0,
          }}
        />
      );
    }
    if (status === 'Completed') {
      return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    }
    if (status === 'Backlog') {
      return (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      );
    }
    // Wishlist
    return (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.25rem 0.65rem',
        borderRadius: '9999px',
        backgroundColor: 'rgba(10, 14, 23, 0.78)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: `1px solid ${config.borderColor}`,
        color: config.textColor,
        fontSize: '0.72rem',
        fontWeight: '600',
        letterSpacing: '0.02em',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
      }}
    >
      {renderIcon()}
      <span>{config.label}</span>
    </div>
  );
}
