/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GitHub Contribution Art Generator
 * Copyright (c) 2024 Your Name
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Utility helper functions
 */

import crypto from 'crypto';
import {
  format,
  parseISO,
  eachDayOfInterval,
  differenceInDays,
  isValid,
} from 'date-fns';

/**
 * Generate a random integer between min and max (inclusive)
 * 
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number}
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a cryptographically secure random integer
 * 
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number}
 */
export function secureRandomInt(min, max) {
  const range = max - min + 1;
  const bytesNeeded = Math.ceil(Math.log2(range) / 8) || 1;
  const maxValid = Math.floor((256 ** bytesNeeded) / range) * range - 1;

  let randomValue;
  do {
    randomValue = crypto.randomBytes(bytesNeeded).readUIntBE(0, bytesNeeded);
  } while (randomValue > maxValid);

  return min + (randomValue % range);
}

/**
 * Generate a unique identifier
 * 
 * @param {number} length - Length of the ID in bytes
 * @returns {string}
 */
export function generateId(length = 16) {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Sleep for a specified duration
 * 
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Format a date for Git commit
 * 
 * @param {Date} date - Date to format
 * @returns {string}
 */
export function formatGitDate(date) {
  return format(date, "yyyy-MM-dd'T'HH:mm:ssxxx");
}

/**
 * Format a date for display
 * 
 * @param {Date} date - Date to format
 * @returns {string}
 */
export function formatDisplayDate(date) {
  return format(date, 'yyyy-MM-dd (EEEE)');
}

/**
 * Format a date as simple string
 * 
 * @param {Date} date - Date to format
 * @returns {string}
 */
export function formatSimpleDate(date) {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Parse a date string
 * 
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {Date|null}
 */
export function parseDate(dateString) {
  try {
    const date = parseISO(dateString);
    return isValid(date) ? date : null;
  } catch {
    return null;
  }
}

/**
 * Get all dates in a range
 * 
 * @param {string} startDate - Start date string
 * @param {string} endDate - End date string
 * @returns {Date[]}
 */
export function getDateRange(startDate, endDate) {
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  if (!start || !end) {
    throw new Error('Invalid date format. Use YYYY-MM-DD.');
  }

  if (start > end) {
    throw new Error('Start date must be before end date.');
  }

  return eachDayOfInterval({ start, end });
}

/**
 * Calculate statistics for a date range
 * 
 * @param {string} startDate - Start date string
 * @param {string} endDate - End date string
 * @returns {Object}
 */
export function calculateDateStats(startDate, endDate) {
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  if (!start || !end) {
    throw new Error('Invalid date format.');
  }

  const totalDays = differenceInDays(end, start) + 1;
  const totalWeeks = Math.ceil(totalDays / 7);

  return {
    startDate: start,
    endDate: end,
    totalDays,
    totalWeeks,
  };
}

/**
 * Check if a day should be skipped based on probability
 * 
 * @param {number} probability - Skip probability (0-1)
 * @returns {boolean}
 */
export function shouldSkipDay(probability) {
  return Math.random() < probability;
}

/**
 * Format a duration in milliseconds to human-readable string
 * 
 * @param {number} ms - Duration in milliseconds
 * @returns {string}
 */
export function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Format a number with commas
 * 
 * @param {number} num - Number to format
 * @returns {string}
 */
export function formatNumber(num) {
  return num.toLocaleString();
}

/**
 * Retry a function with exponential backoff
 * 
 * @param {Function} fn - Async function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise<any>}
 */
export async function withRetry(fn, maxRetries = 3, baseDelay = 1000) {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt);
        await sleep(delay);
      }
    }
  }

  throw lastError;
}

/**
 * Clamp a number between min and max
 * 
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Shuffle an array (Fisher-Yates algorithm)
 * 
 * @param {Array} array - Array to shuffle
 * @returns {Array}
 */
export function shuffleArray(array) {
  const result = [...array];
  
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  
  return result;
}

/**
 * Deep merge two objects
 * 
 * @param {Object} target - Target object
 * @param {Object} source - Source object
 * @returns {Object}
 */
export function deepMerge(target, source) {
  const result = { ...target };

  for (const key of Object.keys(source)) {
    if (
      source[key] instanceof Object &&
      !Array.isArray(source[key]) &&
      key in target &&
      target[key] instanceof Object &&
      !Array.isArray(target[key])
    ) {
      result[key] = deepMerge(target[key], source[key]);
    } else if (source[key] !== undefined) {
      result[key] = source[key];
    }
  }

  return result;
}

/**
 * Validate email format
 * 
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate date format (YYYY-MM-DD)
 * 
 * @param {string} dateString - Date string to validate
 * @returns {boolean}
 */
export function isValidDateFormat(dateString) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  
  if (!dateRegex.test(dateString)) {
    return false;
  }
  
  const date = parseDate(dateString);
  return date !== null;
}

/**
 * Truncate string with ellipsis
 * 
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string}
 */
export function truncate(str, maxLength = 50) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Check if running in a terminal
 * 
 * @returns {boolean}
 */
export function isTTY() {
  return process.stdout.isTTY === true;
}

export default {
  randomInt,
  secureRandomInt,
  generateId,
  sleep,
  formatGitDate,
  formatDisplayDate,
  formatSimpleDate,
  parseDate,
  getDateRange,
  calculateDateStats,
  shouldSkipDay,
  formatDuration,
  formatNumber,
  withRetry,
  clamp,
  shuffleArray,
  deepMerge,
  isValidEmail,
  isValidDateFormat,
  truncate,
  isTTY,
};