/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GitHub Contribution Art Generator
 * Copyright (c) 2024 Your Name
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Configuration Schema and Validation
 */

import { DEFAULTS } from '../utils/constants.js';
import { isValidDateFormat } from '../utils/helpers.js';

/**
 * Default configuration values
 */
const DEFAULT_CONFIG = {
  startDate: DEFAULTS.START_DATE,
  endDate: DEFAULTS.END_DATE,
  minCommits: DEFAULTS.MIN_COMMITS,
  maxCommits: DEFAULTS.MAX_COMMITS,
  skipProbability: DEFAULTS.SKIP_PROBABILITY,
  gitRemote: DEFAULTS.GIT_REMOTE,
  gitBranch: DEFAULTS.GIT_BRANCH,
  enablePatterns: false,
  pattern: null,
  dryRun: false,
  pushOnComplete: true,
};

/**
 * Validate configuration object
 * 
 * @param {Object} config - Configuration to validate
 * @returns {Object} - Validated configuration
 * @throws {Error} - If validation fails
 */
export function validateConfig(config) {
  const errors = [];

  // Validate startDate
  if (!config.startDate) {
    errors.push('startDate is required');
  } else if (!isValidDateFormat(config.startDate)) {
    errors.push('startDate must be in YYYY-MM-DD format');
  }

  // Validate endDate
  if (!config.endDate) {
    errors.push('endDate is required');
  } else if (!isValidDateFormat(config.endDate)) {
    errors.push('endDate must be in YYYY-MM-DD format');
  }

  // Validate date range
  if (config.startDate && config.endDate) {
    const start = new Date(config.startDate);
    const end = new Date(config.endDate);
    
    if (start > end) {
      errors.push('startDate must be before or equal to endDate');
    }
  }

  // Validate minCommits
  if (typeof config.minCommits !== 'number' || config.minCommits < 0) {
    errors.push('minCommits must be a non-negative number');
  }

  // Validate maxCommits
  if (typeof config.maxCommits !== 'number' || config.maxCommits < 1) {
    errors.push('maxCommits must be at least 1');
  }

  // Validate min <= max
  if (config.minCommits > config.maxCommits) {
    errors.push('minCommits cannot be greater than maxCommits');
  }

  // Validate skipProbability
  if (
    typeof config.skipProbability !== 'number' ||
    config.skipProbability < 0 ||
    config.skipProbability > 1
  ) {
    errors.push('skipProbability must be between 0 and 1');
  }

  // Validate gitRemote
  if (!config.gitRemote || typeof config.gitRemote !== 'string') {
    errors.push('gitRemote is required');
  }

  // Validate gitBranch
  if (!config.gitBranch || typeof config.gitBranch !== 'string') {
    errors.push('gitBranch is required');
  }

  // Throw all errors if any
  if (errors.length > 0) {
    throw new Error(
      'Configuration errors:\n  - ' + errors.join('\n  - ')
    );
  }

  return config;
}

/**
 * Load configuration from environment and CLI options
 * 
 * @param {Object} options - CLI options (override environment)
 * @returns {Object} - Complete configuration object
 */
export function loadConfig(options = {}) {
  // Load from environment variables
  const envConfig = {
    startDate: process.env.START_DATE || DEFAULT_CONFIG.startDate,
    endDate: process.env.END_DATE || DEFAULT_CONFIG.endDate,
    minCommits: parseInt(process.env.MIN_COMMITS_PER_DAY) || DEFAULT_CONFIG.minCommits,
    maxCommits: parseInt(process.env.MAX_COMMITS_PER_DAY) || DEFAULT_CONFIG.maxCommits,
    skipProbability: parseFloat(process.env.SKIP_PROBABILITY) || DEFAULT_CONFIG.skipProbability,
    gitRemote: process.env.GIT_REMOTE || DEFAULT_CONFIG.gitRemote,
    gitBranch: process.env.GIT_BRANCH || DEFAULT_CONFIG.gitBranch,
    enablePatterns: process.env.ENABLE_PATTERNS === 'true',
    pattern: process.env.PATTERN_NAME || null,
    dryRun: process.env.DRY_RUN === 'true',
    pushOnComplete: process.env.PUSH_ON_COMPLETE !== 'false',
  };

  // Merge with CLI options (CLI takes priority)
  const mergedConfig = { ...envConfig };

  // Apply CLI overrides (only if defined)
  if (options.startDate !== undefined) mergedConfig.startDate = options.startDate;
  if (options.endDate !== undefined) mergedConfig.endDate = options.endDate;
  if (options.minCommits !== undefined) mergedConfig.minCommits = options.minCommits;
  if (options.maxCommits !== undefined) mergedConfig.maxCommits = options.maxCommits;
  if (options.skipProbability !== undefined) mergedConfig.skipProbability = options.skipProbability;
  if (options.pattern !== undefined) {
    mergedConfig.pattern = options.pattern;
    mergedConfig.enablePatterns = true;
  }
  if (options.enablePatterns !== undefined) mergedConfig.enablePatterns = options.enablePatterns;
  if (options.dryRun !== undefined) mergedConfig.dryRun = options.dryRun;
  if (options.pushOnComplete !== undefined) mergedConfig.pushOnComplete = options.pushOnComplete;

  // Validate and return
  return validateConfig(mergedConfig);
}

/**
 * Get default configuration
 * 
 * @returns {Object}
 */
export function getDefaultConfig() {
  return { ...DEFAULT_CONFIG };
}

export default {
  loadConfig,
  validateConfig,
  getDefaultConfig,
};