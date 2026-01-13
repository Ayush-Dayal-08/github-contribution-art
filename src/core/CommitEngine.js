/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GitHub Contribution Art Generator
 * Copyright (c) 2024 Your Name
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Commit Engine
 * 
 * Main engine that orchestrates the contribution generation process.
 */

import fs from 'fs/promises';
import path from 'path';
import jsonfile from 'jsonfile';
import chalk from 'chalk';
import cliProgress from 'cli-progress';
import ora from 'ora';

import { GitManager } from './GitManager.js';
import { PatternGenerator } from './PatternGenerator.js';
import { log } from '../utils/logger.js';
import {
  formatGitDate,
  formatDuration,
  generateId,
  sleep,
} from '../utils/helpers.js';
import {
  generateCommitMessage,
  generateDataFileContent,
  printCompletion,
} from '../branding/watermark.js';

/**
 * Commit Engine Class
 */
export class CommitEngine {
  #config;
  #licenseManager;
  #git;
  #patternGenerator;
  #isAborted = false;
  #stats = {
    totalCommits: 0,
    totalDays: 0,
    activeDays: 0,
    skippedDays: 0,
    errors: 0,
    startTime: null,
    endTime: null,
  };

  /**
   * Create a commit engine
   * 
   * @param {Object} config - Configuration object
   * @param {Object} licenseManager - License manager instance
   */
  constructor(config, licenseManager) {
    this.#config = config;
    this.#licenseManager = licenseManager;
    this.#git = new GitManager(config);
    this.#patternGenerator = new PatternGenerator(config);
  }

  /**
   * Get the data file path
   * 
   * @returns {string}
   */
  get dataFilePath() {
    return path.join(process.cwd(), 'data', 'contribution.json');
  }

  /**
   * Initialize the engine
   * 
   * @returns {Promise<boolean>}
   */
  async initialize() {
    const spinner = ora('Initializing commit engine...').start();

    try {
      // Ensure data directory exists
      const dataDir = path.dirname(this.dataFilePath);
      await fs.mkdir(dataDir, { recursive: true });

      // Initialize git
      await this.#git.initialize();

      // Validate repository state
      const state = await this.#git.validateState();
      log.debug('Repository state:', state);

      spinner.succeed('Commit engine initialized');
      return true;

    } catch (error) {
      spinner.fail(`Initialization failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Generate a schedule based on configuration
   * 
   * @returns {Map<string, number>}
   */
  generateSchedule() {
    const { pattern, enablePatterns } = this.#config;

    if (enablePatterns && pattern) {
      // Check if user has pattern feature
      if (!this.#licenseManager.hasFeature('patterns')) {
        log.warn('Patterns require Personal license or higher');
        log.info('Falling back to organic schedule');
        return this.#patternGenerator.generateOrganicSchedule();
      }

      log.info(`Generating pattern: ${pattern}`);
      
      try {
        return this.#patternGenerator.generatePatternSchedule(pattern);
      } catch (error) {
        log.warn(`Pattern error: ${error.message}`);
        log.info('Falling back to organic schedule');
        return this.#patternGenerator.generateOrganicSchedule();
      }
    }

    log.info('Generating organic contribution schedule...');
    return this.#patternGenerator.generateOrganicSchedule();
  }

  /**
   * Preview the schedule without making commits
   */
  preview() {
    const schedule = this.generateSchedule();
    const preview = this.#patternGenerator.previewSchedule(schedule);
    const stats = this.#patternGenerator.getScheduleStats(schedule);

    console.log(preview);
    
    console.log(chalk.white('\n  📊 Schedule Statistics:'));
    console.log(chalk.gray('  ─'.repeat(25)));
    console.log(chalk.gray(`     Total Days:      ${stats.totalDays}`));
    console.log(chalk.gray(`     Active Days:     ${stats.activeDays} (${stats.activePercentage}%)`));
    console.log(chalk.gray(`     Skipped Days:    ${stats.skippedDays}`));
    console.log(chalk.gray(`     Total Commits:   ${stats.totalCommits}`));
    console.log(chalk.gray(`     Avg per Day:     ${stats.avgCommitsPerActiveDay}`));
    console.log('');

    return schedule;
  }

  /**
   * Execute the commit generation
   * 
   * @returns {Promise<Object>}
   */
  async execute() {
    this.#stats.startTime = Date.now();

    // Generate schedule
    const schedule = this.generateSchedule();
    const scheduleStats = this.#patternGenerator.getScheduleStats(schedule);

    // Print plan
    this.#printPlan(scheduleStats);

    // Check for dry run
    if (this.#config.dryRun) {
      console.log(chalk.yellow('\n  🔍 DRY RUN MODE - No commits will be made\n'));
      this.preview();
      return this.#stats;
    }

    // Create progress bar
    const progressBar = new cliProgress.SingleBar({
      format: '  Progress |' + chalk.cyan('{bar}') + '| {percentage}% | {value}/{total} commits | ETA: {eta}s',
      barCompleteChar: '█',
      barIncompleteChar: '░',
      hideCursor: true,
    });

    progressBar.start(scheduleStats.totalCommits, 0);

    // Process each day
    let commitsMade = 0;

    for (const [dateKey, numCommits] of schedule) {
      // Check for abort
      if (this.#isAborted) {
        log.warn('Operation aborted by user');
        break;
      }

      this.#stats.totalDays++;

      // Skip days with no commits
      if (numCommits === 0) {
        this.#stats.skippedDays++;
        continue;
      }

      this.#stats.activeDays++;

      try {
        // Process this day's commits
        await this.#processDay(dateKey, numCommits, () => {
          commitsMade++;
          progressBar.update(commitsMade);
        });

      } catch (error) {
        this.#stats.errors++;
        log.error(`Failed to process ${dateKey}: ${error.message}`);
      }

      // Small delay to prevent overwhelming git
      await sleep(10);
    }

    progressBar.stop();

    this.#stats.totalCommits = commitsMade;
    this.#stats.endTime = Date.now();

    // Push if configured
    if (this.#config.pushOnComplete && !this.#isAborted) {
      try {
        await this.#git.push();
      } catch (error) {
        log.error(`Push failed: ${error.message}`);
        log.info('You can push manually with: git push');
      }
    }

    // Print completion
    printCompletion({
      totalCommits: this.#stats.totalCommits,
      totalDays: this.#stats.totalDays,
      activeDays: this.#stats.activeDays,
      skippedDays: this.#stats.skippedDays,
      errors: this.#stats.errors,
      duration: formatDuration(this.#stats.endTime - this.#stats.startTime),
    });

    return this.#stats;
  }

  /**
   * Abort the current operation
   */
  abort() {
    this.#isAborted = true;
    log.warn('Abort signal received, finishing current operation...');
  }

  /**
   * Get current statistics
   * 
   * @returns {Object}
   */
  get stats() {
    return { ...this.#stats };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PRIVATE METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Process a single day's commits
   */
  async #processDay(dateKey, numCommits, onProgress) {
    const baseDate = new Date(dateKey);

    for (let i = 0; i < numCommits; i++) {
      // Check for abort
      if (this.#isAborted) {
        return;
      }

      // Generate random time during the day (8 AM - 10 PM)
      const hour = Math.floor(Math.random() * 14) + 8;
      const minute = Math.floor(Math.random() * 60);
      const second = Math.floor(Math.random() * 60);

      const commitDate = new Date(baseDate);
      commitDate.setHours(hour, minute, second);

      const formattedDate = formatGitDate(commitDate);
      const commitId = generateId(8);

      // Generate commit message
      const message = generateCommitMessage(dateKey, i + 1, numCommits);

      // Generate data file content
      const data = generateDataFileContent({
        date: formattedDate,
        id: commitId,
        index: i + 1,
        total: numCommits,
      });

      // Write data file
      await jsonfile.writeFile(this.dataFilePath, data, { spaces: 2 });

      // Stage and commit
      await this.#git.stageAndCommit(
        this.dataFilePath,
        message,
        formattedDate
      );

      // Call progress callback
      if (onProgress) {
        onProgress();
      }
    }
  }

  /**
   * Print the execution plan
   */
  #printPlan(stats) {
    console.log('');
    console.log(chalk.bold.cyan('  📅 Contribution Generation Plan'));
    console.log(chalk.gray('  ─'.repeat(28)));
    console.log('');
    console.log(chalk.white(`     Start Date:      ${this.#config.startDate}`));
    console.log(chalk.white(`     End Date:        ${this.#config.endDate}`));
    console.log(chalk.white(`     Total Days:      ${chalk.yellow(stats.totalDays)}`));
    console.log(chalk.white(`     Active Days:     ${chalk.blue(stats.activeDays)}`));
    console.log(chalk.white(`     Total Commits:   ${chalk.green(stats.totalCommits)}`));
    console.log('');
    console.log(chalk.gray('  ─'.repeat(28)));
    console.log('');
  }
}

export default CommitEngine;