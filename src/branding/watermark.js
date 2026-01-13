/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GitHub Contribution Art Generator
 * Copyright (c) 2024 Your Name
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Branding and watermark utilities
 * 
 * This module adds your branding to:
 *   - Console output
 *   - Commit messages
 *   - Generated data files
 */

import chalk from 'chalk';
import { PRODUCT_INFO } from '../licensing/publicKey.js';

/**
 * Brand configuration
 */
export const BRAND = {
  name: PRODUCT_INFO.name,
  version: PRODUCT_INFO.version,
  author: PRODUCT_INFO.author,
  authorUrl: PRODUCT_INFO.authorUrl,
  website: PRODUCT_INFO.website,
  repository: PRODUCT_INFO.repository,
  purchaseUrl: PRODUCT_INFO.purchaseUrl,
  supportEmail: PRODUCT_INFO.supportEmail,
  year: new Date().getFullYear(),
  tagline: 'Create beautiful GitHub contribution graphs',
};

/**
 * ASCII art logo
 */
export const LOGO = `
   ██████╗ ██╗████████╗    █████╗ ██████╗ ████████╗
  ██╔════╝ ██║╚══██╔══╝   ██╔══██╗██╔══██╗╚══██╔══╝
  ██║  ███╗██║   ██║█████╗███████║██████╔╝   ██║   
  ██║   ██║██║   ██║╚════╝██╔══██║██╔══██╗   ██║   
  ╚██████╔╝██║   ██║      ██║  ██║██║  ██║   ██║   
   ╚═════╝ ╚═╝   ╚═╝      ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   
`;

/**
 * Print the startup banner
 */
export function printBanner() {
  console.log('');
  console.log(chalk.cyan(LOGO));
  console.log(chalk.gray('  ' + '═'.repeat(52)));
  console.log(chalk.white(`  ${BRAND.tagline}`));
  console.log(chalk.gray(`  Version ${BRAND.version} | © ${BRAND.year} ${BRAND.author}`));
  console.log(chalk.gray('  ' + '═'.repeat(52)));
  console.log('');
}

/**
 * Print a simple header (less verbose)
 */
export function printHeader() {
  console.log('');
  console.log(chalk.cyan('╔════════════════════════════════════════════════════════════╗'));
  console.log(chalk.cyan('║') + chalk.bold.white(`  🎨 ${BRAND.name}`) + ' '.repeat(29) + chalk.cyan('║'));
  console.log(chalk.cyan('║') + chalk.gray(`     v${BRAND.version} by ${BRAND.author}`) + ' '.repeat(33) + chalk.cyan('║'));
  console.log(chalk.cyan('╚════════════════════════════════════════════════════════════╝'));
  console.log('');
}

/**
 * Print completion message with stats
 * 
 * @param {Object} stats - Execution statistics
 */
export function printCompletion(stats) {
  console.log('');
  console.log(chalk.green('╔════════════════════════════════════════════════════════════╗'));
  console.log(chalk.green('║') + chalk.bold.white('  ✅ GENERATION COMPLETE!                                    ') + chalk.green('║'));
  console.log(chalk.green('╚════════════════════════════════════════════════════════════╝'));
  console.log('');
  
  console.log(chalk.white('  📊 Statistics:'));
  console.log(chalk.gray('  ─'.repeat(28)));
  console.log(chalk.gray(`     Total Commits:   ${chalk.green(stats.totalCommits || 0)}`));
  console.log(chalk.gray(`     Total Days:      ${chalk.blue(stats.totalDays || 0)}`));
  console.log(chalk.gray(`     Active Days:     ${chalk.blue(stats.activeDays || 0)}`));
  console.log(chalk.gray(`     Skipped Days:    ${chalk.gray(stats.skippedDays || 0)}`));
  
  if (stats.errors > 0) {
    console.log(chalk.gray(`     Errors:          ${chalk.red(stats.errors)}`));
  }
  
  if (stats.duration) {
    console.log(chalk.gray(`     Duration:        ${chalk.cyan(stats.duration)}`));
  }
  
  console.log('');
  console.log(chalk.gray('  ─'.repeat(28)));
  console.log(chalk.gray(`  Generated with ${BRAND.name} v${BRAND.version}`));
  console.log(chalk.gray(`  ${BRAND.repository}`));
  console.log('');
  
  // Call to action
  console.log(chalk.cyan('  💙 Enjoying this tool?'));
  console.log(chalk.white(`     ⭐ Star the repo: ${BRAND.repository}`));
  console.log(chalk.white(`     📢 Share with friends!`));
  console.log('');
}

