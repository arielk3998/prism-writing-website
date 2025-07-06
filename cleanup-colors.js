#!/usr/bin/env node

/**
 * Enhanced Color Class Cleanup Script
 * Phase 2: Clean up remaining mixed patterns and edge cases
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const CLEANUP_REPLACEMENTS = {
  // Clean up mixed patterns - remove redundant dark: classes when using safe classes
  'text-safe dark:text-gray-300': 'text-safe',
  'text-safe dark:text-gray-400': 'text-safe',
  'text-safe dark:text-gray-100': 'text-safe',
  'text-safe-muted dark:text-gray-400': 'text-safe-muted',
  'text-safe-muted dark:text-gray-300': 'text-safe-muted',
  'text-safe-accent dark:text-blue-400': 'text-safe-accent',
  'text-safe-accent dark:text-blue-300': 'text-safe-accent',
  'text-safe-success dark:text-green-400': 'text-safe-success',
  'text-safe-success dark:text-green-300': 'text-safe-success',
  
  // Additional icon patterns
  'w-5 h-5 mr-2 text-blue-600': 'w-5 h-5 mr-2 icon-safe-accent',
  'w-4 h-4 mr-2 text-blue-600': 'w-4 h-4 mr-2 icon-safe-accent',
  'w-6 h-6 mr-2 text-blue-600': 'w-6 h-6 mr-2 icon-safe-accent',
  
  // Button text colors
  'text-white hover:bg-blue-700': 'text-white hover:bg-blue-700',
  'bg-blue-600 text-white hover:bg-blue-700': 'bg-blue-600 text-white hover:bg-blue-700',
  
  // Additional single text colors that might have been missed
  'text-gray-400': 'text-safe-muted',
  'text-gray-300': 'text-safe-muted',
  'text-blue-500': 'text-safe-accent',
  'text-green-500': 'text-safe-success',
  'text-red-500': 'text-safe-error',
  'text-yellow-500': 'text-safe-warning',
  'text-purple-500': 'text-safe-accent',
  'text-indigo-500': 'text-safe-accent',
  'text-orange-500': 'text-safe-warning',
  
  // Hover states that should use safe colors
  'hover:text-gray-700': 'hover:text-safe',
  'hover:text-gray-900': 'hover:text-safe',
  'hover:text-blue-600': 'hover:text-safe-accent',
  'hover:text-blue-700': 'hover:text-safe-accent',
};

// File patterns to process
const FILE_PATTERNS = [
  'app/**/*.{tsx,ts,js,jsx}',
  'components/**/*.{tsx,ts,js,jsx}',
  'src/**/*.{tsx,ts,js,jsx}',
  'pages/**/*.{tsx,ts,js,jsx}',
  'lib/**/*.{tsx,ts,js,jsx}'
];

function cleanupFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Perform all cleanup replacements
    for (const [from, to] of Object.entries(CLEANUP_REPLACEMENTS)) {
      const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      if (regex.test(content)) {
        content = content.replace(regex, to);
        changed = true;
      }
    }
    
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Cleaned up: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🧹 Starting color class cleanup phase 2...\n');
  
  let totalFiles = 0;
  let updatedFiles = 0;
  
  // Process all file patterns
  for (const pattern of FILE_PATTERNS) {
    const files = glob.sync(pattern, { ignore: ['node_modules/**', '.next/**', 'build/**'] });
    
    for (const file of files) {
      totalFiles++;
      if (cleanupFile(file)) {
        updatedFiles++;
      }
    }
  }
  
  console.log(`\n✨ Cleanup phase 2 complete!`);
  console.log(`📊 Processed ${totalFiles} files`);
  console.log(`🔄 Updated ${updatedFiles} files`);
}

if (require.main === module) {
  main();
}

module.exports = { cleanupFile, CLEANUP_REPLACEMENTS };
