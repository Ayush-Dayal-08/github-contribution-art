/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GitHub Contribution Art Generator
 * Copyright (c) 2024 Your Name
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Author Configuration
 * 
 * ⚠️ CUSTOMIZE THIS WITH YOUR INFORMATION!
 */

/**
 * Your information - CHANGE THESE!
 */
export const AUTHOR = {
  // Your display name
  name: 'Your Name',
  
  // Your GitHub username (used for star/follow check)
  github: 'yourusername',
  
  // Your repository name
  repo: 'github-contribution-art',
  
  // Your email (for license key requests)
  email: 'your.email@example.com',
  
  // Your website (optional)
  website: 'https://yourwebsite.com',
  
  // Donation link (optional)
  donate: 'https://buymeacoffee.com/yourusername',
};

/**
 * Project information
 */
export const PROJECT = {
  name: 'GitHub Contribution Art Generator',
  version: '2.0.0',
  description: 'Create beautiful GitHub contribution graphs',
  license: 'Requires FREE license key',
};

/**
 * Get full repository URL
 */
export function getRepoUrl() {
  return `https://github.com/${AUTHOR.github}/${AUTHOR.repo}`;
}

/**
 * Get author GitHub URL
 */
export function getAuthorUrl() {
  return `https://github.com/${AUTHOR.github}`;
}

export default { AUTHOR, PROJECT, getRepoUrl, getAuthorUrl };