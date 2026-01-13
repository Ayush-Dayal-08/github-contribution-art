/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GitHub Contribution Art Generator
 * Copyright (c) 2024 Your Name
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * GitHub Star/Follow Checker
 * 
 * Checks if user has starred repo and follows author.
 * This is a SOFT check - friendly reminder, not blocking.
 */

import chalk from 'chalk';
import { AUTHOR, getRepoUrl, getAuthorUrl } from './author.js';

/**
 * Check GitHub engagement status
 * 
 * @param {string} token - GitHub personal access token
 * @returns {Promise<Object>}
 */
export async function checkGitHubEngagement(token) {
  if (!token) {
    return { starred: null, following: null, noToken: true };
  }

  try {
    const [starred, following] = await Promise.all([
      checkStarred(token),
      checkFollowing(token),
    ]);

    return { starred, following, noToken: false, error: false };
  } catch (error) {
    return { starred: null, following: null, error: true };
  }
}

/**
 * Check if user starred the repo
 */
async function checkStarred(token) {
  try {
    const response = await fetch(
      `https://api.github.com/user/starred/${AUTHOR.github}/${AUTHOR.repo}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHubContributionArt',
        },
      }
    );
    
    return response.status === 204; // 204 = starred
  } catch {
    return null;
  }
}

/**
 * Check if user follows author
 */
async function checkFollowing(token) {
  try {
    const response = await fetch(
      `https://api.github.com/user/following/${AUTHOR.github}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHubContributionArt',
        },
      }
    );
    
    return response.status === 204; // 204 = following
  } catch {
    return null;
  }
}

/**
 * Display engagement status message
 */
export function displayEngagementMessage(status = null) {
  console.log('');
  console.log(chalk.gray('  ─'.repeat(30)));

  if (status && status.starred && status.following) {
    console.log(chalk.green('  💚 Thank you for your support!'));
  } else {
    console.log(chalk.cyan('  💙 Enjoying this FREE tool? Please support:'));
    console.log('');
    
    if (!status || status.starred === false) {
      console.log(chalk.white('     ⭐ Star the repo:'));
      console.log(chalk.gray(`        ${getRepoUrl()}`));
    }
    
    if (!status || status.following === false) {
      console.log(chalk.white('     👤 Follow the author:'));
      console.log(chalk.gray(`        ${getAuthorUrl()}`));
    }

    if (AUTHOR.donate) {
      console.log(chalk.white('     ☕ Buy me a coffee:'));
      console.log(chalk.gray(`        ${AUTHOR.donate}`));
    }
  }

  console.log(chalk.gray('  ─'.repeat(30)));
  console.log('');
}

export default { checkGitHubEngagement, displayEngagementMessage };