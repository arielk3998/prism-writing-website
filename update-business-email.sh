#!/bin/bash

# Update business email address throughout the website
# From: Ariel.karagodskiy@gmail.com
# To: ariel.pk@outlook.com

echo "🔄 Updating business email address throughout the website..."

# Update TypeScript/JavaScript files
find src -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" | \
    xargs sed -i 's/Ariel\.karagodskiy@gmail\.com/ariel.pk@outlook.com/g'

# Update HTML sample files
find public/samples -name "*.html" | \
    xargs sed -i 's/Ariel\.karagodskiy@gmail\.com/ariel.pk@outlook.com/g'

# Update any other files that might contain the email
find . -name "*.md" -o -name "*.json" -o -name "*.yaml" -o -name "*.yml" | \
    grep -v node_modules | grep -v ".git" | \
    xargs sed -i 's/Ariel\.karagodskiy@gmail\.com/ariel.pk@outlook.com/g' 2>/dev/null || true

# Update auth-test.js specifically
if [ -f "auth-test.js" ]; then
    sed -i 's/Ariel\.karagodskiy@gmail\.com/ariel.pk@outlook.com/g' auth-test.js
fi

echo "✅ Business email updated to ariel.pk@outlook.com"
echo ""
echo "🔍 Verification - checking for any remaining old email addresses:"
grep -r "Ariel\.karagodskiy@gmail\.com" src/ public/ *.js 2>/dev/null || echo "✅ No old email addresses found"
