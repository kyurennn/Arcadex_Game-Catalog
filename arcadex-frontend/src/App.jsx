/**
 * =========================================================================================
 * TUGAS PERKULIAHAN BAB 7 - AJAX DAN KONSUMSI API EKSTERNAL/MOCK
 * =========================================================================================
 * 
 * 1. DOKUMENTASI ENDPOINT API (Instruksi 1 & 5):
 *    - Endpoint Utama: https://api.rawg.io/api/games
 *    - Parameter Query: ?key={RAWG_API_KEY}&page_size=8&search={searchQuery}
 *    - Alasan Pemilihan:
 *      RAWG Video Games Database API adalah database video game terbesar dan terbuka untuk
 *      pengembang, menyediakan data game nyata lengkap (judul, poster, genre, platform, rating,
 *      dan tanggal rilis). Endpoint ini gratis, mendukung CORS langsung dari browser, dan sangat
 *      relevan dengan tema aplikasi katalog game "Arcadex".
 *    - Endpoint Mock POST: https://jsonplaceholder.typicode.com/posts
 *      Digunakan pada komponen GameFormModal untuk simulasi pengiriman data game baru via HTTP POST.
 * 
 * 2. PENERAPAN POLA ASINKRON LOADING, SUCCESS, DAN ERROR (Instruksi 2 & 5):
 *    - Nama Fungsi Utama: `loadGames(query, forceError)`
 *    - State Loading: `isLoading` (boolean) -> Mengatur tampilan LoadingSkeleton saat data diambil.
 *    - State Error: `isError` (boolean) & `errorMessage` (string) -> Mengatur tampilan ErrorStateCard.
 *    - State Success/Data: `games` (array) -> Menyimpan hasil response JSON yang telah dipetakan.
 *    - Mekanisme Interaktivitas Error Recovery: Fungsi `handleRetry` memanggil kembali `loadGames()`
 *      melalui tombol "Coba Lagi" saat request gagal.
 * =========================================================================================
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/navbar';
import { HeroStats } from './components/hero';
import { Toolbar } from './components/toolbar';
import { CatalogGrid } from './components/catalog';
import { RecommendationSection } from './components/recommendations';
import { GameFormModal } from './components/modal';
import { Footer } from './components/footer';
import ApiStateUI from './components/common/ApiStateUI';
import { fetchRawgGames } from './services/rawgApi';

export default function App() {
  // Task 7: Asynchronous API States
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Filter, Search, Sort & Modal States
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating-desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState(null);

  /**
   * Main asynchronous data fetcher for RAWG API (Task 7 Requirement)
   * Handles:
   * - Transition to Loading state (isLoading = true)
   * - Transition to Success state (games = data, isLoading = false)
   * - Transition to Error state (isError = true, errorMessage set)
   */
  const loadGames = useCallback(async (query = '') => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');

    try {
      // Live async consumption from RAWG API
      const liveGames = await fetchRawgGames(query, 1, 12);
      setGames(liveGames);
      setIsLoading(false);
    } catch (err) {
      console.error('[Arcadex RAWG API Error]:', err);
      setIsError(true);
      setErrorMessage(err.message || 'Tidak dapat memuat data game.');
      setIsLoading(false);
    }
  }, []);

  // Initial Data Fetch on Mount
  useEffect(() => {
    loadGames('');
  }, [loadGames]);

  // Debounced search query trigger for live RAWG API search
  useEffect(() => {
    // Avoid triggering on the very first render (handled by mount effect)
    const timeoutHandler = setTimeout(() => {
      loadGames(searchQuery);
    }, 450);

    return () => clearTimeout(timeoutHandler);
  }, [searchQuery, loadGames]);

  // Client-Side Status Filter & Sort on Fetched API Data
  const filteredAndSortedGames = useMemo(() => {
    return games
      .filter((game) => {
        if (activeFilter === 'All') return true;
        return game.status?.toLowerCase() === activeFilter.toLowerCase();
      })
      .sort((a, b) => {
        if (sortBy === 'rating-desc') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'rating-asc') return (a.rating || 0) - (b.rating || 0);
        if (sortBy === 'title-asc') return (a.title || '').localeCompare(b.title || '');
        if (sortBy === 'playtime-desc') return (b.playtime || 0) - (a.playtime || 0);
        return 0;
      });
  }, [games, activeFilter, sortBy]);

  // Modal Handlers
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
      setGames((prev) =>
        prev.map((item) =>
          item.id === editingGame.id ? { ...item, ...gameData, id: editingGame.id } : item
        )
      );
    } else {
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
    const exists = games.find(
      (g) => g.title.toLowerCase() === recGame.title.toLowerCase()
    );

    if (exists) {
      alert(`"${recGame.title}" sudah ada di dalam katalog (${exists.status}).`);
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

  // Task 7: "Coba Lagi" (Retry) Button Handler
  const handleRetry = () => {
    loadGames(searchQuery);
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

      {/* Main Container */}
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

        {/* 3. Toolbar with Filter Title, Total Count & Sort Options */}
        <Toolbar
          title={activeFilter === 'All' ? 'All Catalog Games' : `${activeFilter} Games`}
          totalCount={filteredAndSortedGames.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* 4. Task 7 Async API State Orchestrator (Loading, Error, Empty, and Success Grid) */}
        <ApiStateUI
          isLoading={isLoading}
          isError={isError}
          errorMessage={errorMessage}
          onRetry={handleRetry}
          isEmpty={filteredAndSortedGames.length === 0}
          searchQuery={searchQuery}
          activeFilter={activeFilter}
          onReset={() => setSearchQuery('')}
          onOpenModal={handleOpenAddModal}
        >
          <CatalogGrid
            games={filteredAndSortedGames}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteGame}
          />
        </ApiStateUI>

        {/* 5. Recommendation Section */}
        <RecommendationSection
          onQuickWishlistAdd={handleQuickWishlistAdd}
        />
      </main>

      {/* 6. Footer Component */}
      <Footer />

      {/* 7. Modal Form (Add & Edit Game Dialog with simulated HTTP POST) */}
      <GameFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        initialData={editingGame}
      />
    </div>
  );
}
