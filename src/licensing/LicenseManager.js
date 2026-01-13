/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GitHub Contribution Art Generator
 * Copyright (c) 2024 Your Name
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * License Manager
 * 
 * Handles license UI and user interaction.
 * All licenses are FREE with full access!
 */

import chalk from 'chalk';
import readline from 'readline';
import { LicenseValidator } from './LicenseValidator.js';
import { AUTHOR, PROJECT, getRepoUrl, getAuthorUrl } from '../branding/author.js';
import { checkGitHubEngagement, displayEngagementMessage } from '../branding/github-check.js';

/**
 * License Manager Class
 */
export class LicenseManager {
  #validator;
  #currentLicense = null;

  constructor() {
    this.#validator = new LicenseValidator();
  }

  /**
   * Initialize and check license
   */
  async initialize() {
    this.#printHeader();

    // Check GitHub engagement (optional, non-blocking)
    const githubToken = process.env.GITHUB_TOKEN;
    
    if (githubToken) {
      try {
        const engagement = await checkGitHubEngagement(githubToken);
        
        if (engagement.starred && engagement.following) {
          console.log(chalk.green('  💚 Thanks for starring and following!\n'));
        } else if (!engagement.noToken && !engagement.error) {
          displayEngagementMessage(engagement);
        }
      } catch {
        // Ignore errors - this is optional
      }
    }

    // Validate license
    const validation = await this.#validator.validate();

    if (!validation.valid) {
      this.#printNoLicense(validation.message);
      return false;
    }

    this.#currentLicense = validation;
    this.#printLicenseValid(validation);
    
    return true;
  }

  /**
   * Interactive license activation
   */
  async activateInteractive() {
    this.#printHeader();

    console.log(chalk.bold('\n  🔑 License Activation\n'));
    console.log(chalk.gray('  ─'.repeat(28)));
    console.log('');
    console.log(chalk.white('  This software requires a FREE license key.'));
    console.log('');
    console.log(chalk.cyan('  📧 How to get a FREE key:'));
    console.log(chalk.gray(`     1. Star the repo: ${getRepoUrl()}`));
    console.log(chalk.gray(`     2. Follow: ${getAuthorUrl()}`));
    console.log(chalk.gray(`     3. Email ${AUTHOR.email} with your GitHub username`));
    console.log(chalk.gray('     4. Receive your FREE key!'));
    console.log('');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const ask = (q) => new Promise(r => rl.question(q, r));

    try {
      console.log(chalk.gray('  Paste your license key (it\'s a long string):'));
      console.log('');
      const key = await ask(chalk.cyan('  License Key: '));

      if (!key || key.trim().length < 20) {
        console.log('');
        console.log(chalk.red('  ❌ Invalid key - too short'));
        console.log('');
        return false;
      }

      console.log('');
      console.log(chalk.gray('  ⏳ Validating...'));

      const result = await this.#validator.activate(key.trim());

      console.log('');

      if (result.valid) {
        console.log(chalk.green('  ╔══════════════════════════════════════════════════╗'));
        console.log(chalk.green('  ║') + chalk.bold.white('  ✅ LICENSE ACTIVATED!                           ') + chalk.green('║'));
        console.log(chalk.green('  ╚══════════════════════════════════════════════════╝'));
        console.log('');
        console.log(chalk.gray(`     User:     ${result.username} (${result.email})`));
        console.log(chalk.gray(`     Type:     ${result.typeName}`));
        console.log(chalk.gray(`     Features: ALL FEATURES ENABLED (FREE)`));
        console.log('');
        console.log(chalk.white('  You can now use the software:'));
        console.log(chalk.cyan('     npm start'));
        console.log('');
        
        this.#currentLicense = result;
        return true;
        
      } else {
        console.log(chalk.red('  ╔══════════════════════════════════════════════════╗'));
        console.log(chalk.red('  ║') + chalk.bold.white('  ❌ ACTIVATION FAILED                            ') + chalk.red('║'));
        console.log(chalk.red('  ╚══════════════════════════════════════════════════╝'));
        console.log('');
        console.log(chalk.yellow(`  Reason: ${result.message}`));
        console.log('');
        console.log(chalk.gray(`  Need help? Email: ${AUTHOR.email}`));
        console.log('');
        
        return false;
      }

    } finally {
      rl.close();
    }
  }

