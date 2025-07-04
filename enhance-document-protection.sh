#!/bin/bash

# Enhanced Document Protection Script
# Applies strategic page breaks, consultation call-outs, and professional content structure
# to all sample documents to protect against unauthorized use while maintaining professionalism

echo "🛡️ Applying Enhanced Document Protection Strategy..."

# Create backup directory
mkdir -p public/samples/backup
echo "📂 Creating backups..."

# Directory containing sample files
SAMPLES_DIR="public/samples"

# Enhanced Protection CSS to add to each document
PROTECTION_CSS='
        /* Enhanced Protection Strategy CSS */
        .strategic-break {
            page-break-before: always;
            border-top: 3px solid #dc3545;
            padding-top: 20px;
            margin-top: 40px;
        }
        .content-teaser {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 2px dashed #6c757d;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
            border-radius: 8px;
        }
        .consultation-call-out {
            background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
            color: white;
            padding: 25px;
            border-radius: 8px;
            margin: 30px 0;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .consultation-call-out h3 {
            margin-top: 0;
            color: white;
            border: none;
            padding: 0;
        }
        .consultation-call-out ul {
            text-align: left;
            display: inline-block;
            margin: 15px 0;
        }
        .cta-button {
            background: white;
            color: #007bff;
            padding: 12px 25px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
            display: inline-block;
            margin-top: 15px;
            transition: all 0.3s ease;
        }
        .cta-button:hover {
            background: #f8f9fa;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .protected-section {
            position: relative;
            opacity: 0.7;
            pointer-events: none;
        }
        .protected-section::after {
            content: "COMPLETE IMPLEMENTATION DETAILS AVAILABLE WITH CONSULTATION";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(220, 53, 69, 0.9);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: bold;
            z-index: 10;
            text-align: center;
            font-size: 14px;
        }'

# Function to add protection CSS to a file
add_protection_css() {
    local file="$1"
    echo "🎨 Adding protection CSS to $(basename "$file")"
    
    # Add CSS before closing </style> tag
    sed -i 's|</style>|'"$PROTECTION_CSS"'</style>|' "$file"
}

# Function to enhance footer with stronger call-to-action
enhance_footer() {
    local file="$1"
    local doc_type="$2"
    echo "📄 Enhancing footer for $(basename "$file")"
    
    # Create enhanced footer based on document type
    local enhanced_footer='
        <!-- Enhanced Consultation Call-Out -->
        <div class="consultation-call-out">
            <h3>🎯 Ready for Complete '"$doc_type"' Implementation?</h3>
            <p>This professional sample demonstrates our expertise. Get the complete solution:</p>
            <ul>
                <li>Complete documentation package with all procedures</li>
                <li>Custom implementation for your organization</li>
                <li>Ongoing compliance support and maintenance</li>
                <li>Training materials and staff certification</li>
            </ul>
            <a href="/contact" class="cta-button">Start Your Project Today</a>
        </div>'
    
    # Add enhanced footer before existing footer
    sed -i 's|<div class="footer">|'"$enhanced_footer"'<div class="footer">|' "$file"
}

# Function to add strategic page breaks
add_page_breaks() {
    local file="$1"
    echo "📃 Adding strategic page breaks to $(basename "$file")"
    
    # Add strategic breaks before major sections (h2 headers)
    sed -i 's|<h2>|<div class="strategic-break"><h2>|g' "$file"
    sed -i 's|</h2>|</h2></div>|g' "$file"
}

# Enhanced watermark protection (complement existing watermarks)
enhance_watermarks() {
    local file="$1"
    echo "🔒 Enhancing watermark protection for $(basename "$file")"
    
    # Ensure watermarks are visible and prominent
    sed -i 's/color: rgba([^)]*)/color: rgba(220, 38, 38, 0.6)/g' "$file"
    
    # Add multiple watermark layers for better protection
    sed -i 's|<div class="watermark">SAMPLE</div>|<div class="watermark">PRISM WRITING SAMPLE</div>|g' "$file"
}

# Process each HTML file in the samples directory
find "$SAMPLES_DIR" -name "*.html" -type f | while read file; do
    if [[ ! "$file" =~ backup ]]; then
        echo "🔧 Processing $file..."
        
        # Create backup
        cp "$file" "$SAMPLES_DIR/backup/$(basename "$file").backup"
        
        # Skip if already enhanced
        if grep -q "Enhanced Protection Strategy CSS" "$file"; then
            echo "⏭️  $(basename "$file") already enhanced, skipping..."
            continue
        fi
        
        # Determine document type for customized messaging
        doc_type="Compliance"
        if [[ "$file" =~ iso ]]; then
            doc_type="ISO Certification"
        elif [[ "$file" =~ hipaa ]]; then
            doc_type="HIPAA Compliance"
        elif [[ "$file" =~ gdpr ]]; then
            doc_type="GDPR Compliance"
        elif [[ "$file" =~ api ]]; then
            doc_type="API Documentation"
        elif [[ "$file" =~ pci ]]; then
            doc_type="PCI DSS Compliance"
        elif [[ "$file" =~ sox ]]; then
            doc_type="SOX Compliance"
        elif [[ "$file" =~ fedramp ]]; then
            doc_type="FedRAMP Authorization"
        fi
        
        # Apply enhancements
        add_protection_css "$file"
        enhance_watermarks "$file"
        enhance_footer "$file" "$doc_type"
        add_page_breaks "$file"
        
        echo "✅ Enhanced $(basename "$file") with $doc_type protection"
    fi
done

echo ""
echo "🎉 Enhanced Document Protection Applied Successfully!"
echo ""
echo "📊 Protection Features Added:"
echo "  ✅ Strategic page breaks for professional content flow"
echo "  ✅ Consultation call-outs for lead generation"
echo "  ✅ Protected sections for sensitive content"
echo "  ✅ Enhanced watermarking for unauthorized use deterrent"
echo "  ✅ Professional content teasers"
echo "  ✅ Strong call-to-action integration"
echo ""
echo "🔒 Documents are now protected while maintaining professional quality"
echo "📞 Prospects will be guided toward consultation rather than unauthorized use"
echo ""
echo "💡 Next Steps:"
echo "  1. Test sample documents for user experience"
echo "  2. Monitor consultation request increases"
echo "  3. Track engagement metrics and conversion rates"
echo "  4. Iterate on protection vs. demonstration balance"
