import React from 'react';
import SortControl from './SortControl';

export default function Toolbar({
  title = 'All Catalog Games',
  totalCount = 0,
  sortBy,
  onSortChange,
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem 0 1rem 0',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      {/* Left: Heading & Counter */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.85rem', flexWrap: 'wrap' }}>
        <h2
          style={{
            fontSize: '1.45rem',
            fontWeight: '700',
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h2>
        <span
          style={{
            fontSize: '0.86rem',
            color: '#64748B',
            fontWeight: '500',
          }}
        >
          Showing {totalCount} entries
        </span>
      </div>

      {/* Right: Sort Control */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <SortControl sortBy={sortBy} onSortChange={onSortChange} />
      </div>
    </div>
  );
}
