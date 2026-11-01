import React from 'react';

const navItems = [
  { id: 'All', label: 'All Games' },
  { id: 'Now Playing', label: 'Now Playing' },
  { id: 'Completed', label: 'Completed' },
  { id: 'Backlog', label: 'Backlog' },
  { id: 'Wishlist', label: 'Wishlist' },
];

export default function NavLinks({ activeFilter = 'All', onSelectFilter }) {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
      {navItems.map((item) => {
        const isActive = activeFilter === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectFilter && onSelectFilter(item.id)}
            style={{
              position: 'relative',
              padding: '0.5rem 0.2rem',
              color: isActive ? '#FFFFFF' : '#94A3B8',
              fontSize: '0.86rem',
              fontWeight: isActive ? '600' : '500',
              transition: 'color 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.color = '#E2E8F0';
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.color = '#94A3B8';
            }}
          >
            {item.label}
            {isActive && (
              <span
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  right: 0,
                  height: '2.5px',
                  borderRadius: '2px',
                  backgroundColor: '#8B5CF6',
                  boxShadow: '0 0 8px rgba(139, 92, 246, 0.7)',
                }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
