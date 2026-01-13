/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GitHub Contribution Art Generator
 * Copyright (c) 2024 Your Name
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Constants and enumerations used throughout the application
 */

/**
 * Exit codes for process termination
 */
export const EXIT_CODES = {
  SUCCESS: 0,
  GENERAL_ERROR: 1,
  CONFIG_ERROR: 2,
  LICENSE_ERROR: 3,
  GIT_ERROR: 4,
  VALIDATION_ERROR: 5,
  INTERRUPTED: 130,
};

/**
 * Contribution intensity levels (matches GitHub's display)
 */
export const CONTRIBUTION_LEVELS = {
  NONE: 0,      // No contributions (gray)
  LOW: 1,       // 1-3 contributions (light green)
  MEDIUM: 2,    // 4-8 contributions (medium green)
  HIGH: 3,      // 9-15 contributions (dark green)
  EXTREME: 4,   // 16+ contributions (darkest green)
};

/**
 * Commit count ranges for each contribution level
 */
export const LEVEL_COMMIT_RANGES = {
  [CONTRIBUTION_LEVELS.NONE]: [0, 0],
  [CONTRIBUTION_LEVELS.LOW]: [1, 3],
  [CONTRIBUTION_LEVELS.MEDIUM]: [4, 8],
  [CONTRIBUTION_LEVELS.HIGH]: [9, 15],
  [CONTRIBUTION_LEVELS.EXTREME]: [16, 25],
};

/**
 * Days of the week
 */
export const WEEKDAYS = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

/**
 * Day names for display
 */
export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * ASCII characters for contribution preview
 */
export const ASCII_CHARS = {
  NONE: ' ',
  LOW: '░',
  MEDIUM: '▒',
  HIGH: '▓',
  EXTREME: '█',
};

/**
 * GitHub contribution graph colors (for reference)
 */
export const GITHUB_COLORS = {
  NONE: '#ebedf0',
  LOW: '#9be9a8',
  MEDIUM: '#40c463',
  HIGH: '#30a14e',
  EXTREME: '#216e39',
};

/**
 * Default configuration values
 */
export const DEFAULTS = {
  START_DATE: '2024-01-01',
  END_DATE: '2024-12-31',
  MIN_COMMITS: 1,
  MAX_COMMITS: 15,
  SKIP_PROBABILITY: 0.15,
  GIT_REMOTE: 'origin',
  GIT_BRANCH: 'main',
  BATCH_SIZE: 10,
};

/**
 * Feature names for license checking
 */
export const FEATURES = {
  BASIC: 'basic',
  PATTERNS: 'patterns',
  CUSTOM_TEXT: 'custom-text',
  BATCH: 'batch',
  PRIORITY_SUPPORT: 'priority-support',
};