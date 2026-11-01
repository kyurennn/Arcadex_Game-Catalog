import React, { useState } from 'react';
import GameStatusBadge from './GameStatusBadge';
import GameActions from './GameActions';
import { formatPlaytime } from '../../utils/formatters';

export default function GamePoster({
  imageUrl,
  title,
  status,
  playtime,
  onEdit,
  onDelete,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 10',
        borderRadius: '12px 12px 0 0',
        overflow: 'hidden',
        backgroundColor: '#131926',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Poster Image */}
      <img
        src={imageUrl}
        alt={title}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />

      {/* Dark Vignette / Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(10, 13, 20, 0.45) 0%, rgba(10, 13, 20, 0) 40%, rgba(10, 13, 20, 0.75) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Left: Status Badge */}
      <div style={{ position: 'absolute', top: '0.65rem', left: '0.65rem', zIndex: 2 }}>
        <GameStatusBadge status={status} />
      </div>

      {/* Top Right: Actions Overlay (Always accessible or on hover) */}
      <div
        style={{
          position: 'absolute',
          top: '0.65rem',
          right: '0.65rem',
          zIndex: 3,
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(-4px)',
          transition: 'all 0.2s ease',
        }}
      >
        <GameActions onEdit={onEdit} onDelete={onDelete} />
      </div>

      {/* Bottom Right: Playtime Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '0.65rem',
          right: '0.65rem',
          zIndex: 2,
          padding: '0.2rem 0.55rem',
          borderRadius: '6px',
          backgroundColor: 'rgba(10, 14, 23, 0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#E2E8F0',
          fontSize: '0.72rem',
          fontWeight: '600',
          letterSpacing: '0.02em',
        }}
      >
        {formatPlaytime(playtime)}
      </div>
    </div>
  );
}
