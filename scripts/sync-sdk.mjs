#!/usr/bin/env node

/**
 * Sync script to pull canonical <copio-scanner> bundle from @copio/sdk (CPO-049)
 */

import { copyFile, stat, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const defaultSdkDir = path.resolve(rootDir, '../copio');
const sdkDir = process.env.COPIO_SDK_DIR || defaultSdkDir;
const vendorDir = path.join(rootDir, 'vendor/copio');
const targetScanner = path.join(vendorDir, 'scanner.js');

async function syncSdk() {
  console.log('🔄 Syncing canonical <copio-scanner> bundle from Copio SDK...\n');

  const installedScanner = path.join(rootDir, 'node_modules/@copio/sdk/dist/scanner.js');
  const fallbackScanner = path.join(sdkDir, 'dist/scanner.js');
  const sourceScanner = existsSync(installedScanner) ? installedScanner : fallbackScanner;

  if (!existsSync(sourceScanner)) {
    console.error(`❌ Source bundle not found at: ${sourceScanner}`);
    console.error('Please run "npm install" or build the copio SDK first.');
    process.exit(1);
  }

  await mkdir(vendorDir, { recursive: true });
  await copyFile(sourceScanner, targetScanner);

  const statResult = await stat(targetScanner);
  console.log(`✅ Updated vendor/copio/scanner.js (${(statResult.size / 1024).toFixed(2)} KB)`);
}

syncSdk().catch((err) => {
  console.error('❌ Sync failed:', err);
  process.exit(1);
});
