/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GitHub Contribution Art Generator
 * Copyright (c) 2024 Your Name
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Pattern Generator
 * 
 * Generates commit schedules based on patterns or random distributions.
 */

import { getDay } from 'date-fns';
import { PATTERNS, LETTERS, getPattern, getLetter, listPatterns } from '../patterns/templates.js';
import { LEVEL_COMMIT_RANGES, CONTRIBUTION_LEVELS, ASCII_CHARS, DAY_NAMES } from '../utils/constants.js';
import { randomInt, getDateRange } from '../utils/helpers.js';
import { log } from '../utils/logger.js';

/**
 * Pattern Generator Class
 */
export class PatternGenerator {
  #config;

  /**
   * Create a pattern generator
   * 
   * @param {Object} config - Configuration object
   */
  constructor(config) {
    this.#config = config;
  }

  /**
   * Generate a random/organic commit schedule
   * 
   * @returns {Map<string, number>} - Map of date strings to commit counts
   */
  generateRandomSchedule() {
    const { minCommits, maxCommits, skipProbability } = this.#config;
    const dates = getDateRange(this.#config.startDate, this.#config.endDate);
    const schedule = new Map();

    log.debug(`Generating random schedule for ${dates.length} days`);

    for (const date of dates) {
      const dateKey = this.#formatDateKey(date);
      const dayOfWeek = getDay(date);

      // Adjust skip chance based on weekday (skip more on weekends)
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const adjustedSkipChance = isWeekend
        ? skipProbability * 1.5
        : skipProbability;

      // Check if we should skip this day
      if (Math.random() < adjustedSkipChance) {
        schedule.set(dateKey, 0);
        continue;
      }

      // Get day-based multiplier (less activity on weekends)
      const multiplier = this.#getDayMultiplier(dayOfWeek);

      // Calculate commit count
      const adjustedMin = Math.max(1, Math.floor(minCommits * multiplier));
      const adjustedMax = Math.ceil(maxCommits * multiplier);
      const commits = randomInt(adjustedMin, adjustedMax);

      schedule.set(dateKey, commits);
    }

    return schedule;
  }

  /**
   * Generate an organic schedule (simulates natural coding patterns)
   * 
   * @returns {Map<string, number>}
   */
  generateOrganicSchedule() {
    const dates = getDateRange(this.#config.startDate, this.#config.endDate);
    const schedule = new Map();

    // Generate "project burst" periods (periods of high activity)
    const bursts = this.#generateBurstPeriods(dates.length);

    log.debug(`Generated ${bursts.length} activity bursts`);

    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const dateKey = this.#formatDateKey(date);
      const dayOfWeek = getDay(date);

      // Base activity level based on day
      let activityLevel = this.#getDayMultiplier(dayOfWeek);

      // Check if we're in a burst period
      const inBurst = bursts.some(([start, end]) => i >= start && i <= end);
      if (inBurst) {
        activityLevel *= 2;
      }

      // Add variance
      const variance = (Math.random() - 0.5) * 0.5;
      activityLevel = Math.max(0, activityLevel + variance);

      // Calculate commits
      const maxPossible = Math.ceil(this.#config.maxCommits * activityLevel);

      if (Math.random() < this.#config.skipProbability) {
        schedule.set(dateKey, 0);
      } else {
        const commits = randomInt(1, Math.max(1, maxPossible));
        schedule.set(dateKey, commits);
      }
    }

    return schedule;
  }

  /**
   * Generate a schedule based on a pattern template
   * 
   * @param {string} patternName - Name of the pattern
   * @returns {Map<string, number>}
   */
  generatePatternSchedule(patternName) {
    const pattern = getPattern(patternName);

    if (!pattern) {
      const available = listPatterns().join(', ');
      throw new Error(
        `Pattern "${patternName}" not found. Available patterns: ${available}`
      );
    }

    return this.#applyPatternToSchedule(pattern);
  }

  /**
   * Generate a schedule that spells custom text
   * 
   * @param {string} text - Text to display
   * @returns {Map<string, number>}
   */
  generateTextSchedule(text) {
    const textPattern = this.#textToPattern(text.toUpperCase());
    return this.#applyPatternToSchedule(textPattern);
  }

  /**
   * Preview a schedule as ASCII art
   * 
   * @param {Map<string, number>} schedule - Schedule to preview
   * @returns {string}
   */
  previewSchedule(schedule) {
    const maxCommits = this.#config.maxCommits;
    const rows = [[], [], [], [], [], [], []];
    
    let currentWeek = -1;

    for (const [dateKey, commits] of schedule) {
      const date = new Date(dateKey);
      const dayOfWeek = date.getDay();
      const weekOfYear = this.#getWeekNumber(date);

      // Start new week
      if (weekOfYear !== currentWeek) {
        currentWeek = weekOfYear;
      }

      // Get ASCII character based on commit level
      const level = this.#commitsToLevel(commits, maxCommits);
      const char = this.#levelToAscii(level);

      rows[dayOfWeek].push(char);
    }

    // Build output
    let output = '\n';
    output += '  📊 Contribution Preview\n';
    output += '  ' + '─'.repeat(40) + '\n\n';

    for (let i = 0; i < 7; i++) {
      output += `  ${DAY_NAMES[i]}: ${rows[i].join('')}\n`;
    }

    output += '\n';
    output += '  Legend: [ ] None  [░] Low  [▒] Med  [▓] High  [█] Max\n';
    output += '  ' + '─'.repeat(40) + '\n';

    return output;
  }

  /**
   * Get statistics for a schedule
   * 
   * @param {Map<string, number>} schedule - Schedule to analyze
   * @returns {Object}
   */
  getScheduleStats(schedule) {
    const values = [...schedule.values()];
    const totalDays = values.length;
    const totalCommits = values.reduce((sum, val) => sum + val, 0);
    const activeDays = values.filter(v => v > 0).length;
    const skippedDays = totalDays - activeDays;
    const avgCommitsPerActiveDay = activeDays > 0 
      ? (totalCommits / activeDays).toFixed(1) 
      : 0;

    return {
      totalDays,
      totalCommits,
      activeDays,
      skippedDays,
      avgCommitsPerActiveDay,
      activePercentage: ((activeDays / totalDays) * 100).toFixed(1),
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PRIVATE METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Apply a pattern matrix to a date schedule
   */
  #applyPatternToSchedule(pattern) {
    const dates = getDateRange(this.#config.startDate, this.#config.endDate);
    const schedule = new Map();
    const patternWidth = pattern[0].length;

    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const dateKey = this.#formatDateKey(date);
      const dayOfWeek = getDay(date);
      const weekIndex = Math.floor(i / 7);
      const patternCol = weekIndex % patternWidth;

      // Get level from pattern
      const level = pattern[dayOfWeek]?.[patternCol] ?? 0;

      // Convert level to commits
      const commits = this.#levelToCommits(level);

      schedule.set(dateKey, commits);
    }

    return schedule;
  }

  /**
   * Convert text to a pattern matrix
   */
  #textToPattern(text) {
    const pattern = [[], [], [], [], [], [], []];

    for (const char of text) {
      const letterPattern = getLetter(char);

      for (let row = 0; row < 7; row++) {
        if (letterPattern[row]) {
          pattern[row].push(...letterPattern[row]);
        }
        // Add space between letters
        pattern[row].push(0);
      }
    }

    return pattern;
  }

  /**
   * Get day-based activity multiplier
   */
  #getDayMultiplier(dayOfWeek) {
    const multipliers = {
      0: 0.4,  // Sunday
      1: 1.0,  // Monday
      2: 1.1,  // Tuesday
      3: 1.2,  // Wednesday (peak)
      4: 1.1,  // Thursday
      5: 0.9,  // Friday
      6: 0.5,  // Saturday
    };
    return multipliers[dayOfWeek] ?? 1.0;
  }

  /**
   * Generate random burst periods
   */
  #generateBurstPeriods(totalDays) {
    const bursts = [];
    let currentDay = randomInt(0, 14);

    while (currentDay < totalDays) {
      const burstLength = randomInt(7, 21);
      const endDay = Math.min(currentDay + burstLength, totalDays - 1);
      
      bursts.push([currentDay, endDay]);
      
      // Gap between bursts
      currentDay = endDay + randomInt(14, 35);
    }

    return bursts;
  }

  /**
   * Convert level (0-4) to commit count
   */
  #levelToCommits(level) {
    const range = LEVEL_COMMIT_RANGES[level] || LEVEL_COMMIT_RANGES[0];
    return randomInt(range[0], range[1]);
  }

  /**
   * Convert commits to level (0-4)
   */
  #commitsToLevel(commits, maxCommits) {
    if (commits === 0) return 0;
    const ratio = commits / maxCommits;
    if (ratio <= 0.25) return 1;
    if (ratio <= 0.5) return 2;
    if (ratio <= 0.75) return 3;
    return 4;
  }

  /**
   * Convert level to ASCII character
   */
  #levelToAscii(level) {
    const chars = [' ', '░', '▒', '▓', '█'];
    return chars[level] || ' ';
  }

  /**
   * Format date as YYYY-MM-DD
   */
  #formatDateKey(date) {
    return date.toISOString().split('T')[0];
  }

  /**
   * Get week number of year
   */
  #getWeekNumber(date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const diff = date - startOfYear;
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    return Math.floor(diff / oneWeek);
  }
}

export default PatternGenerator;