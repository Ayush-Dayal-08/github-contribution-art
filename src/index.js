#!/usr/bin/env node

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GitHub Contribution Art Generator
 * Copyright (c) 2024 Your Name
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * FREE Software - Requires FREE license key
 * All features enabled for all users!
 */

import 'dotenv/config';
import { Command } from 'commander';
import chalk from 'chalk';

import { loadConfig } from './config/schema.js';
import { CommitEngine } from './core/CommitEngine.js';
import { LicenseManager } from './licensing/LicenseManager.js';
import { log, setLogLevel } from './utils/logger.js';
import { EXIT_CODES } from './utils/constants.js';
import { listPatterns } from './patterns/templates.js';
import {
  printBanner,
  printError,
  BRAND,
} from './branding/watermark.js';
import { displayEngagementMessage } from './branding/github-check.js';

// ═══════════════════════════════════════════════════════════════════════════
// CLI SETUP
// ═══════════════════════════════════════════════════════════════════════════

const program = new Command();

program
  .name('contribution-art')
  .description(`${BRAND.name} - FREE by ${BRAND.author}`)
  .version(BRAND.version)
  .option('-s, --start <date>', 'Start date (YYYY-MM-DD)')
  .option('-e, --end <date>', 'End date (YYYY-MM-DD)')
  .option('-p, --pattern <name>', 'Pattern name')
  .option('--min <number>', 'Min commits per day', parseInt)
  .option('--max <number>', 'Max commits per day', parseInt)
  .option('--skip <probability>', 'Skip probability (0-1)', parseFloat)
  .option('-d, --dry-run', 'Preview without commits')
  .option('--preview', 'Show ASCII preview')
  .option('--no-push', 'Skip pushing')
  .option('--activate', 'Activate license key')
  .option('--verify', 'Verify license')
  .option('--list-patterns', 'List patterns')
  .option('-v, --verbose', 'Verbose output')
  .option('-q, --quiet', 'Minimal output');

program.parse();

const options = program.opts();

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  // Set log level
  if (options.verbose) setLogLevel('DEBUG');
  else if (options.quiet) setLogLevel('ERROR');

  // Handle activation
  if (options.activate) {
    const licenseManager = new LicenseManager();
    const success = await licenseManager.activateInteractive();
    process.exit(success ? EXIT_CODES.SUCCESS : EXIT_CODES.LICENSE_ERROR);
  }

  // Print banner
  printBanner();

  // Handle list patterns
  if (options.listPatterns) {
    console.log(chalk.bold('\n  📋 Available Patterns:\n'));
    listPatterns().forEach(name => {
      console.log(chalk.gray(`     • ${chalk.cyan(name)}`));
    });
    console.log('');
    console.log(chalk.gray('  Usage: --pattern <name>'));
    console.log('');
    displayEngagementMessage();
    process.exit(EXIT_CODES.SUCCESS);
  }

  // Initialize license manager
  const licenseManager = new LicenseManager();

  // Handle verify
  if (options.verify) {
    await licenseManager.verifyLicense();
    process.exit(EXIT_CODES.SUCCESS);
  }

  // Check license
  const isLicensed = await licenseManager.initialize();

  if (!isLicensed) {
    process.exit(EXIT_CODES.LICENSE_ERROR);
  }

  // Build config
  let config;
  try {
    config = loadConfig({
      startDate: options.start,
      endDate: options.end,
      pattern: options.pattern,
      minCommits: options.min,
      maxCommits: options.max,
      skipProbability: options.skip,
      dryRun: options.dryRun || false,
      pushOnComplete: options.push !== false,
      enablePatterns: !!options.pattern,
    });
  } catch (error) {
    printError(error);
    process.exit(EXIT_CODES.CONFIG_ERROR);
  }

  log.debug('Config loaded:', config);

  // Create engine
  const engine = new CommitEngine(config, licenseManager);

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log(chalk.yellow('\n\n  ⚠️  Shutting down...'));
    engine.abort();
  });

  try {
    // Preview mode
    if (options.preview) {
      engine.preview();
      displayEngagementMessage();
      process.exit(EXIT_CODES.SUCCESS);
    }

    // Initialize
    await engine.initialize();

    // Execute
    const stats = await engine.execute();

    // Show engagement message
    displayEngagementMessage();

    process.exit(stats.errors > 0 ? EXIT_CODES.GENERAL_ERROR : EXIT_CODES.SUCCESS);

  } catch (error) {
    printError(error);
    process.exit(EXIT_CODES.GENERAL_ERROR);
  }
}

// Run
main().catch((error) => {
  printError(error);
  process.exit(EXIT_CODES.GENERAL_ERROR);
});