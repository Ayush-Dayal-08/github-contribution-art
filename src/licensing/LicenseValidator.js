/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GitHub Contribution Art Generator
 * Copyright (c) 2024 Your Name
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * License Validator
 * 
 * Validates FREE license keys using cryptographic signatures.
 * All valid keys get FULL ACCESS to all features.
 */

import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { PUBLIC_KEY } from './publicKey.js';
import { AUTHOR, PROJECT } from '../branding/author.js';

/**
 * Validation Result
 */
export class ValidationResult {
  constructor(valid, data = {}) {
    this.valid = valid;
    this.type = data.type || null;
    this.typeName = data.typeName || null;
    this.email = data.email || null;
    this.username = data.username || null;
    this.features = data.features || [];
    this.licenseId = data.licenseId || null;
    this.message = data.message || '';
  }

  static success(data) {
    return new ValidationResult(true, data);
  }

  static failure(message) {
    return new ValidationResult(false, { message });
  }
}

/**
 * License Validator Class
 */
export class LicenseValidator {
  #licenseFilePath;
  #cachedResult = null;

  constructor() {
    this.#licenseFilePath = path.join(process.cwd(), '.license');
  }

  /**
   * Get stored license
   */
  async getStoredLicense() {
    try {
      const content = await fs.readFile(this.#licenseFilePath, 'utf8');
      return JSON.parse(content);
    } catch {
      return null;
    }
  }

  /**
   * Store license key
   */
  async storeLicense(key) {
    const data = {
      key: key.trim(),
      activatedAt: new Date().toISOString(),
    };

    await fs.writeFile(
      this.#licenseFilePath,
      JSON.stringify(data, null, 2),
      'utf8'
    );

    this.#cachedResult = null;
    return data;
  }

  /**
   * Remove license
   */
  async removeLicense() {
    try {
      await fs.unlink(this.#licenseFilePath);
      this.#cachedResult = null;
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Validate a license key
   */
  async validate(inputKey = null) {
    // Return cached result if available
    if (this.#cachedResult) {
      return this.#cachedResult;
    }

    // Get key from input or storage
    let key = inputKey;

    if (!key) {
      const stored = await this.getStoredLicense();
      
      if (!stored || !stored.key) {
        return ValidationResult.failure(
          'No license key found. Please get a FREE key and activate it.'
        );
      }
      
      key = stored.key;
    }

    key = key.trim();

    // Parse key (format: DATA.SIGNATURE)
    const parts = key.split('.');
    
    if (parts.length !== 2) {
      return ValidationResult.failure(
        'Invalid license key format. Please check your key.'
      );
    }

    const [dataBase64, signatureBase64] = parts;

    // Decode data
    let licenseData;
    
    try {
      const dataString = Buffer.from(dataBase64, 'base64url').toString('utf8');
      licenseData = JSON.parse(dataString);
    } catch {
      return ValidationResult.failure(
        'Could not decode license. Key may be corrupted.'
      );
    }

    // Verify signature
    try {
      const dataBuffer = Buffer.from(JSON.stringify(licenseData));
      const signatureBuffer = Buffer.from(signatureBase64, 'base64url');

      const isValid = crypto.verify(
        null,
        dataBuffer,
        PUBLIC_KEY,
        signatureBuffer
      );

      if (!isValid) {
        return ValidationResult.failure(
          `Invalid license signature. This key was not issued by ${AUTHOR.name}.`
        );
      }
    } catch (error) {
      return ValidationResult.failure(
        'Signature verification failed. Key may be invalid.'
      );
    }

    // Check expiration (though FREE keys last ~100 years)
    const now = Date.now();
    
    if (licenseData.expiresAt && licenseData.expiresAt < now) {
      return ValidationResult.failure(
        'License has expired. Please request a new FREE key.'
      );
    }

    // Success! All features enabled
    const result = ValidationResult.success({
      type: licenseData.type,
      typeName: licenseData.typeName || 'Free License',
      email: licenseData.email,
      username: licenseData.username,
      features: ['all', 'basic', 'patterns', 'custom-text', 'batch'],
      licenseId: licenseData.id,
      message: 'License valid - All features enabled!',
    });

    this.#cachedResult = result;
    return result;
  }

  /**
   * Activate a license key
   */
  async activate(key) {
    const validation = await this.validate(key);

    if (!validation.valid) {
      return validation;
    }

    await this.storeLicense(key);

    return ValidationResult.success({
      ...validation,
      message: 'License activated successfully! All features enabled.',
    });
  }

  /**
   * Check if feature is available (always true for valid license)
   */
  hasFeature(feature) {
    if (!this.#cachedResult || !this.#cachedResult.valid) {
      return false;
    }
    // All features enabled for FREE users
    return true;
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.#cachedResult = null;
  }
}

export default LicenseValidator;