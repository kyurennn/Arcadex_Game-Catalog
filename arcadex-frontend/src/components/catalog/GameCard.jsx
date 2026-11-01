import React from 'react';
import GamePoster from './GamePoster';
import { getStarArray, formatRating } from '../../utils/formatters';

export default function GameCard({
  game,
  onEdit,
  onDelete,
}) {
  const {
    title,
    genre,
    platform,
    rating = 5.0,
    status,
    playtime,
    imageUrl,
    poster,
  } = game;

  const displayImage = imageUrl || poster;
  const stars = getStarArray(rating, 5);

  return (
    <div
      style={{
        backgroundColor: '#0F1523',
        border: '1px solid #1C2638',
        borderRadius: '14px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.45)';
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow =
          '0 10px 28px rgba(0, 0, 0, 0.55), 0 0 16px rgba(139, 92, 246, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#1C2638';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top Banner Poster */}
      <GamePoster
        imageUrl={displayImage}
        title={title}
        status={status}
        playtime={playtime}
        onEdit={() => onEdit && onEdit(game)}
        onDelete={() => onDelete && onDelete(game.id)}
      />

      {/* Card Content Details */}
      <div
        style={{
          padding: '0.95rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.55rem',
          flex: 1,
        }}
      >
        {/* Genre & Platform Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: '600',
              color: '#94A3B8',
              backgroundColor: '#161F30',
              border: '1px solid #233048',
              padding: '0.15rem 0.55rem',
              borderRadius: '5px',
              letterSpacing: '0.01em',
            }}
          >
            {genre}
          </span>
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: '600',
              color: '#64748B',
              backgroundColor: '#131A29',
              border: '1px solid #1F2A3E',
              padding: '0.15rem 0.45rem',
              borderRadius: '5px',
            }}
          >
            {platform}
          </span>
        </div>

        {/* Game Title */}
        <h3
          title={title}
          style={{
            fontSize: '0.98rem',
            fontWeight: '700',
            color: '#FFFFFF',
            lineHeight: 1.35,
            margin: '0.1rem 0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </h3>

        {/* Rating Row: 5 Gold Stars & Score */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
            paddingTop: '0.4rem',
            borderTop: '1px solid #172033',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              color: '#FBBF24',
              fontSize: '0.92rem',
            }}
          >
            {stars.map((type, idx) => (
              <span key={idx} style={{ lineHeight: 1 }}>
                {type === 'full' ? '★' : type === 'half' ? '½' : '☆'}
              </span>
            ))}
          </div>

          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: '600',
              color: '#64748B',
            }}
          >
            {formatRating(rating)} / 5
          </span>
        </div>
      </div>
    </div>
  );
}
