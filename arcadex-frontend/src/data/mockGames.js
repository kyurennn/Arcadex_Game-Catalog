/**
 * Mock dataset for Arcadex Game Catalog.
 * 
 * Strict Image Reference Strategy:
 * - All game covers and poster thumbnails use direct, web-hosted HTTPS URLs.
 * - Sourced from reliable, high-performance web CDNs (Steam Official CDN & Web Artwork).
 */

export const initialGames = [
  {
    id: 1,
    title: 'Cyberpunk 2077: Phantom Liberty',
    genre: 'RPG / Sci-Fi',
    platform: 'PC',
    playtime: 42,
    rating: 5.0,
    status: 'Now Playing',
    imageUrl: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg',
    poster: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg'
  },
  {
    id: 2,
    title: 'Elden Ring: Shadow of the Erdtree',
    genre: 'Action RPG',
    platform: 'PS5',
    playtime: 110,
    rating: 5.0,
    status: 'Completed',
    imageUrl: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg',
    poster: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg'
  },
  {
    id: 3,
    title: 'Hades II',
    genre: 'Roguelike',
    platform: 'Steam Deck',
    playtime: 26,
    rating: 5.0,
    status: 'Now Playing',
    imageUrl: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1145350/header.jpg',
    poster: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1145350/header.jpg'
  },
  {
    id: 4,
    title: "Baldur's Gate 3",
    genre: 'Turn-Based RPG',
    platform: 'PC',
    playtime: 145,
    rating: 5.0,
    status: 'Completed',
    imageUrl: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg',
    poster: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg'
  },
  {
    id: 5,
    title: 'Silksong: Hollow Knight',
    genre: 'Metroidvania',
    platform: 'Switch',
    playtime: 0,
    rating: 5.0,
    status: 'Backlog',
    imageUrl: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1030300/header.jpg',
    poster: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1030300/header.jpg'
  },
  {
    id: 6,
    title: 'Alan Wake 2',
    genre: 'Survival Horror',
    platform: 'PS5',
    playtime: 0,
    rating: 4.0,
    status: 'Backlog',
    imageUrl: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/108710/header.jpg',
    poster: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/108710/header.jpg'
  },
  {
    id: 7,
    title: 'Final Fantasy VII Rebirth',
    genre: 'JRPG',
    platform: 'PS5',
    playtime: 78,
    rating: 4.0,
    status: 'Completed',
    imageUrl: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1462040/header.jpg',
    poster: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1462040/header.jpg'
  },
  {
    id: 8,
    title: 'Helldivers 2',
    genre: 'Co-op Shooter',
    platform: 'PC',
    playtime: 65,
    rating: 4.0,
    status: 'Now Playing',
    imageUrl: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/553850/header.jpg',
    poster: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/553850/header.jpg'
  }
];

export const recommendedGames = [
  {
    id: 101,
    title: 'Black Myth: Wukong',
    genre: 'Action RPG',
    platform: 'PC / PS5',
    rating: 4.9,
    matchPercentage: 98,
    subBadge: 'Souls-like Fan',
    recommendationReason: 'Karena Anda memainkan Elden Ring',
    imageUrl: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg',
    poster: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg'
  },
  {
    id: 102,
    title: 'Metaphor: ReFantazio',
    genre: 'JRPG / Fantasy',
    platform: 'PC / PS5',
    rating: 4.8,
    matchPercentage: 95,
    subBadge: 'Persona Creator',
    recommendationReason: "Karena Anda memainkan Baldur's Gate 3",
    imageUrl: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2620600/header.jpg',
    poster: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2620600/header.jpg'
  },
  {
    id: 103,
    title: 'Armored Core VI',
    genre: 'Mecha / Action',
    platform: 'PC / PS5',
    rating: 4.7,
    matchPercentage: 92,
    subBadge: 'Fast-Paced Combat',
    recommendationReason: 'Karena Anda memainkan Cyberpunk 2077',
    imageUrl: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1888160/header.jpg',
    poster: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1888160/header.jpg'
  },
  {
    id: 104,
    title: 'Ghost of Tsushima',
    genre: 'Action / Open World',
    platform: 'PC / PS5',
    rating: 4.9,
    matchPercentage: 89,
    subBadge: 'Masterpiece',
    recommendationReason: 'Karena Anda memainkan Helldivers 2',
    imageUrl: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2215430/header.jpg',
    poster: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2215430/header.jpg'
  }
];

export default { initialGames, recommendedGames };
