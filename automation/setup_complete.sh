#!/bin/bash

# Prism Auto Complete Setup Script
# This script sets up the complete automation system for Prism Writing development

set -e

echo "🚀 Setting up Prism Auto Complete..."
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check Python installation
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: Python 3 is required but not installed."
    exit 1
fi

echo "✅ Python 3 found"

# Create virtual environment for automation if it doesn't exist
if [ ! -d "automation/.venv" ]; then
    echo "📦 Creating Python virtual environment..."
    cd automation
    python3 -m venv .venv
    cd ..
fi

# Activate virtual environment and install dependencies
echo "📥 Installing Python dependencies..."
cd automation
source .venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install required packages
pip install -r requirements.txt

cd ..

# Create automation config if it doesn't exist
if [ ! -f "automation-config.yaml" ]; then
    echo "⚙️  Creating automation configuration..."
    cp automation/automation-config.yaml . 2>/dev/null || echo "Config file already exists"
fi

# Create necessary directories
echo "📁 Creating directory structure..."
mkdir -p docs/implementations
mkdir -p .automation_backups

# Make Python scripts executable
chmod +x automation/prism_auto_complete.py
chmod +x automation/prism_dev_automator.py

# Create convenient aliases/scripts
echo "🔗 Creating convenience scripts..."

# Create prism-auto command in project root
cat > prism-auto << 'EOF'
#!/bin/bash
# Prism Auto Complete - Development Automation
cd "$(dirname "$0")"
source automation/.venv/bin/activate
python automation/prism_auto_complete.py "$@"
EOF

chmod +x prism-auto

# Create prism-auto-analyze command for analysis-only
cat > prism-auto-analyze << 'EOF'
#!/bin/bash
# Prism Auto Analyze - Request Analysis Only
cd "$(dirname "$0")"
source automation/.venv/bin/activate
python automation/prism_auto_complete.py "$@" --analyze-only
EOF

chmod +x prism-auto-analyze

# Check Node.js dependencies
echo "🔍 Checking Node.js dependencies..."
if ! npm list --depth=0 >/dev/null 2>&1; then
    echo "📦 Installing Node.js dependencies..."
    npm install
fi

# Test build
echo "🧪 Testing build..."
if npm run build >/dev/null 2>&1; then
    echo "✅ Build test passed"
else
    echo "⚠️  Build test failed - you may need to fix existing issues first"
fi

# Create .gitignore entries for automation
echo "📝 Updating .gitignore..."
cat >> .gitignore << 'EOF'

# Prism Auto Complete
automation/.venv/
automation/__pycache__/
automation/*.pyc
.automation_backups/
automation_session_*.json
analysis_*.json
automation.log
EOF

echo ""
echo "🎉 Prism Auto Complete setup complete!"
echo "======================================"
echo ""
echo "🚀 Quick Start:"
echo ""
echo "  # Full automation (analyze, implement, test, commit, deploy)"
echo "  ./prism-auto \"create a new services page with pricing information\""
echo ""
echo "  # Analysis only"
echo "  ./prism-auto-analyze \"add a contact form with validation\""
echo ""
echo "  # Skip deployment"
echo "  ./prism-auto \"fix the mobile navigation menu\" --skip-deploy"
echo ""
echo "  # Auto-confirm without prompts"
echo "  ./prism-auto \"enhance homepage with animations\" --auto-confirm"
echo ""
echo "📚 Documentation:"
echo "  - Configuration: automation-config.yaml"
echo "  - Logs: automation.log"
echo "  - Session logs: automation_session_*.json"
echo "  - Implementation docs: docs/implementations/"
echo ""
echo "🔧 Advanced Usage:"
echo "  ./prism-auto --help"
echo ""
echo "Happy automating! 🤖✨"
