import React, { useMemo } from 'react';
import StatBadge from './StatBadge';
import { STATUS_CONFIG } from '../../data/statusOptions';

export default function HeroStats({
  games = [],
  activeFilter = 'All',
  onSelectFilter,
}) {
  const counts = useMemo(() => {
    const res = {
      All: games.length,
      'Now Playing': 0,
      Completed: 0,
      Backlog: 0,
      Wishlist: 0,
    };

    games.forEach((g) => {
      if (res[g.status] !== undefined) {
        res[g.status] += 1;
      }
    });

    return res;
  }, [games]);

  const badgeItems = [
    { id: 'All', label: 'All Games', count: counts['All'], dotColor: null },
    { id: 'Now Playing', label: 'Now Playing', count: counts['Now Playing'], dotColor: STATUS_CONFIG['Now Playing']?.dotColor || '#10B981' },
    { id: 'Completed', label: 'Completed', count: counts['Completed'], dotColor: STATUS_CONFIG['Completed']?.dotColor || '#8B5CF6' },
    { id: 'Backlog', label: 'Backlog', count: counts['Backlog'], dotColor: STATUS_CONFIG['Backlog']?.dotColor || '#F59E0B' },
    { id: 'Wishlist', label: 'Wishlist', count: counts['Wishlist'], dotColor: STATUS_CONFIG['Wishlist']?.dotColor || '#EC4899' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        flexWrap: 'wrap',
        padding: '1.25rem 0 0.5rem 0',
      }}
    >
      {badgeItems.map((badge) => (
        <StatBadge
          key={badge.id}
          id={badge.id}
          label={badge.label}
          count={badge.count}
          dotColor={badge.dotColor}
          isActive={activeFilter === badge.id}
          onClick={() => onSelectFilter && onSelectFilter(badge.id)}
        />
      ))}
    </div>
  );
}
