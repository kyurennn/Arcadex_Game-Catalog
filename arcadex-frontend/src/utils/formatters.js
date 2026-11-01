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
    return '0';
  }
  return String(Math.round(Number(rating)));
}

/**
 * Generates an array of star types ('full', 'empty') for solid integer rendering (1-5).
 * Rounded to the nearest integer so there are no half stars (1/2).
 * @param {number} rating - Score between 0 and maxStars.
 * @param {number} maxStars - Default 5.
 * @returns {Array<'full' | 'empty'>}
 */
export function getStarArray(rating = 0, maxStars = 5) {
  const stars = [];
  const validRating = Math.max(0, Math.min(Number(rating) || 0, maxStars));
  const roundedRating = Math.round(validRating);

  for (let i = 1; i <= maxStars; i++) {
    if (i <= roundedRating) {
      stars.push('full');
    } else {
      stars.push('empty');
    }
  }

  return stars;
}

/**
 * Returns a text string representation of star rating with score.
 * E.g., "★★★★☆ (4)" or "★★★★★ (5)"
 * @param {number} rating - Rating score.
 * @param {number} maxStars - Default 5.
 * @returns {string}
 */
export function formatRatingStars(rating = 0, maxStars = 5) {
  const stars = getStarArray(rating, maxStars);
  const starIcons = stars
    .map((type) => (type === 'full' ? '★' : '☆'))
    .join('');

  return `${starIcons} (${formatRating(rating)})`;
}
