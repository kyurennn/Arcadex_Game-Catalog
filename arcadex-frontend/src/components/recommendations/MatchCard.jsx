import React from 'react';
import { formatRating } from '../../utils/formatters';

export default function MatchCard({ game, onQuickWishlistAdd }) {
  const {
    id,
    title,
    genre,
    platform,
    rating = 4.9,
    subBadge,
    recommendationReason,
    imageUrl,
    poster,
  } = game;

  const displayImage = imageUrl || poster;

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
        e.currentTarget.style.boxShadow = '0 10px 28px rgba(0, 0, 0, 0.55), 0 0 16px rgba(139, 92, 246, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#1C2638';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top Poster with Sub-Badge */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', overflow: 'hidden' }}>
        <img
          src={displayImage}
          alt={title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(10, 13, 20, 0.45) 0%, rgba(10, 13, 20, 0.8) 100%)',
          }}
        />

        {/* Top-Right Sub Badge */}
        {subBadge && (
          <div
            style={{
              position: 'absolute',
              top: '0.65rem',
              right: '0.65rem',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(15, 21, 35, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#E2E8F0',
              fontSize: '0.7rem',
              fontWeight: '600',
              letterSpacing: '0.02em',
            }}
          >
            {subBadge}
          </div>
        )}
      </div>

      {/* Content Details */}
      <div style={{ padding: '0.95rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
        {/* Genre & Platform tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: '600',
              color: '#94A3B8',
              backgroundColor: '#161F30',
              border: '1px solid #233048',
              padding: '0.12rem 0.5rem',
              borderRadius: '4px',
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
              padding: '0.12rem 0.4rem',
              borderRadius: '4px',
            }}
          >
            {platform}
          </span>
        </div>

        {/* Title */}
        <h3
          title={title}
          style={{
            fontSize: '0.98rem',
            fontWeight: '700',
            color: '#FFFFFF',
            margin: '0.1rem 0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </h3>

        {/* Recommendation Reason */}
        <p
          style={{
            fontSize: '0.78rem',
            color: '#94A3B8',
            lineHeight: 1.4,
            margin: 0,
            minHeight: '2.4em',
          }}
        >
          {recommendationReason}
        </p>

        {/* Bottom Row: Rating & + Wishlist CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
            paddingTop: '0.65rem',
            borderTop: '1px solid #172033',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#FBBF24', fontSize: '0.85rem' }}>
            <span>★</span>
            <span style={{ color: '#E2E8F0', fontWeight: '600', fontSize: '0.82rem' }}>
              {formatRating(rating)} / 5
            </span>
          </div>

          <button
            type="button"
            onClick={() => onQuickWishlistAdd && onQuickWishlistAdd(game)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              backgroundColor: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              color: '#C4B5FD',
              fontSize: '0.78rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#8B5CF6';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = '#8B5CF6';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(139, 92, 246, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.15)';
              e.currentTarget.style.color = '#C4B5FD';
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span>+ Wishlist</span>
          </button>
        </div>
      </div>
    </div>
  );
}
