import React, { useState } from 'react';
import RecommendationList from './RecommendationList';

export default function RecommendationSection({
  recommendations = [],
  onQuickWishlistAdd,
}) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <section
      style={{
        marginTop: '2.5rem',
        marginBottom: '3rem',
        paddingTop: '2rem',
        borderTop: '1px solid #1A2333',
      }}
    >
      {/* Section Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <span style={{ color: '#A855F7', fontSize: '1.15rem' }}>✦</span>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0 }}>
              Rekomendasi Untuk Anda
            </h2>
          </div>
          <p style={{ fontSize: '0.84rem', color: '#64748B', margin: 0 }}>
            Berdasarkan genre dan game favorit di katalog Anda
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={handleRefresh}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '9999px',
              backgroundColor: '#111724',
              border: '1px solid #1E2738',
              color: '#94A3B8',
              fontSize: '0.8rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = '#334155';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94A3B8';
              e.currentTarget.style.borderColor = '#1E2738';
            }}
          >
            <span
              style={{
                display: 'inline-block',
                transform: isRefreshing ? 'rotate(360deg)' : 'none',
                transition: 'transform 0.5s ease',
              }}
            >
              ↻
            </span>
            <span>Refresh Rekomendasi</span>
          </button>

          <button
            type="button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: '#A855F7',
              fontSize: '0.84rem',
              fontWeight: '600',
              cursor: 'pointer',
              padding: '0.45rem',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#C084FC')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#A855F7')}
          >
            <span>Lihat Semua</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Grid of Recommendation Cards */}
      <RecommendationList
        recommendations={recommendations}
        onQuickWishlistAdd={onQuickWishlistAdd}
      />
    </section>
  );
}
