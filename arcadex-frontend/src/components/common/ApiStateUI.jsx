import React from 'react';

/**
 * Loading Skeleton Grid for Arcadex Dark Mode.
 * Displays pulse shimmering cards while data is being fetched asynchronously from RAWG API.
 */
export function LoadingSkeleton({ count = 8, message = 'Memuat data game...' }) {
  const items = Array.from({ length: count });

  return (
    <div style={{ margin: '1rem 0 3rem 0' }}>
      {/* Loading Status Indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.65rem',
          padding: '0.85rem',
          marginBottom: '1.5rem',
          backgroundColor: '#0F1523',
          border: '1px solid #1E2B42',
          borderRadius: '10px',
          color: '#94A3B8',
          fontSize: '0.86rem',
        }}
      >
        <div
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid rgba(139, 92, 246, 0.25)',
            borderTopColor: '#8B5CF6',
            borderRadius: '50%',
            animation: 'arcadex-spin 0.8s linear infinite',
          }}
        />
        <span>{message}</span>
        <style>
          {`
            @keyframes arcadex-spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes arcadex-pulse {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 0.25; }
            }
          `}
        </style>
      </div>

      {/* Grid of Skeleton Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {items.map((_, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#0F1523',
              border: '1px solid #1A2333',
              borderRadius: '14px',
              overflow: 'hidden',
              height: '270px',
              display: 'flex',
              flexDirection: 'column',
              animation: 'arcadex-pulse 1.6s ease-in-out infinite',
            }}
          >
            {/* Poster placeholder */}
            <div
              style={{
                width: '100%',
                aspectRatio: '16 / 10',
                backgroundColor: '#162136',
              }}
            />
            {/* Content placeholders */}
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1 }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ width: '60px', height: '14px', backgroundColor: '#1A263D', borderRadius: '4px' }} />
                <div style={{ width: '40px', height: '14px', backgroundColor: '#162033', borderRadius: '4px' }} />
              </div>
              <div style={{ width: '85%', height: '18px', backgroundColor: '#1C2942', borderRadius: '4px' }} />
              <div style={{ width: '50%', height: '14px', backgroundColor: '#162033', borderRadius: '4px', marginTop: 'auto' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Error State Card with simple, clean design and Retry trigger.
 */
export function ErrorStateCard({
  errorMessage = 'Terjadi kesalahan saat memuat data.',
  onRetry,
}) {
  return (
    <div
      style={{
        margin: '1.5rem 0 2.5rem 0',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        backgroundColor: '#0F1523',
        border: '1px solid #1E2738',
        borderRadius: '12px',
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          margin: '0 auto 0.75rem auto',
          borderRadius: '50%',
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          color: '#F87171',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
          fontWeight: '700',
        }}
      >
        !
      </div>

      <h3
        style={{
          fontSize: '1rem',
          fontWeight: '600',
          color: '#F1F5F9',
          margin: '0 0 0.35rem 0',
        }}
      >
        Gagal memuat data
      </h3>

      <p
        style={{
          fontSize: '0.82rem',
          color: '#94A3B8',
          margin: '0 auto 1.25rem auto',
          maxWidth: '380px',
        }}
      >
        {errorMessage}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.45rem 1rem',
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
      )}
    </div>
  );
}

/**
 * Empty State Card when query returns 0 games.
 */
export function EmptyStateCard({
  searchQuery = '',
  activeFilter = 'All',
  onReset,
  onOpenModal,
}) {
  return (
    <div
      style={{
        padding: '3.5rem 1.5rem',
        margin: '1rem 0 3rem 0',
        textAlign: 'center',
        backgroundColor: '#0F1523',
        border: '1px dashed #24324A',
        borderRadius: '16px',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          margin: '0 auto 1.25rem auto',
          borderRadius: '50%',
          backgroundColor: 'rgba(139, 92, 246, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#A855F7',
          fontSize: '1.75rem',
        }}
      >
        🎮
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '0.45rem' }}>
        Belum ada data game {activeFilter !== 'All' ? `(${activeFilter})` : ''}
      </h3>

      <p style={{ fontSize: '0.86rem', color: '#94A3B8', maxWidth: '440px', margin: '0 auto 1.5rem auto' }}>
        {searchQuery
          ? `Tidak ditemukan game yang cocok dengan pencarian "${searchQuery}". Coba kata kunci lain atau reset pencarian.`
          : 'Belum ada game yang tersedia pada kategori ini. Anda dapat menambahkan game baru.'}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
        {onReset && searchQuery && (
          <button
            type="button"
            onClick={onReset}
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: '8px',
              backgroundColor: '#162136',
              border: '1px solid #23324E',
              color: '#E2E8F0',
              fontSize: '0.84rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Reset Pencarian
          </button>
        )}

        {onOpenModal && (
          <button
            type="button"
            onClick={onOpenModal}
            style={{
              padding: '0.55rem 1.25rem',
              borderRadius: '8px',
              backgroundColor: '#8B5CF6',
              backgroundImage: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              color: '#FFFFFF',
              fontSize: '0.84rem',
              fontWeight: '600',
              boxShadow: '0 2px 14px rgba(139, 92, 246, 0.45)',
              cursor: 'pointer',
            }}
          >
            + Tambah Game Baru
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Combined API State UI Orchestrator
 */
export default function ApiStateUI({
  isLoading,
  isError,
  errorMessage,
  onRetry,
  isEmpty,
  searchQuery,
  activeFilter,
  onReset,
  onOpenModal,
  children,
}) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <ErrorStateCard errorMessage={errorMessage} onRetry={onRetry} />;
  }

  if (isEmpty) {
    return (
      <EmptyStateCard
        searchQuery={searchQuery}
        activeFilter={activeFilter}
        onReset={onReset}
        onOpenModal={onOpenModal}
      />
    );
  }

  return children;
}