/**
 * Print error message with branding
 * 
 * @param {Error|string} error - Error object or message
 */
export function printError(error) {
  const message = error instanceof Error ? error.message : String(error);
  
  console.log('');
  console.log(chalk.red('╔════════════════════════════════════════════════════════════╗'));
  console.log(chalk.red('║') + chalk.bold.white('  ❌ ERROR                                                    ') + chalk.red('║'));
  console.log(chalk.red('╚════════════════════════════════════════════════════════════╝'));
  console.log('');
  console.log(chalk.red(`  ${message}`));
  console.log('');
  console.log(chalk.gray(`  Need help? Contact: ${BRAND.supportEmail}`));
  console.log(chalk.gray(`  Documentation: ${BRAND.repository}#readme`));
  console.log('');
}

/**
 * Print warning message
 * 
 * @param {string} message - Warning message
 */
export function printWarning(message) {
  console.log('');
  console.log(chalk.yellow('  ⚠️  WARNING'));
  console.log(chalk.yellow(`     ${message}`));
  console.log('');
}

/**
 * Generate a branded commit message
 * 
 * @param {string} date - Date string
 * @param {number} index - Commit index for the day
 * @param {number} total - Total commits for the day
 * @returns {string}
 */
export function generateCommitMessage(date, index, total) {
  const prefixes = [
    'Update',
    'Refactor',
    'Improve',
    'Add',
    'Enhance',
    'Optimize',
    'Fix',
    'Revise',
    'Modify',
    'Polish',
  ];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  
  return `${prefix} contribution [${date}] (${index}/${total}) | ${BRAND.name}`;
}

/**
 * Generate data file content with attribution
 * 
 * @param {Object} data - Commit data
 * @returns {Object}
 */
export function generateDataFileContent(data) {
  return {
    // User's commit data
    date: data.date,
    commitIndex: data.index,
    totalCommits: data.total,
    timestamp: Date.now(),
    id: data.id,
    
    // Attribution (non-intrusive)
    _generator: {
      name: BRAND.name,
      version: BRAND.version,
      author: BRAND.author,
      url: BRAND.repository,
    },
  };
}

/**
 * Print the goodbye message
 */
export function printGoodbye() {
  console.log('');
  console.log(chalk.gray('  ─'.repeat(28)));
  console.log(chalk.gray(`  Thank you for using ${BRAND.name}!`));
  console.log(chalk.gray(`  Created by ${BRAND.author}`));
  console.log(chalk.gray('  ─'.repeat(28)));
  console.log('');
}

/**
 * Print the support information
 */
export function printSupport() {
  console.log('');
  console.log(chalk.white('  📞 Support Options:'));
  console.log(chalk.gray('  ─'.repeat(28)));
  console.log(chalk.gray(`     Email:  ${BRAND.supportEmail}`));
  console.log(chalk.gray(`     GitHub: ${BRAND.repository}/issues`));
  console.log(chalk.gray(`     Docs:   ${BRAND.repository}#readme`));
  console.log('');
}

/**
 * Print upgrade prompt
 * 
 * @param {string} feature - Feature that requires upgrade
 */
export function printUpgradePrompt(feature) {
  console.log('');
  console.log(chalk.yellow('  ⬆️  UPGRADE REQUIRED'));
  console.log(chalk.gray('  ─'.repeat(28)));
  console.log(chalk.white(`     Feature "${feature}" requires a higher license tier.`));
  console.log('');
  console.log(chalk.white('     Upgrade at:'));
  console.log(chalk.cyan(`     ${BRAND.purchaseUrl}`));
  console.log('');
}

export default {
  BRAND,
  LOGO,
  printBanner,
  printHeader,
  printCompletion,
  printError,
  printWarning,
  generateCommitMessage,
  generateDataFileContent,
  printGoodbye,
  printSupport,
  printUpgradePrompt,
};