import React from 'react';
import GameCard from './GameCard';

export default function CatalogGrid({
  games = [],
  onEdit,
  onDelete,
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '1.25rem',
        margin: '0.5rem 0 2.5rem 0',
      }}
    >
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
