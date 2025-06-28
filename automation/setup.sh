#!/bin/bash
# Setup script for Prism Auto automation tool

set -e

echo "🤖 Setting up Prism Auto Development Automation"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from your Next.js project root directory"
    exit 1
fi

# Check Python version
python_version=$(python3 --version 2>&1 | awk '{print $2}' | cut -d. -f1,2)
required_version="3.8"

if [ "$(printf '%s\n' "$required_version" "$python_version" | sort -V | head -n1)" != "$required_version" ]; then
    echo "❌ Error: Python 3.8+ required, found $python_version"
    exit 1
fi

echo "✅ Python $python_version detected"

# Create virtual environment if it doesn't exist
if [ ! -d "automation/venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv automation/venv
fi

# Activate virtual environment
source automation/venv/bin/activate

# Install Python dependencies
echo "📥 Installing Python dependencies..."
pip install -r automation/requirements.txt

# Make scripts executable
chmod +x automation/prism_auto.py
chmod +x automation/prism_dev_automator.py

# Create symlink for global access (optional)
if command -v sudo >/dev/null 2>&1; then
    echo "🔗 Creating global command link..."
    if [ -L "/usr/local/bin/prism-auto" ]; then
        sudo rm /usr/local/bin/prism-auto
    fi
    sudo ln -s "$(pwd)/automation/prism_auto.py" /usr/local/bin/prism-auto
    echo "✅ 'prism-auto' command available globally"
else
    echo "⚠️  Skipping global command link (sudo not available)"
fi

# Create .env file for API keys if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file for API keys..."
    cat > .env << EOF
# AI Service API Keys (choose one or both)
ANTHROPIC_API_KEY=your_anthropic_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Notification webhooks
SLACK_WEBHOOK_URL=
DISCORD_WEBHOOK_URL=

# Optional: Additional service keys
VERCEL_TOKEN=
GITHUB_TOKEN=
EOF
    echo "⚠️  Please edit .env file with your API keys"
fi

# Update .gitignore to exclude sensitive files
if [ -f ".gitignore" ]; then
    if ! grep -q "automation/venv" .gitignore; then
        echo "" >> .gitignore
        echo "# Automation tool" >> .gitignore
        echo "automation/venv/" >> .gitignore
        echo "automation/*.log" >> .gitignore
        echo "automation/workflow_*.json" >> .gitignore
        echo "automation/analysis_*.json" >> .gitignore
        echo "automation/implementation_*.md" >> .gitignore
    fi
fi

# Test the installation
echo "🧪 Testing installation..."
if python3 automation/prism_auto.py --help >/dev/null 2>&1; then
    echo "✅ Installation successful!"
else
    echo "❌ Installation test failed"
    exit 1
fi

echo ""
echo "🎉 Prism Auto Setup Complete!"
echo "=============================="
echo ""
echo "Next steps:"
echo "1. Edit .env file with your AI service API keys"
echo "2. Test with: python3 automation/prism_auto.py \"create a simple test component\""
echo "3. Or globally: prism-auto \"create a simple test component\""
echo ""
echo "Documentation:"
echo "- Configuration: automation-config.yaml"
echo "- Logs: automation/automation.log"
echo "- Help: prism-auto --help-detailed"
echo ""
echo "Example commands:"
echo "  prism-auto \"create a new testimonials page\""
echo "  prism-auto \"fix mobile navigation issues\""
echo "  prism-auto \"add contact form with validation\""
echo "  prism-auto --analyze-only \"implement user auth\""
