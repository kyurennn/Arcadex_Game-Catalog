import React, { useState, useMemo } from 'react';
import { Header } from './components/navbar';
import { HeroStats } from './components/hero';
import { Toolbar } from './components/toolbar';
import { CatalogGrid } from './components/catalog';
import { RecommendationSection } from './components/recommendations';
import { GameFormModal } from './components/modal';
import { Footer } from './components/footer';
import { initialGames, recommendedGames } from './data/mockGames';

export default function App() {
  const [games, setGames] = useState(initialGames);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating-desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState(null);

  // Keyboard shortcut listener for search (Ctrl+K or Cmd+K)
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter and Sort Processing
  const filteredAndSortedGames = useMemo(() => {
    return games
      .filter((game) => {
        // Status filter
        const matchesStatus =
          activeFilter === 'All' || game.status.toLowerCase() === activeFilter.toLowerCase();

        // Search query filter (matches title, genre, or platform)
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !q ||
          game.title.toLowerCase().includes(q) ||
          game.genre.toLowerCase().includes(q) ||
          game.platform.toLowerCase().includes(q);

        return matchesStatus && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'rating-desc') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'rating-asc') return (a.rating || 0) - (b.rating || 0);
        if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
        if (sortBy === 'playtime-desc') return (b.playtime || 0) - (a.playtime || 0);
        return 0;
      });
  }, [games, activeFilter, searchQuery, sortBy]);

  // Handlers
  const handleOpenAddModal = () => {
    setEditingGame(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (game) => {
    setEditingGame(game);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGame(null);
  };

  const handleFormSubmit = (gameData) => {
    if (editingGame && editingGame.id) {
      // Update existing game
      setGames((prev) =>
        prev.map((item) =>
          item.id === editingGame.id ? { ...item, ...gameData, id: editingGame.id } : item
        )
      );
    } else {
      // Add new game
      const newGame = {
        ...gameData,
        id: Date.now(),
      };
      setGames((prev) => [newGame, ...prev]);
    }
  };

  const handleDeleteGame = (gameId) => {
    const target = games.find((g) => g.id === gameId);
    const confirmMessage = target
      ? `Apakah Anda yakin ingin menghapus "${target.title}" dari katalog?`
      : 'Hapus game ini dari katalog?';

    if (window.confirm(confirmMessage)) {
      setGames((prev) => prev.filter((g) => g.id !== gameId));
    }
  };

  const handleQuickWishlistAdd = (recGame) => {
    // Check if game already in catalog
    const exists = games.find(
      (g) => g.title.toLowerCase() === recGame.title.toLowerCase()
    );

    if (exists) {
      alert(`"${recGame.title}" sudah ada di dalam katalog Anda (${exists.status}).`);
      return;
    }

    const newWishlistGame = {
      id: Date.now(),
      title: recGame.title,
      genre: recGame.genre,
      platform: recGame.platform ? recGame.platform.split('/')[0].trim() : 'PC',
      playtime: 0,
      rating: recGame.rating || 5.0,
      status: 'Wishlist',
      imageUrl: recGame.imageUrl || recGame.poster,
      poster: recGame.imageUrl || recGame.poster,
    };

    setGames((prev) => [newWishlistGame, ...prev]);
    alert(`Berhasil menambahkan "${recGame.title}" ke Wishlist Anda!`);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0A0D14',
        color: '#F8FAFC',
        fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* 1. Header / Navbar */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        onOpenModal={handleOpenAddModal}
      />

      {/* Main App Content Area */}
      <main
        style={{
          flex: 1,
          maxWidth: '1440px',
          width: '100%',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        {/* 2. Hero / Stats Summary Bar */}
        <HeroStats
          games={games}
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
        />

        {/* 3. Toolbar (Heading, Cloud Status, Sort & View Controls) */}
        <Toolbar
          title={activeFilter === 'All' ? 'All Catalog Games' : `${activeFilter} Games`}
          totalCount={filteredAndSortedGames.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* 4. Catalog Grid or Task 6 Empty State */}
        {filteredAndSortedGames.length > 0 ? (
          <CatalogGrid
            games={filteredAndSortedGames}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteGame}
          />
        ) : (
          <div
            style={{
              padding: '4rem 1.5rem',
              margin: '1rem 0 3rem 0',
              textAlign: 'center',
              backgroundColor: '#0F1523',
              border: '1px dashed #24324A',
              borderRadius: '16px',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
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

            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '0.45rem' }}>
              Belum ada data game {activeFilter !== 'All' ? `(${activeFilter})` : ''}
            </h3>

            <p style={{ fontSize: '0.88rem', color: '#94A3B8', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
              {searchQuery
                ? `Tidak ditemukan game yang cocok dengan kata kunci "${searchQuery}". Coba kata kunci lain atau bersihkan pencarian.`
                : `Belum ada game yang tersimpan dengan status ${activeFilter}. Anda dapat menambahkan game baru sekarang.`}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
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

              <button
                type="button"
                onClick={handleOpenAddModal}
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
            </div>
          </div>
        )}

        {/* 5. Recommendation Section ("✦ Rekomendasi Untuk Anda") */}
        <RecommendationSection
          recommendations={recommendedGames}
          onQuickWishlistAdd={handleQuickWishlistAdd}
        />
      </main>

      {/* 6. Footer Component */}
      <Footer />

      {/* 7. Modal Form (Add & Edit Game Dialog) */}
      <GameFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        initialData={editingGame}
      />
    </div>
  );
}
