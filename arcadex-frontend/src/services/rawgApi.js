/**
 * RAWG Video Games Database API Service
 * Integrates external asynchronous game data for Task 7 (BAB 7 - AJAX & Konsumsi API)
 */

export const RAWG_API_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_RAWG_API_KEY) ||
  'c542e67aec3a4340908f9de9e86038af';

export const BASE_URL = 'https://api.rawg.io/api';
const STATUS_DISTRIBUTION = ['Now Playing', 'Completed', 'Backlog', 'Wishlist'];

/**
 * Fetch games list from RAWG API asynchronously
 * @param {string} searchQuery - Optional search term
 * @param {number} page - Page number
 * @param {number} pageSize - Number of items per page
 * @returns {Promise<Array>} Formatted Arcadex Game entity array
 */
export async function fetchRawgGames(searchQuery = '', page = 1, pageSize = 8) {
  const queryParams = new URLSearchParams({
    key: RAWG_API_KEY,
    page_size: String(pageSize),
    page: String(page),
  });

  if (searchQuery && searchQuery.trim()) {
    queryParams.append('search', searchQuery.trim());
  }

  const endpoint = `${BASE_URL}/games?${queryParams.toString()}`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Tidak dapat memuat data (${response.status})`);
  }

  const data = await response.json();

  if (!data.results || !Array.isArray(data.results)) {
    throw new Error('Format data dari RAWG API tidak sesuai yang diharapkan.');
  }

  // Map RAWG payload to Arcadex Game entity
  return data.results.map((item, index) => {
    const rawgRating = item.rating ? Math.round(item.rating) : 5;
    const cover =
      item.background_image ||
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';

    return {
      id: item.id,
      title: item.name,
      coverImage: cover,
      imageUrl: cover,
      poster: cover,
      rating: rawgRating,
      genre: item.genres?.[0]?.name || 'Action',
      platform: item.platforms?.[0]?.platform?.name || 'PC',
      playtime: item.playtime && item.playtime > 0 ? item.playtime : ((index + 1) * 15),
      status: STATUS_DISTRIBUTION[index % STATUS_DISTRIBUTION.length],
      released: item.released,
      metacritic: item.metacritic,
    };
  });
}

/**
 * Fetch popular 2025 games from RAWG API for Recommendation Section (Task 7)
 * Endpoint: GET https://api.rawg.io/api/games?key=${API_KEY}&dates=2025-01-01,2025-12-31&ordering=-added&page_size=${pageSize}&page=${page}
 * @param {number} pageSize - Number of items to fetch (default = 5)
 * @param {number} page - Page number for pagination / "Load More" (default = 1)
 * @returns {Promise<Array>} Mapped recommendations for Arcadex MatchCard entity structure
 */
export async function fetchPopular2025Games(pageSize = 5, page = 1) {
  const queryParams = new URLSearchParams({
    key: RAWG_API_KEY,
    dates: '2025-01-01,2025-12-31',
    ordering: '-added',
    page_size: String(pageSize),
    page: String(page),
  });

  const endpoint = `${BASE_URL}/games?${queryParams.toString()}`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Tidak dapat memuat rekomendasi (${response.status})`);
  }

  const data = await response.json();

  if (!data.results || !Array.isArray(data.results)) {
    throw new Error('Format data rekomendasi dari RAWG API tidak sesuai yang diharapkan.');
  }

  // Transform response payload into Arcadex MatchCard entity structure
  return data.results.map((item) => {
    const rawgRating = item.rating ? Number(item.rating).toFixed(1) : '4.8';
    const cover =
      item.background_image ||
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';
    const primaryGenre = item.genres?.[0]?.name;
    const platformNames =
      item.platforms?.map((p) => p.platform?.name).filter(Boolean).slice(0, 2).join(' / ') ||
      'PC / PS5';
    // Deterministic match percentage between 90% and 99% based on game id
    const seed = Math.abs((Number(item.id) || 0) * 17) % 10;
    const matchScore = `${90 + seed}% Match`;
    const reasonText = 'Game Terpopuler Rilis 2025';

    return {
      id: item.id,
      title: item.name,
      coverImage: cover,
      imageUrl: cover,
      poster: cover,
      rating: rawgRating,
      platform: platformNames,
      genre: primaryGenre || 'Action',
      matchPercentage: matchScore,
      subBadge: primaryGenre || 'Popular 2025',
      reason: reasonText,
      recommendationReason: reasonText,
    };
  });
}


/**
 * Mock POST handler to satisfy Task 7 requirement (interaksi kirim data ke API via POST)
 * @param {Object} gameData - New game object to send
 * @returns {Promise<Object>} Created response
 */
export async function createGameMockPost(gameData) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameData),
  });

  if (!response.ok) {
    throw new Error('Gagal mengirim data game baru ke mock API.');
  }

  return await response.json();
}

export default { fetchRawgGames, fetchPopular2025Games, createGameMockPost };

