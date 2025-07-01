#!/bin/bash

# Script to update all watermarks to be red and more visible
# This makes watermarks clear to discourage unauthorized use

echo "Updating watermarks to be red and more visible..."

# Find all HTML sample files with watermarks
find public/samples -name "*.html" -type f | while read file; do
    echo "Processing: $file"
    
    # Update watermark styles to be red and more visible
    sed -i 's/color: rgba(111, 66, 193, 0\.08);/color: rgba(220, 38, 38, 0.6);\
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);\
            letter-spacing: 8px;/g' "$file"
    
    # Also update any other variations of watermark colors
    sed -i 's/color: rgba(111, 66, 193, 0\.1);/color: rgba(220, 38, 38, 0.6);\
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);\
            letter-spacing: 8px;/g' "$file"
    
    sed -i 's/color: rgba(111, 66, 193, 0\.12);/color: rgba(220, 38, 38, 0.6);\
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);\
            letter-spacing: 8px;/g' "$file"
    
    # Update any other purple variations
    sed -i 's/color: rgba(139, 69, 19, 0\.08);/color: rgba(220, 38, 38, 0.6);\
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);\
            letter-spacing: 8px;/g' "$file"
done

echo "Watermark updates completed!"
echo "All watermarks are now red and clearly visible to discourage unauthorized use."
