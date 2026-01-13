/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GitHub Contribution Art Generator
 * Copyright (c) 2024 Your Name
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Git Manager
 * 
 * Handles all Git operations with error handling and retry logic.
 */

import simpleGit from 'simple-git';
import { log } from '../utils/logger.js';
import { withRetry, sleep } from '../utils/helpers.js';

/**
 * Git Manager Class
 */
export class GitManager {
  #git;
  #config;
  #initialized = false;

  /**
   * Create a Git manager
   * 
   * @param {Object} config - Configuration object
   */
  constructor(config) {
    this.#config = config;
    this.#git = simpleGit({
      maxConcurrentProcesses: 1,
      trimmed: true,
    });
  }

  /**
   * Initialize and validate the Git repository
   * 
   * @returns {Promise<boolean>}
   */
  async initialize() {
    if (this.#initialized) {
      return true;
    }

    log.debug('Initializing Git manager...');

    try {
      // Check if we're in a git repository
      const isRepo = await this.#git.checkIsRepo();

      if (!isRepo) {
        throw new Error(
          'Not a Git repository. Please run "git init" first.'
        );
      }

      // Get current status
      const status = await this.#git.status();
      log.debug(`Current branch: ${status.current}`);

      // Check for remote
      const remotes = await this.#git.getRemotes(true);
      const targetRemote = remotes.find(
        r => r.name === this.#config.gitRemote
      );

      if (!targetRemote) {
        log.warn(
          `Remote "${this.#config.gitRemote}" not found. ` +
          `Push will fail. Add it with: git remote add ${this.#config.gitRemote} <url>`
        );
      } else {
        log.debug(`Remote: ${targetRemote.name} -> ${targetRemote.refs.push}`);
      }

      this.#initialized = true;
      log.debug('Git manager initialized successfully');

      return true;

    } catch (error) {
      throw new Error(`Git initialization failed: ${error.message}`);
    }
  }

  /**
   * Stage files for commit
   * 
   * @param {string|string[]} files - File(s) to stage
   * @returns {Promise<void>}
   */
  async stage(files) {
    const fileList = Array.isArray(files) ? files : [files];

    return withRetry(
      async () => {
        await this.#git.add(fileList);
      },
      3,
      500
    );
  }

  /**
   * Create a commit with a specific date
   * 
   * @param {string} message - Commit message
   * @param {string} date - ISO date string for the commit
   * @returns {Promise<Object>}
   */
  async commit(message, date) {
    return withRetry(
      async () => {
        const result = await this.#git.commit(message, undefined, {
          '--date': date,
          '--allow-empty': null,
        });
        return result;
      },
      3,
      500
    );
  }

  /**
   * Stage files and commit in one operation
   * 
   * @param {string|string[]} files - File(s) to stage
   * @param {string} message - Commit message
   * @param {string} date - ISO date string for the commit
   * @returns {Promise<Object>}
   */
  async stageAndCommit(files, message, date) {
    await this.stage(files);
    return this.commit(message, date);
  }

  /**
   * Push commits to remote
   * 
   * @returns {Promise<void>}
   */
  async push() {
    const { gitRemote, gitBranch } = this.#config;

    log.info(`Pushing to ${gitRemote}/${gitBranch}...`);

    return withRetry(
      async () => {
        await this.#git.push(gitRemote, gitBranch, ['--set-upstream']);
        log.success('Push completed successfully');
      },
      5,
      2000
    );
  }

  /**
   * Get repository status
   * 
   * @returns {Promise<Object>}
   */
  async getStatus() {
    return this.#git.status();
  }

  /**
   * Get commit count
   * 
   * @returns {Promise<number>}
   */
  async getCommitCount() {
    try {
      const logResult = await this.#git.log();
      return logResult.total;
    } catch {
      return 0;
    }
  }

  /**
   * Get the last commit info
   * 
   * @returns {Promise<Object|null>}
   */
  async getLastCommit() {
    try {
      const logResult = await this.#git.log({ n: 1 });
      return logResult.latest;
    } catch {
      return null;
    }
  }

  /**
   * Check if working directory is clean
   * 
   * @returns {Promise<boolean>}
   */
  async isClean() {
    const status = await this.getStatus();
    return status.isClean();
  }

  /**
   * Get current branch name
   * 
   * @returns {Promise<string>}
   */
  async getCurrentBranch() {
    const status = await this.getStatus();
    return status.current;
  }

  /**
   * Validate repository state
   * 
   * @returns {Promise<Object>}
   */
  async validateState() {
    const status = await this.getStatus();

    return {
      isClean: status.isClean(),
      currentBranch: status.current,
      tracking: status.tracking,
      ahead: status.ahead,
      behind: status.behind,
      hasUntracked: status.not_added.length > 0,
      hasModified: status.modified.length > 0,
      hasStaged: status.staged.length > 0,
    };
  }
}

export default GitManager;