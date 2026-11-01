import React from 'react';
import { formatRating, getStarArray } from '../../utils/formatters';

export default function MatchCard({ game, onQuickWishlistAdd }) {
  const {
    id,
    title,
    genre,
    platform = 'PC / PS5',
    rating = '4.8',
    subBadge,
    reason,
    recommendationReason,
    coverImage,
    imageUrl,
    poster,
  } = game;

  const displayImage =
    coverImage ||
    imageUrl ||
    poster ||
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';

  const displayReason = reason || recommendationReason || 'Game Terpopuler Rilis 2025';
  const numericRating = Math.round(Number(rating) || 5);
  const displayRating = formatRating(numericRating);
  const stars = getStarArray(numericRating, 5);

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
      {/* Top Cover with Sub Badge */}
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
            background:
              'linear-gradient(180deg, rgba(10, 13, 20, 0.35) 0%, rgba(10, 13, 20, 0.85) 100%)',
          }}
        />

        {/* Top-Right Sub Badge */}
        {subBadge && (
          <div
            style={{
              position: 'absolute',
              top: '0.6rem',
              right: '0.6rem',
              padding: '0.2rem 0.55rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(15, 21, 35, 0.88)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#E2E8F0',
              fontSize: '0.68rem',
              fontWeight: '600',
              letterSpacing: '0.02em',
              maxWidth: '120px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {subBadge}
          </div>
        )}
      </div>

      {/* Content Details */}
      <div style={{ padding: '0.85rem 0.9rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
        {/* Genre & Platform tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
          {genre && (
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: '600',
                color: '#94A3B8',
                backgroundColor: '#161F30',
                border: '1px solid #233048',
                padding: '0.12rem 0.45rem',
                borderRadius: '4px',
              }}
            >
              {genre}
            </span>
          )}
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: '600',
              color: '#64748B',
              backgroundColor: '#131A29',
              border: '1px solid #1F2A3E',
              padding: '0.12rem 0.45rem',
              borderRadius: '4px',
              maxWidth: '135px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={platform}
          >
            {platform}
          </span>
        </div>

        {/* Title */}
        <h3
          title={title}
          style={{
            fontSize: '0.94rem',
            fontWeight: '700',
            color: '#FFFFFF',
            margin: '0.1rem 0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h3>

        {/* Recommendation Reason */}
        <p
          style={{
            fontSize: '0.74rem',
            color: '#94A3B8',
            lineHeight: 1.35,
            margin: 0,
            minHeight: '2.2em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {displayReason}
        </p>

        {/* Bottom Row: 1 to 5 Star Rating & + Wishlist CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
            paddingTop: '0.6rem',
            borderTop: '1px solid #172033',
            gap: '0.5rem',
          }}
        >
          {/* 1-5 Star Visual Rating Range */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
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
              title={`${displayRating} / 5`}
            >
              {stars.map((type, idx) => (
                <span key={idx} style={{ lineHeight: 1 }}>
                  {type === 'full' ? '★' : '☆'}
                </span>
              ))}
            </div>

            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: '600',
                color: '#64748B',
              }}
            >
              {displayRating}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onQuickWishlistAdd && onQuickWishlistAdd(game)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.32rem 0.65rem',
              borderRadius: '6px',
              backgroundColor: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              color: '#C4B5FD',
              fontSize: '0.75rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#8B5CF6';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = '#8B5CF6';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(139, 92, 246, 0.5)';
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


