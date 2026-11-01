/**
 * Status Options and visual badge configurations for Arcadex Game Catalog.
 * Styled with neon-tinted indicators suited for dark aesthetic UI (#0B0F17 / #0F172A).
 */

export const STATUS_TYPES = {
  ALL: 'All',
  NOW_PLAYING: 'Now Playing',
  COMPLETED: 'Completed',
  BACKLOG: 'Backlog',
  WISHLIST: 'Wishlist',
};

export const STATUS_CONFIG = {
  'All': {
    label: 'All',
    dotColor: '#94A3B8',
    textColor: '#E2E8F0',
    bgColor: 'rgba(148, 163, 184, 0.12)',
    borderColor: 'rgba(148, 163, 184, 0.25)',
  },
  'Now Playing': {
    label: 'Now Playing',
    dotColor: '#10B981',
    textColor: '#34D399',
    bgColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  'Completed': {
    label: 'Completed',
    dotColor: '#6366F1',
    textColor: '#818CF8',
    bgColor: 'rgba(99, 102, 241, 0.12)',
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  'Backlog': {
    label: 'Backlog',
    dotColor: '#F59E0B',
    textColor: '#FBBF24',
    bgColor: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  'Wishlist': {
    label: 'Wishlist',
    dotColor: '#EC4899',
    textColor: '#F472B6',
    bgColor: 'rgba(236, 72, 153, 0.12)',
    borderColor: 'rgba(236, 72, 153, 0.3)',
  },
};

export const STATUS_OPTIONS = [
  { id: 'all', ...STATUS_CONFIG['All'] },
  { id: 'now-playing', ...STATUS_CONFIG['Now Playing'] },
  { id: 'completed', ...STATUS_CONFIG['Completed'] },
  { id: 'backlog', ...STATUS_CONFIG['Backlog'] },
  { id: 'wishlist', ...STATUS_CONFIG['Wishlist'] },
];

export default STATUS_OPTIONS;