  /**
   * Verify license status
   */
  async verifyLicense() {
    this.#printHeader();

    const validation = await this.#validator.validate();

    console.log('');

    if (validation.valid) {
      console.log(chalk.green('  ✅ License Status: VALID'));
      console.log('');
      console.log(chalk.gray(`     User:       ${validation.username}`));
      console.log(chalk.gray(`     Email:      ${validation.email}`));
      console.log(chalk.gray(`     Type:       ${validation.typeName}`));
      console.log(chalk.gray(`     License ID: ${validation.licenseId}`));
      console.log(chalk.gray(`     Features:   ALL ENABLED (FREE)`));
    } else {
      console.log(chalk.red('  ❌ License Status: NOT ACTIVATED'));
      console.log('');
      console.log(chalk.yellow(`     ${validation.message}`));
    }

    console.log('');
    return validation;
  }

  /**
   * Check feature availability (always true for valid license)
   */
  hasFeature(feature) {
    if (!this.#currentLicense || !this.#currentLicense.valid) {
      return false;
    }
    return true; // All features FREE
  }

  /**
   * Get current license
   */
  getLicenseInfo() {
    return this.#currentLicense;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PRIVATE UI METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  #printHeader() {
    console.log('');
    console.log(chalk.cyan('  ╔═══════════════════════════════════════════════════════════════╗'));
    console.log(chalk.cyan('  ║') + chalk.bold.white(`  🎨 ${PROJECT.name}`) + ' '.repeat(23) + chalk.cyan('║'));
    console.log(chalk.cyan('  ║') + chalk.gray(`     v${PROJECT.version} | FREE | By ${AUTHOR.name}`) + ' '.repeat(28) + chalk.cyan('║'));
    console.log(chalk.cyan('  ╚═══════════════════════════════════════════════════════════════╝'));
    console.log('');
  }

  #printNoLicense(message) {
    console.log(chalk.red('  ┌──────────────────────────────────────────────────────────────┐'));
    console.log(chalk.red('  │') + chalk.bold.white('  🔑 FREE LICENSE KEY REQUIRED                                 ') + chalk.red('│'));
    console.log(chalk.red('  └──────────────────────────────────────────────────────────────┘'));
    console.log('');
    console.log(chalk.yellow(`  ${message}`));
    console.log('');
    console.log(chalk.white('  This software is FREE but requires a license key.'));
    console.log('');
    console.log(chalk.cyan('  📧 How to get your FREE key:'));
    console.log('');
    console.log(chalk.gray(`     1. ⭐ Star the repo:`));
    console.log(chalk.white(`        ${getRepoUrl()}`));
    console.log('');
    console.log(chalk.gray(`     2. 👤 Follow the author:`));
    console.log(chalk.white(`        ${getAuthorUrl()}`));
    console.log('');
    console.log(chalk.gray(`     3. 📧 Send email to: ${AUTHOR.email}`));
    console.log(chalk.gray('        Include your GitHub username'));
    console.log('');
    console.log(chalk.gray('     4. Receive your FREE key within 24 hours!'));
    console.log('');
    console.log(chalk.white('  Already have a key? Activate it:'));
    console.log(chalk.cyan('     npm run activate'));
    console.log('');
  }

  #printLicenseValid(license) {
    console.log(chalk.green('  ┌──────────────────────────────────────────────────────────────┐'));
    console.log(chalk.green('  │') + chalk.bold.white('  ✅ LICENSE VALID - All Features Enabled!                     ') + chalk.green('│'));
    console.log(chalk.green('  └──────────────────────────────────────────────────────────────┘'));
    console.log('');
    console.log(chalk.gray(`     Welcome, ${license.username}!`));
    console.log(chalk.gray(`     License: ${license.typeName}`));
    console.log('');
  }
}

export default LicenseManager;