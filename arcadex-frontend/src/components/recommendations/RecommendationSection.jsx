import React, { useState, useEffect, useCallback } from 'react';
import MatchCard from './MatchCard';
import { fetchPopular2025Games } from '../../services/rawgApi';

export default function RecommendationSection({
  onQuickWishlistAdd,
}) {
  const [recommendations, setRecommendations] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Initial 5-card fetch on mount or compact refresh
  const loadInitialRecommendations = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');

    try {
      const data = await fetchPopular2025Games(5, 1);
      setRecommendations(data);
    } catch (err) {
      console.error('[Arcadex 2025 Recommendations Error]:', err);
      setIsError(true);
      setErrorMessage(
        err.message || 'Gagal memuat rekomendasi game 2025 dari RAWG API.'
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Full catalog view fetch (triggered by "Lihat Semua ->")
  const loadFullCatalog = async () => {
    setIsExpanded(true);
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');
    setHasMore(true);

    try {
      const data = await fetchPopular2025Games(20, 1);
      // Deduplicate received items by ID
      const seenIds = new Set();
      const uniqueData = data.filter((g) => {
        if (seenIds.has(g.id)) return false;
        seenIds.add(g.id);
        return true;
      });
      setRecommendations(uniqueData);
    } catch (err) {
      console.error('[Arcadex Full 2025 Catalog Error]:', err);
      setIsError(true);
      setErrorMessage(
        err.message || 'Gagal memuat katalog lengkap game 2025 dari RAWG API.'
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // "Load More" pagination trigger when viewing all items
  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);

    // Compute exact next page in RAWG API based on current loaded items (pageSize = 10)
    // Example: with 20 items already loaded, next offset 20 is page 3 (1-10, 11-20, 21-30...)
    const targetPage = Math.floor(recommendations.length / 10) + 1;

    try {
      const moreGames = await fetchPopular2025Games(10, targetPage);
      if (!moreGames || moreGames.length === 0) {
        setHasMore(false);
      } else {
        setRecommendations((prev) => {
          // Strictly deduplicate by ID to prevent any duplicate rows
          const existingIds = new Set(prev.map((g) => g.id));
          const uniqueItems = moreGames.filter((g) => !existingIds.has(g.id));

          if (uniqueItems.length === 0) {
            setHasMore(false);
            return prev;
          }
          return [...prev, ...uniqueItems];
        });
      }
    } catch (err) {
      console.error('[Arcadex Load More Error]:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Collapse back to 5-card compact view
  const handleCollapse = () => {
    setIsExpanded(false);
    setRecommendations((prev) => prev.slice(0, 5));
  };

  // Trigger default 5 items on mount
  useEffect(() => {
    loadInitialRecommendations();
  }, [loadInitialRecommendations]);

  // Refresh handler (re-fetches from RAWG API)
  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (isExpanded) {
      await loadFullCatalog();
    } else {
      await loadInitialRecommendations();
    }
  };

  const skeletonCount = isExpanded ? 10 : 5;

  return (
    <section
      style={{
        marginTop: '2.5rem',
        marginBottom: '3.5rem',
        paddingTop: '2rem',
        borderTop: '1px solid #1A2333',
      }}
    >
      <style>
        {`
          @keyframes arcadex-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes arcadex-rec-pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 0.25; }
          }
          .arcadex-rec-grid {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            gap: 1rem;
          }
          @media (min-width: 640px) {
            .arcadex-rec-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
          @media (min-width: 768px) {
            .arcadex-rec-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
          }
          @media (min-width: 1024px) {
            .arcadex-rec-grid {
              grid-template-columns: repeat(5, minmax(0, 1fr));
            }
          }
        `}
      </style>

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
              {isExpanded ? 'Katalog Rekomendasi Populer 2025' : 'Rekomendasi Populer 2025'}
            </h2>
            {isExpanded && (
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  color: '#A855F7',
                  backgroundColor: 'rgba(168, 85, 247, 0.12)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  padding: '0.15rem 0.55rem',
                  borderRadius: '9999px',
                }}
              >
                {recommendations.length} Game
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.84rem', color: '#64748B', margin: 0 }}>
            {isExpanded
              ? 'Menampilkan katalog lengkap game terpopuler rilis 2025'
              : 'Top 5 game terpopuler rilis 2025'}
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isLoading || isRefreshing}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '9999px',
              backgroundColor: '#111724',
              border: '1px solid #1E2738',
              color: isRefreshing ? '#A855F7' : '#94A3B8',
              fontSize: '0.8rem',
              fontWeight: '500',
              cursor: isLoading || isRefreshing ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isLoading && !isRefreshing) {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = '#334155';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && !isRefreshing) {
                e.currentTarget.style.color = '#94A3B8';
                e.currentTarget.style.borderColor = '#1E2738';
              }
            }}
          >
            <span
              style={{
                display: 'inline-block',
                animation: isRefreshing ? 'arcadex-spin 0.8s linear infinite' : 'none',
              }}
            >
              ↻
            </span>
            <span>{isRefreshing ? 'Memperbarui...' : 'Refresh Rekomendasi'}</span>
          </button>

          {/* Toggle View: "Lihat Semua ->" or "← Tampilkan Ringkas" */}
          {isExpanded ? (
            <button
              type="button"
              onClick={handleCollapse}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: '#94A3B8',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer',
                padding: '0.45rem 0.75rem',
                borderRadius: '8px',
                backgroundColor: '#161F30',
                border: '1px solid #233048',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = '#384967';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94A3B8';
                e.currentTarget.style.borderColor = '#233048';
              }}
            >
              <span>← Tampilkan Ringkas (5 Game)</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={loadFullCatalog}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: '#A855F7',
                fontSize: '0.84rem',
                fontWeight: '600',
                cursor: 'pointer',
                padding: '0.45rem',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C084FC')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#A855F7')}
            >
              <span>Lihat Semua</span>
              <span>→</span>
            </button>
          )}
        </div>
      </div>

      {/* 1. Error State (No cards shown when error occurs) */}
      {isError ? (
        <div
          style={{
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            backgroundColor: '#0F1523',
            border: '1px solid #1E2738',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                color: '#F87171',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: '700',
                flexShrink: 0,
              }}
            >
              !
            </span>
            <div>
              <div style={{ color: '#F1F5F9', fontWeight: '600', fontSize: '0.88rem' }}>
                Gagal memuat rekomendasi
              </div>
              <div style={{ color: '#94A3B8', fontSize: '0.78rem', marginTop: '0.1rem' }}>
                {errorMessage}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={isExpanded ? loadFullCatalog : loadInitialRecommendations}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.4rem 0.85rem',
              borderRadius: '6px',
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              color: '#F1F5F9',
              fontSize: '0.8rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1E293B')}
          >
            <span>↻</span>
            <span>Coba Lagi</span>
          </button>
        </div>
      ) : isLoading ? (
        <div className="arcadex-rec-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: skeletonCount }).map((_, n) => (
            <div
              key={n}
              style={{
                backgroundColor: '#0F1523',
                border: '1px solid #1C2638',
                borderRadius: '14px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '310px',
                animation: 'arcadex-rec-pulse 1.5s ease-in-out infinite',
              }}
            >
              {/* Poster Skeleton */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16 / 10',
                  backgroundColor: '#162136',
                }}
              />
              {/* Content Skeleton */}
              <div
                style={{
                  padding: '0.85rem 0.9rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  flex: 1,
                }}
              >
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <div style={{ width: '50px', height: '14px', backgroundColor: '#1A263D', borderRadius: '4px' }} />
                  <div style={{ width: '65px', height: '14px', backgroundColor: '#162033', borderRadius: '4px' }} />
                </div>
                <div style={{ width: '85%', height: '16px', backgroundColor: '#1E2B42', borderRadius: '4px' }} />
                <div style={{ width: '95%', height: '12px', backgroundColor: '#162033', borderRadius: '4px' }} />
                <div style={{ width: '70%', height: '12px', backgroundColor: '#162033', borderRadius: '4px' }} />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                    paddingTop: '0.6rem',
                    borderTop: '1px solid #172033',
                  }}
                >
                  <div style={{ width: '45px', height: '14px', backgroundColor: '#1A263D', borderRadius: '4px' }} />
                  <div style={{ width: '70px', height: '22px', backgroundColor: '#1E2B42', borderRadius: '6px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* 3. Success State: 5 (or paginated) Dynamic MatchCards */
        <>
          <div className="arcadex-rec-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {recommendations.map((game) => (
              <MatchCard
                key={game.id}
                game={game}
                onQuickWishlistAdd={onQuickWishlistAdd}
              />
            ))}
          </div>

          {/* 4. "Load More" Pagination Trigger (when viewing full catalog) */}
          {isExpanded && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '2.25rem',
                gap: '0.65rem',
              }}
            >
              {hasMore ? (
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 1.6rem',
                    borderRadius: '9999px',
                    backgroundColor: '#161F30',
                    border: '1px solid #233048',
                    color: '#E2E8F0',
                    fontSize: '0.86rem',
                    fontWeight: '600',
                    cursor: isLoadingMore ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoadingMore) {
                      e.currentTarget.style.backgroundColor = '#1E2B42';
                      e.currentTarget.style.borderColor = '#384967';
                      e.currentTarget.style.color = '#FFFFFF';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoadingMore) {
                      e.currentTarget.style.backgroundColor = '#161F30';
                      e.currentTarget.style.borderColor = '#233048';
                      e.currentTarget.style.color = '#E2E8F0';
                    }
                  }}
                >
                  {isLoadingMore ? (
                    <>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '14px',
                          height: '14px',
                          border: '2px solid rgba(168, 85, 247, 0.3)',
                          borderTopColor: '#A855F7',
                          borderRadius: '50%',
                          animation: 'arcadex-spin 0.8s linear infinite',
                        }}
                      />
                      <span>Memuat game lainnya...</span>
                    </>
                  ) : (
                    <>
                      <span>↓</span>
                      <span>Muat Lebih Banyak Game (Load More)</span>
                    </>
                  )}
                </button>
              ) : (
                <div
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: '#111724',
                    border: '1px solid #1A2333',
                    color: '#64748B',
                    fontSize: '0.8rem',
                  }}
                >
                  ✓ Semua game populer 2025 telah dimuat.
                </div>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}

