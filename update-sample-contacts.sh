#!/bin/bash

# Script to update all sample documents with real contact information
# Updates placeholder contact info with Ariel.karagodskiy@gmail.com

echo "🔄 Updating contact information in all sample documents..."

# List of sample HTML files to update
SAMPLE_FILES=(
    "nist-cybersecurity-framework-sample.html"
    "iso-9001-qms-manual-sample.html"
    "pci-dss-compliance-sample.html"
    "iso-14001-ems-manual-sample.html"
    "iso-13485-qms-manual-sample.html"
    "sox-compliance-sample.html"
    "gdpr-dpia-sample.html"
    "fda-21cfr11-validation-sample.html"
    "do-178c-software-development-sample.html"
    "nasa-software-engineering-sample.html"
)

# Directory containing sample files
SAMPLES_DIR="public/samples"

# Real contact information
REAL_EMAIL="Ariel.karagodskiy@gmail.com"

for file in "${SAMPLE_FILES[@]}"; do
    filepath="$SAMPLES_DIR/$file"
    if [ -f "$filepath" ]; then
        echo "📝 Updating $file..."
        
        # Add email to footer if it doesn't exist
        if ! grep -q "📧 Email:" "$filepath"; then
            # Find the line before the copyright and add email
            sed -i '/© 2024 Prism Writing Cooperative/i\            <p><strong>📧 Email:</strong> '"$REAL_EMAIL"'</p>' "$filepath"
        fi
        
        # Replace any placeholder email addresses
        sed -i 's/info@prismwriting\.com/'"$REAL_EMAIL"'/g' "$filepath"
        sed -i 's/contact@prismwriting\.com/'"$REAL_EMAIL"'/g' "$filepath"
        sed -i 's/hello@prismwriting\.com/'"$REAL_EMAIL"'/g' "$filepath"
        
        echo "✅ Updated $file"
    else
        echo "⚠️  File not found: $filepath"
    fi
done

echo "🎉 Contact information update complete!"
echo "📧 All sample documents now use: $REAL_EMAIL"
