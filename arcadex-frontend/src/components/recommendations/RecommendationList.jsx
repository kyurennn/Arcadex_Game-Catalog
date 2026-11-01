import React from 'react';
import MatchCard from './MatchCard';

export default function RecommendationList({ recommendations = [], onQuickWishlistAdd }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '1.25rem',
      }}
    >
      {recommendations.map((game) => (
        <MatchCard
          key={game.id}
          game={game}
          onQuickWishlistAdd={onQuickWishlistAdd}
        />
      ))}
    </div>
  );
}
