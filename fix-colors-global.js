#!/usr/bin/env node

/**
 * Global Color Class Replacement Script
 * Systematically replaces hardcoded Tailwind color classes with safe, accessible alternatives
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const REPLACEMENTS = {
  // Text color replacements
  'text-gray-900 dark:text-white': 'text-safe',
  'text-gray-900 dark:text-gray-100': 'text-safe',
  'text-gray-900': 'text-safe',
  'text-gray-800': 'text-safe',
  'text-gray-700': 'text-safe',
  'text-gray-600 dark:text-gray-300': 'text-safe-muted',
  'text-gray-600 dark:text-gray-400': 'text-safe-muted',
  'text-gray-600': 'text-safe-muted',
  'text-gray-500': 'text-safe-muted',
  'text-gray-500 dark:text-gray-400': 'text-safe-muted',
  
  // Blue text replacements
  'text-blue-600 dark:text-blue-400': 'text-safe-accent',
  'text-blue-600': 'text-safe-accent',
  'text-blue-700': 'text-safe-accent',
  'text-blue-800': 'text-safe-accent',
  'text-blue-900': 'text-safe-accent',
  'text-blue-500': 'text-safe-accent',
  
  // Green text replacements
  'text-green-600 dark:text-green-400': 'text-safe-success',
  'text-green-600': 'text-safe-success',
  'text-green-700': 'text-safe-success',
  'text-green-800': 'text-safe-success',
  
  // Yellow text replacements
  'text-yellow-600': 'text-safe-warning',
  'text-yellow-700': 'text-safe-warning',
  'text-yellow-800': 'text-safe-warning',
  
  // Red text replacements
  'text-red-600 dark:text-red-400': 'text-safe-error',
  'text-red-600': 'text-safe-error',
  'text-red-700': 'text-safe-error',
  'text-red-800': 'text-safe-error',
  
  // Purple text replacements
  'text-purple-600': 'text-safe-accent',
  'text-purple-700': 'text-safe-accent',
  
  // Orange text replacements
  'text-orange-600': 'text-safe-warning',
  'text-orange-700': 'text-safe-warning',
  
  // Indigo text replacements
  'text-indigo-600 dark:text-indigo-400': 'text-safe-accent',
  'text-indigo-600': 'text-safe-accent',
  
  // Background color classes for highlights
  'text-green-600 bg-green-100': 'highlight-green',
  'text-yellow-600 bg-yellow-100': 'highlight-yellow',
  'text-orange-600 bg-orange-100': 'highlight-orange',
  'text-red-600 bg-red-100': 'highlight-red',
  'text-blue-600 bg-blue-100': 'highlight-blue',
  'text-purple-600 bg-purple-100': 'highlight-purple',
  
  // Icon color replacements
  'w-5 h-5 text-blue-600 dark:text-blue-400': 'w-5 h-5 icon-safe-accent',
  'w-4 h-4 text-blue-600 dark:text-blue-400': 'w-4 h-4 icon-safe-accent',
  'w-6 h-6 text-blue-600 dark:text-blue-400': 'w-6 h-6 icon-safe-accent',
  'w-8 h-8 text-blue-600 dark:text-blue-400': 'w-8 h-8 icon-safe-accent',
};

// File patterns to process
const FILE_PATTERNS = [
  'app/**/*.{tsx,ts,js,jsx}',
  'components/**/*.{tsx,ts,js,jsx}',
  'src/**/*.{tsx,ts,js,jsx}',
  'pages/**/*.{tsx,ts,js,jsx}',
  'lib/**/*.{tsx,ts,js,jsx}'
];

function replaceInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Perform all replacements
    for (const [from, to] of Object.entries(REPLACEMENTS)) {
      const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      if (regex.test(content)) {
        content = content.replace(regex, to);
        changed = true;
      }
    }
    
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🚀 Starting global color class replacement...\n');
  
  let totalFiles = 0;
  let updatedFiles = 0;
  
  // Process all file patterns
  for (const pattern of FILE_PATTERNS) {
    const files = glob.sync(pattern, { ignore: ['node_modules/**', '.next/**', 'build/**'] });
    
    for (const file of files) {
      totalFiles++;
      if (replaceInFile(file)) {
        updatedFiles++;
      }
    }
  }
  
  console.log(`\n✨ Replacement complete!`);
  console.log(`📊 Processed ${totalFiles} files`);
  console.log(`🔄 Updated ${updatedFiles} files`);
  console.log(`\n💡 Don't forget to test your application and check for any remaining manual adjustments needed.`);
}

if (require.main === module) {
  main();
}

module.exports = { replaceInFile, REPLACEMENTS };
