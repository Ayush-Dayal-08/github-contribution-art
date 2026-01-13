#!/usr/bin/env node

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🔐 FREE LICENSE KEY GENERATOR
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Generate FREE license keys for users.
 * 
 * ⚠️  KEEP THIS FILE PRIVATE! Never distribute!
 * 
 * Usage: node generate-license.js
 */

import crypto from 'crypto';
import fs from 'fs';
import readline from 'readline';

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const PRODUCT = {
  name: 'GitHub Contribution Art',
  version: '2.0',
  author: 'Your Name',
};

// All licenses are FREE - this is just for categorization
const LICENSE_TYPES = {
  '1': {
    code: 'FREE',
    name: 'Free License',
    days: 36500, // ~100 years (essentially forever)
    description: 'Full access to all features',
  },
  '2': {
    code: 'BETA',
    name: 'Beta Tester',
    days: 36500,
    description: 'For beta testers and early supporters',
  },
  '3': {
    code: 'CONTRIB',
    name: 'Contributor',
    days: 36500,
    description: 'For contributors to the project',
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// LOAD PRIVATE KEY
// ═══════════════════════════════════════════════════════════════════════════

let PRIVATE_KEY;

try {
  PRIVATE_KEY = fs.readFileSync('./private.key', 'utf8');
} catch (error) {
  console.error('');
  console.error('❌ ERROR: private.key not found!');
  console.error('');
  console.error('   Run setup first: node setup-keys.js');
  console.error('');
  process.exit(1);
}

// ═══════════════════════════════════════════════════════════════════════════
// LICENSE GENERATION
// ═══════════════════════════════════════════════════════════════════════════

function generateLicense(email, username, typeKey) {
  const type = LICENSE_TYPES[typeKey];
  const now = Date.now();
  
  // License data
  const licenseData = {
    // Product
    product: PRODUCT.name,
    version: PRODUCT.version,
    
    // License type
    type: type.code,
    typeName: type.name,
    
    // User info
    email: email.toLowerCase().trim(),
    username: username.trim(),
    
    // All features enabled (FREE)
    features: ['all', 'basic', 'patterns', 'custom-text', 'batch'],
    
    // Timestamps
    issuedAt: now,
    expiresAt: now + (type.days * 24 * 60 * 60 * 1000),
    
    // Unique ID
    id: crypto.randomBytes(8).toString('hex'),
  };

  // Convert to JSON
  const dataString = JSON.stringify(licenseData);
  
  // Encode as base64url
  const dataBase64 = Buffer.from(dataString).toString('base64url');

  // Sign with private key
  const signature = crypto.sign(null, Buffer.from(dataString), PRIVATE_KEY);
  const signatureBase64 = signature.toString('base64url');

  // Final key: DATA.SIGNATURE
  const licenseKey = `${dataBase64}.${signatureBase64}`;

  return {
    key: licenseKey,
    data: licenseData,
    type: type,
  };
}

function logUser(license, email, username) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    email,
    username,
    type: license.type.name,
    licenseId: license.data.id,
  };

  fs.appendFileSync(
    'users-log.txt',
    JSON.stringify(logEntry) + '\n',
    'utf8'
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// INTERACTIVE CLI
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  console.log('');
  console.log('═'.repeat(60));
  console.log(`  🔐 ${PRODUCT.name} - FREE License Generator`);
  console.log('═'.repeat(60));
  console.log('');
  console.log('  Generate FREE license keys for users.');
  console.log('  All keys provide FULL ACCESS to all features.');
  console.log('');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (q) => new Promise(r => rl.question(q, r));

  try {
    // Get user info
    console.log('─'.repeat(60));
    console.log('  📧 User Information');
    console.log('─'.repeat(60));
    console.log('');
    
    const email = await ask('  Email: ');
    if (!email || !email.includes('@')) {
      console.log('\n  ❌ Invalid email\n');
      return;
    }

    const username = await ask('  GitHub Username: ');
    if (!username) {
      console.log('\n  ❌ Username required\n');
      return;
    }

    // License type (all FREE, just for categorization)
    console.log('');
    console.log('─'.repeat(60));
    console.log('  📋 License Type (all are FREE with full access)');
    console.log('─'.repeat(60));
    console.log('');
    
    for (const [key, type] of Object.entries(LICENSE_TYPES)) {
      console.log(`  ${key}) ${type.name}`);
      console.log(`     ${type.description}`);
    }
    
    console.log('');
    const typeChoice = await ask('  Select type (1-3): ');

    if (!LICENSE_TYPES[typeChoice]) {
      console.log('\n  ❌ Invalid selection\n');
      return;
    }

    // Generate
    console.log('');
    console.log('  🔄 Generating license...');
    
    const license = generateLicense(email, username, typeChoice);
    
    // Log
    logUser(license, email, username);

    // Display
    console.log('');
    console.log('═'.repeat(60));
    console.log('  ✅ FREE LICENSE GENERATED!');
    console.log('═'.repeat(60));
    console.log('');
    console.log(`  User:     ${username} (${email})`);
    console.log(`  Type:     ${license.type.name}`);
    console.log(`  ID:       ${license.data.id}`);
    console.log(`  Features: ALL FEATURES ENABLED (FREE)`);
    console.log('');
    console.log('  🔑 License Key (send to user):');
    console.log('');
    console.log('  ┌' + '─'.repeat(56) + '┐');
    
    // Print key in chunks
    const key = license.key;
    const chunkSize = 54;
    for (let i = 0; i < key.length; i += chunkSize) {
      const chunk = key.slice(i, i + chunkSize);
      console.log('  │ ' + chunk.padEnd(54) + ' │');
    }
    
    console.log('  └' + '─'.repeat(56) + '┘');
    console.log('');
    console.log('  📝 User logged to: users-log.txt');
    console.log('');
    console.log('─'.repeat(60));
    console.log('');
    console.log('  📧 Send this key to the user with instructions:');
    console.log('');
    console.log('     1. Run: npm run activate');
    console.log('     2. Paste the license key');
    console.log('     3. Enjoy!');
    console.log('');

  } finally {
    rl.close();
  }
}

main().catch(console.error);