import React from 'react';

export default function SortControl({ sortBy, onSortChange }) {
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        style={{
          appearance: 'none',
          backgroundColor: '#101623',
          border: '1px solid #1E2738',
          borderRadius: '8px',
          padding: '0.45rem 2.2rem 0.45rem 0.85rem',
          color: '#E2E8F0',
          fontSize: '0.82rem',
          fontWeight: '500',
          cursor: 'pointer',
          outline: 'none',
          transition: 'border-color 0.2s ease',
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = '#1E2738')}
      >
        <option value="rating-desc" style={{ background: '#101623', color: '#FFF' }}>
          Sort: Highest Rating
        </option>
        <option value="rating-asc" style={{ background: '#101623', color: '#FFF' }}>
          Sort: Lowest Rating
        </option>
        <option value="title-asc" style={{ background: '#101623', color: '#FFF' }}>
          Sort: Title (A - Z)
        </option>
        <option value="playtime-desc" style={{ background: '#101623', color: '#FFF' }}>
          Sort: Most Played
        </option>
      </select>
      <span
        style={{
          position: 'absolute',
          right: '0.75rem',
          pointerEvents: 'none',
          color: '#64748B',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    </div>
  );
}
