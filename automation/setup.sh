#!/bin/bash
# Prism Auto Setup Script
# This script sets up the complete automation environment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${PURPLE}"
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                    PRISM AUTO SETUP                          ║"
echo "║            Setting up Development Automation                 ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo -e "${BLUE}Setup Information:${NC}"
echo "Script Directory: $SCRIPT_DIR"
echo "Project Root: $PROJECT_ROOT"
echo ""

# Check system requirements
echo -e "${BLUE}Checking system requirements...${NC}"

# Check Python
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo -e "${GREEN}✓ Found: $PYTHON_VERSION${NC}"
else
    echo -e "${RED}✗ Python 3 is required but not installed${NC}"
    echo "Please install Python 3.8 or later and try again."
    exit 1
fi

# Check pip
if command -v pip3 &> /dev/null; then
    echo -e "${GREEN}✓ pip3 is available${NC}"
elif command -v pip &> /dev/null; then
    echo -e "${GREEN}✓ pip is available${NC}"
else
    echo -e "${RED}✗ pip is required but not installed${NC}"
    exit 1
fi

# Check Node.js (for the main project)
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Found Node.js: $NODE_VERSION${NC}"
else
    echo -e "${YELLOW}⚠ Node.js not found (required for the main project)${NC}"
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓ Found npm: $NPM_VERSION${NC}"
else
    echo -e "${YELLOW}⚠ npm not found (required for the main project)${NC}"
fi

# Check git
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo -e "${GREEN}✓ Found: $GIT_VERSION${NC}"
else
    echo -e "${YELLOW}⚠ git not found (recommended for automation)${NC}"
fi

echo ""

# Create virtual environment
echo -e "${BLUE}Setting up Python virtual environment...${NC}"
cd "$SCRIPT_DIR"

if [ -d "venv" ]; then
    echo -e "${YELLOW}Virtual environment already exists, removing...${NC}"
    rm -rf venv
fi

python3 -m venv venv
source venv/bin/activate

echo -e "${GREEN}✓ Virtual environment created${NC}"

# Upgrade pip
echo -e "${BLUE}Upgrading pip...${NC}"
pip install --upgrade pip

# Install Python dependencies
echo -e "${BLUE}Installing Python dependencies...${NC}"
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
    echo -e "${GREEN}✓ Python dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠ requirements.txt not found, installing minimal dependencies...${NC}"
    pip install pyyaml requests
fi

# Make scripts executable
echo -e "${BLUE}Making scripts executable...${NC}"
chmod +x prism-auto
if [ -f "prism_auto_complete.py" ]; then
    chmod +x prism_auto_complete.py
fi
echo -e "${GREEN}✓ Scripts are now executable${NC}"

# Create configuration if it doesn't exist
echo -e "${BLUE}Setting up configuration...${NC}"
CONFIG_FILE="$PROJECT_ROOT/automation-config.yaml"
if [ ! -f "$CONFIG_FILE" ]; then
    echo -e "${YELLOW}Creating default configuration...${NC}"
    # The config will be created automatically by the automator
    echo -e "${GREEN}✓ Configuration will be created on first run${NC}"
else
    echo -e "${GREEN}✓ Configuration file already exists${NC}"
fi

# Check project dependencies
echo -e "${BLUE}Checking project dependencies...${NC}"
cd "$PROJECT_ROOT"

if [ -f "package.json" ]; then
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}Installing Node.js dependencies...${NC}"
        npm install
        echo -e "${GREEN}✓ Node.js dependencies installed${NC}"
    else
        echo -e "${GREEN}✓ Node.js dependencies already installed${NC}"
    fi
else
    echo -e "${YELLOW}⚠ package.json not found in project root${NC}"
fi

# Create symlink for global access (optional)
echo -e "${BLUE}Setting up global access...${NC}"
if [ -w "/usr/local/bin" ] || [ -w "$HOME/.local/bin" ]; then
    if [ -w "/usr/local/bin" ]; then
        LINK_DIR="/usr/local/bin"
    else
        LINK_DIR="$HOME/.local/bin"
        mkdir -p "$LINK_DIR"
    fi
    
    LINK_PATH="$LINK_DIR/prism-auto"
    if [ ! -L "$LINK_PATH" ]; then
        ln -sf "$SCRIPT_DIR/prism-auto" "$LINK_PATH"
        echo -e "${GREEN}✓ Global symlink created at $LINK_PATH${NC}"
        echo -e "${BLUE}You can now run 'prism-auto' from anywhere${NC}"
    else
        echo -e "${GREEN}✓ Global symlink already exists${NC}"
    fi
else
    echo -e "${YELLOW}⚠ Cannot create global symlink (no write access)${NC}"
    echo -e "${BLUE}You can still run the automation from: $SCRIPT_DIR/prism-auto${NC}"
fi

# Test the automation
echo -e "${BLUE}Testing automation system...${NC}"
cd "$SCRIPT_DIR"
source venv/bin/activate

if python3 -c "from prism_dev_automator import PrismDevAutomator; print('Import successful')" 2>/dev/null; then
    echo -e "${GREEN}✓ Automation modules import successfully${NC}"
else
    echo -e "${RED}✗ Module import failed${NC}"
    echo "There might be missing dependencies or configuration issues."
fi

# Final instructions
echo ""
echo -e "${GREEN}🎉 SETUP COMPLETE! 🎉${NC}"
echo ""
echo -e "${BLUE}How to use Prism Auto:${NC}"
echo ""
echo "1. From anywhere (if global symlink was created):"
echo "   prism-auto \"create a new about page\""
echo ""
echo "2. From the automation directory:"
echo "   ./prism-auto \"create a new about page\""
echo ""
echo "3. Direct Python execution:"
echo "   cd $SCRIPT_DIR"
echo "   source venv/bin/activate"
echo "   python3 prism_auto_complete.py \"create a new about page\""
echo ""
echo -e "${BLUE}Common options:${NC}"
echo "  --analyze-only    Only analyze the request"
echo "  --skip-tests      Skip running tests"
echo "  --skip-deploy     Skip deployment"
echo "  --auto-confirm    Auto-confirm without prompts"
echo "  --debug           Enable debug output"
echo ""
echo -e "${BLUE}Examples:${NC}"
echo "  prism-auto \"fix the mobile navigation\" --skip-deploy"
echo "  prism-auto \"add a contact form\" --analyze-only"
echo "  prism-auto \"enhance the homepage\" --auto-confirm"
echo ""
echo -e "${BLUE}Configuration:${NC}"
echo "  Config file: $CONFIG_FILE"
echo "  Logs: $PROJECT_ROOT/automation.log"
echo "  Session logs: $PROJECT_ROOT/automation_session_*.json"
echo ""
echo -e "${PURPLE}Happy automating! 🚀${NC}"
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
