#!/usr/bin/env node

/**
 * Contrast Verification Script
 * Verifies that all text has appropriate contrast and accessibility
 */

const fs = require('fs');
const glob = require('glob');

const POTENTIAL_ISSUES = [
  // Check for remaining hardcoded colors that might cause issues
  'text-blue-[0-9]',
  'text-gray-[0-9](?!00)', // Exclude text-gray-900 which is safe
  'bg-blue-[0-9].*text-blue', // Blue on blue
  'bg-gray-[0-9].*text-gray-[0-9]', // Gray on gray without proper contrast
  'opacity-[0-9]0.*text-', // Very low opacity text
];

const GOOD_PATTERNS = [
  'text-safe',
  'text-safe-muted',
  'text-safe-accent',
  'text-safe-success',
  'text-safe-warning',
  'text-safe-error',
  'text-white',
  'text-foreground',
  'text-muted',
  'text-muted-foreground',
  'highlight-',
  'drop-shadow',
];

function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const issues = [];
    const goodPatterns = [];
    
    lines.forEach((line, index) => {
      // Check for potential issues
      POTENTIAL_ISSUES.forEach(pattern => {
        const regex = new RegExp(pattern, 'g');
        if (regex.test(line)) {
          issues.push({
            line: index + 1,
            content: line.trim(),
            issue: pattern
          });
        }
      });
      
      // Count good patterns
      GOOD_PATTERNS.forEach(pattern => {
        const regex = new RegExp(pattern, 'g');
        const matches = line.match(regex);
        if (matches) {
          goodPatterns.push(...matches);
        }
      });
    });
    
    return { issues, goodPatterns: goodPatterns.length };
  } catch (error) {
    return { issues: [], goodPatterns: 0, error: error.message };
  }
}

function main() {
  console.log('🔍 Starting contrast verification...\n');
  
  const files = glob.sync('**/*.{tsx,ts,jsx,js}', { 
    ignore: ['node_modules/**', '.next/**', 'build/**', '*.config.js', 'fix-colors-global.js', 'cleanup-colors.js'] 
  });
  
  let totalIssues = 0;
  let totalGoodPatterns = 0;
  let filesWithIssues = 0;
  let filesWithGoodPatterns = 0;
  
  files.forEach(file => {
    const analysis = analyzeFile(file);
    
    if (analysis.issues.length > 0) {
      filesWithIssues++;
      totalIssues += analysis.issues.length;
      console.log(`⚠️  ${file}:`);
      analysis.issues.forEach(issue => {
        console.log(`   Line ${issue.line}: ${issue.content}`);
      });
      console.log('');
    }
    
    if (analysis.goodPatterns > 0) {
      filesWithGoodPatterns++;
      totalGoodPatterns += analysis.goodPatterns;
    }
  });
  
  console.log(`\n📊 Contrast Analysis Summary:`);
  console.log(`✅ Files with accessible patterns: ${filesWithGoodPatterns}`);
  console.log(`✅ Total accessible text usages: ${totalGoodPatterns}`);
  console.log(`⚠️  Files with potential issues: ${filesWithIssues}`);
  console.log(`⚠️  Total potential issues: ${totalIssues}`);
  
  if (totalIssues === 0) {
    console.log(`\n🎉 EXCELLENT! No contrast issues detected.`);
    console.log(`🎯 All text appears to use accessible color patterns.`);
  } else {
    console.log(`\n💡 Consider reviewing the flagged items above for contrast accessibility.`);
  }
}

if (require.main === module) {
  main();
}

module.exports = { analyzeFile };
