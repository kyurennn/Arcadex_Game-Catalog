/**
 * Utility formatters for Arcadex Game Catalog.
 */

/**
 * Format playtime into human-readable text.
 * @param {number} hours - Number of hours played.
 * @returns {string} Formatted playtime string (e.g., '86 hrs' or 'Not played yet').
 */
export function formatPlaytime(hours) {
  if (hours === undefined || hours === null || isNaN(hours)) {
    return '0 hrs';
  }
  const numericHours = Number(hours);
  if (numericHours <= 0) {
    return '0 hrs';
  }
  return `${numericHours} hrs`;
}

/**
 * Format rating to one decimal place string (e.g., 4.8, 5.0).
 * @param {number} rating - Rating score (1-5).
 * @returns {string} Formatted rating string.
 */
export function formatRating(rating) {
  if (rating === undefined || rating === null || isNaN(rating)) {
    return '0.0';
  }
  return Number(rating).toFixed(1);
}

/**
 * Generates an array of star types ('full', 'half', 'empty') for precise UI rendering.
 * @param {number} rating - Score between 0 and maxStars.
 * @param {number} maxStars - Default 5.
 * @returns {Array<'full' | 'half' | 'empty'>}
 */
export function getStarArray(rating = 0, maxStars = 5) {
  const stars = [];
  const validRating = Math.max(0, Math.min(Number(rating) || 0, maxStars));

  for (let i = 1; i <= maxStars; i++) {
    if (validRating >= i) {
      stars.push('full');
    } else if (validRating >= i - 0.5) {
      stars.push('half');
    } else {
      stars.push('empty');
    }
  }

  return stars;
}

/**
 * Returns a text string representation of star rating with score.
 * E.g., "★★★★½ (4.8)" or "★★★★★ (5.0)"
 * @param {number} rating - Rating score.
 * @param {number} maxStars - Default 5.
 * @returns {string}
 */
export function formatRatingStars(rating = 0, maxStars = 5) {
  const stars = getStarArray(rating, maxStars);
  const starIcons = stars
    .map((type) => {
      if (type === 'full') return '★';
      if (type === 'half') return '½';
      return '☆';
    })
    .join('');

  return `${starIcons} (${formatRating(rating)})`;
}
