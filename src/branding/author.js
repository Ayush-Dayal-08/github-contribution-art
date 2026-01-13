/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GitHub Contribution Art Generator
 * Author Configuration
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * ⚠️ CUSTOMIZE THIS FILE WITH YOUR INFORMATION!
 * 
 * Replace all placeholder values below with your actual details.
 */

/**
 * Author Information
 * 
 * CHANGE THESE VALUES:
 */
export const AUTHOR = {
  // Your display name (shown in app)
  name: 'AYUSH DAYAL',
  
  // Your GitHub username (used for star/follow check)
  github: 'Ayush-Dayal-08',
  
  // Your repository name
  repo: 'github-contribution-art',
  
  // Your email (users will contact you for FREE license keys)
  email: 'ayushdayal08@gmail.com',
  
  // Your website (optional - leave empty string if none)
  website: '://ayush-portfolio-08.netlify.app/',
  
  // Donation link (optional - leave empty string if none)
  donate: 'https://buymeacoffee.com/ayush.dayal',
};

/**
 * Project Information
 * 
 * You can customize the project name if you want
 */
export const PROJECT = {
  name: 'GitHub Contribution Art Generator',
  version: '2.0.0',
  description: 'Create beautiful GitHub contribution graphs',
};

/**
 * Helper Functions (DO NOT MODIFY)
 */
export function getRepoUrl() {
  return `https://github.com/${AUTHOR.github}/${AUTHOR.repo}`;
}

export function getAuthorUrl() {
  return `https://github.com/${AUTHOR.github}`;
}

export default { AUTHOR, PROJECT, getRepoUrl, getAuthorUrl };