/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GitHub Contribution Art Generator
 * Copyright (c) 2024 Your Name
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Simple, colorful logging utility
 */

import chalk from 'chalk';

/**
 * Log levels
 */
export const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

/**
 * Current log level (can be changed at runtime)
 */
let currentLogLevel = LOG_LEVELS.INFO;

/**
 * Set the log level
 * 
 * @param {number|string} level - Log level
 */
export function setLogLevel(level) {
  if (typeof level === 'string') {
    currentLogLevel = LOG_LEVELS[level.toUpperCase()] ?? LOG_LEVELS.INFO;
  } else {
    currentLogLevel = level;
  }
}

/**
 * Get formatted timestamp
 * 
 * @returns {string}
 */
function getTimestamp() {
  const now = new Date();
  return now.toTimeString().slice(0, 8);
}

/**
 * Format a log message
 * 
 * @param {string} level - Log level name
 * @param {string} icon - Icon for the level
 * @param {Function} colorFn - Chalk color function
 * @param {string} message - Log message
 * @param {any[]} args - Additional arguments
 * @returns {string}
 */
function formatMessage(level, icon, colorFn, message, args) {
  const timestamp = chalk.gray(`[${getTimestamp()}]`);
  const levelStr = colorFn(`${icon} ${level.padEnd(5)}`);
  
  let formattedMessage = `${timestamp} ${levelStr} ${message}`;
  
  if (args.length > 0) {
    const argsStr = args
      .map(arg => {
        if (typeof arg === 'object') {
          return JSON.stringify(arg, null, 2);
        }
        return String(arg);
      })
      .join(' ');
    formattedMessage += ` ${chalk.gray(argsStr)}`;
  }
  
  return formattedMessage;
}

/**
 * Logger object with methods for each log level
 */
export const logger = {
  /**
   * Log an error message
   */
  error(message, ...args) {
    if (currentLogLevel >= LOG_LEVELS.ERROR) {
      console.error(formatMessage('ERROR', '❌', chalk.red, message, args));
    }
  },

  /**
   * Log a warning message
   */
  warn(message, ...args) {
    if (currentLogLevel >= LOG_LEVELS.WARN) {
      console.warn(formatMessage('WARN', '⚠️ ', chalk.yellow, message, args));
    }
  },

  /**
   * Log an info message
   */
  info(message, ...args) {
    if (currentLogLevel >= LOG_LEVELS.INFO) {
      console.log(formatMessage('INFO', 'ℹ️ ', chalk.blue, message, args));
    }
  },

  /**
   * Log a debug message
   */
  debug(message, ...args) {
    if (currentLogLevel >= LOG_LEVELS.DEBUG) {
      console.log(formatMessage('DEBUG', '🔍', chalk.gray, message, args));
    }
  },

  /**
   * Log a success message (always shown)
   */
  success(message, ...args) {
    console.log(formatMessage('OK', '✅', chalk.green, message, args));
  },

  /**
   * Log a plain message without formatting (always shown)
   */
  plain(message) {
    console.log(message);
  },

  /**
   * Log an empty line
   */
  newline() {
    console.log('');
  },

  /**
   * Log a horizontal divider
   */
  divider(char = '─', length = 50) {
    console.log(chalk.gray(char.repeat(length)));
  },

  /**
   * Log a section header
   */
  section(title) {
    console.log('');
    console.log(chalk.bold.white(`  ${title}`));
    console.log(chalk.gray('  ' + '─'.repeat(title.length + 2)));
  },

  /**
   * Create a boxed message
   */
  box(message, color = 'cyan') {
    const colorFn = chalk[color] || chalk.cyan;
    const lines = message.split('\n');
    const maxLength = Math.max(...lines.map(l => l.length));
    const width = maxLength + 4;

    console.log('');
    console.log(colorFn('  ╔' + '═'.repeat(width) + '╗'));
    
    for (const line of lines) {
      const padding = ' '.repeat(maxLength - line.length);
      console.log(colorFn('  ║') + `  ${line}${padding}  ` + colorFn('║'));
    }
    
    console.log(colorFn('  ╚' + '═'.repeat(width) + '╝'));
    console.log('');
  },
};

/**
 * Shorthand exports
 */
export const log = logger;

export default logger;