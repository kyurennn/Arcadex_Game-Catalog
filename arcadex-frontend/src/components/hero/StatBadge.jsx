import React from 'react';

export default function StatBadge({
  id,
  label,
  count = 0,
  dotColor,
  isActive = false,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.55rem',
        padding: '0.42rem 0.85rem',
        borderRadius: '9999px',
        backgroundColor: isActive ? 'rgba(139, 92, 246, 0.15)' : '#101623',
        border: `1px solid ${isActive ? 'rgba(139, 92, 246, 0.6)' : '#1E2738'}`,
        color: isActive ? '#FFFFFF' : '#94A3B8',
        fontSize: '0.82rem',
        fontWeight: isActive ? '600' : '500',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        boxShadow: isActive ? '0 0 12px rgba(139, 92, 246, 0.25)' : 'none',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = '#161F30';
          e.currentTarget.style.borderColor = '#2A364F';
          e.currentTarget.style.color = '#F1F5F9';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = '#101623';
          e.currentTarget.style.borderColor = '#1E2738';
          e.currentTarget.style.color = '#94A3B8';
        }
      }}
    >
      {dotColor && (
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: dotColor,
            boxShadow: `0 0 6px ${dotColor}`,
            flexShrink: 0,
          }}
        />
      )}
      <span>{label}</span>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '20px',
          height: '18px',
          padding: '0 0.35rem',
          borderRadius: '9999px',
          backgroundColor: isActive ? '#8B5CF6' : '#1A2333',
          color: isActive ? '#FFFFFF' : '#94A3B8',
          fontSize: '0.72rem',
          fontWeight: '700',
        }}
      >
        {count}
      </span>
    </button>
  );
}
