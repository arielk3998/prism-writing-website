#!/usr/bin/env python3
"""
Prism Auto - Main CLI Interface for Development Automation

Usage:
    prism-auto "create a new about page with team information"
    prism-auto "fix the mobile navigation menu"
    prism-auto "add a contact form with validation"
    prism-auto --analyze-only "implement user authentication"
"""

import sys
import os
import argparse
import json
from pathlib import Path
from datetime import datetime
import subprocess

# Add the automation directory to the Python path
automation_dir = Path(__file__).parent
sys.path.insert(0, str(automation_dir))

from prism_dev_automator import PrismDevAutomator

class PrismAutoCLI:
    """Command line interface for Prism Writing automation"""
    
    def __init__(self):
        self.automator = None
        self.project_root = self.find_project_root()
        
    def find_project_root(self) -> Path:
        """Find the project root directory"""
        current_dir = Path.cwd()
        
        # Look for package.json or next.config.js to identify project root
        while current_dir != current_dir.parent:
            if (current_dir / "package.json").exists() or (current_dir / "next.config.js").exists():
                return current_dir
            current_dir = current_dir.parent
        
        # Default to current directory if not found
        return Path.cwd()
    
    def setup_automator(self, args):
        """Initialize the automator with project settings"""
        project_root = args.project_root if args.project_root else self.project_root
        self.automator = PrismDevAutomator(str(project_root))
        
        # Apply CLI overrides
        if args.skip_tests:
            self.automator.config["automation"]["run_tests"] = False
        if args.skip_deploy:
            self.automator.config["automation"]["auto_deploy"] = False
        if args.skip_commit:
            self.automator.config["automation"]["auto_commit"] = False
    
    def print_banner(self):
        """Print the Prism Auto banner"""
        banner = """
╔═══════════════════════════════════════════════════════════════╗
║                         PRISM AUTO                           ║
║            Development Automation for Prism Writing          ║
║                                                              ║
║  🤖 AI-Powered Development Workflow Automation              ║
║  ⚡ From Request to Deployment in Seconds                   ║
║  🎯 Built for Next.js, React, TypeScript Projects          ║
╚═══════════════════════════════════════════════════════════════╝
        """
        print(banner)
    
    def print_project_info(self):
        """Print current project information"""
        package_json = self.project_root / "package.json"
        if package_json.exists():
            with open(package_json, 'r') as f:
                package_data = json.load(f)
                project_name = package_data.get("name", "Unknown")
                version = package_data.get("version", "Unknown")
        else:
            project_name = self.project_root.name
            version = "Unknown"
        
        print(f"📁 Project: {project_name} (v{version})")
        print(f"📂 Root: {self.project_root}")
        print(f"🕒 Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print()
    
    def analyze_request(self, request: str, args) -> dict:
        """Analyze the request and show the plan"""
        print("🔍 Analyzing request...")
        print(f"📝 Request: {request}")
        print()
        
        analysis = self.automator.analyze_request(request)
        
        # Display analysis results
        print("📊 ANALYSIS RESULTS")
        print("=" * 50)
        print(f"🎯 Type: {analysis['type']}")
        print(f"📈 Complexity: {analysis.get('complexity', 'unknown')}")
        print(f"⏱️  Estimated Time: {analysis.get('estimated_time', 'unknown')} hours")
        print()
        
        if analysis.get('components'):
            print("🧩 Components to work with:")
            for component in analysis['components']:
                print(f"   • {component}")
            print()
        
        if analysis.get('files_to_modify'):
            print("📄 Files to modify:")
            for file in analysis['files_to_modify']:
                print(f"   • {file}")
            print()
        
        if analysis.get('dependencies'):
            print("📦 Dependencies to install:")
            for dep in analysis['dependencies']:
                print(f"   • {dep}")
            print()
        
        print(f"🚀 Deployment Impact: {analysis['deployment_impact'].get('impact_level', 'unknown')}")
        print()
        
        return analysis
    
    def confirm_implementation(self, analysis: dict) -> bool:
        """Ask user to confirm implementation"""
        print("⚠️  IMPLEMENTATION PLAN")
        print("=" * 50)
        print("This automation will:")
        print("✅ Analyze your request using AI")
        print("✅ Generate/modify code files")
        print("✅ Install required dependencies")
        print("✅ Run tests and quality checks")
        print("✅ Commit changes to git")
        print("✅ Deploy to production")
        print("✅ Generate documentation")
        print()
        
        response = input("Do you want to proceed? (y/N): ").strip().lower()
        return response in ['y', 'yes']
    
    def run_automation(self, request: str, analysis: dict):
        """Run the full automation workflow"""
        print("\n🚀 STARTING AUTOMATION")
        print("=" * 50)
        
        try:
            # Run the automation
            result = self.automator.automate_request(request)
            
            if result["status"] == "success":
                print("\n✅ AUTOMATION COMPLETED SUCCESSFULLY!")
                print("=" * 50)
                
                # Show what was accomplished
                steps = result.get("steps", {})
                for step_name, step_data in steps.items():
                    status = step_data.get("status", "unknown")
                    emoji = "✅" if status == "completed" else "❌"
                    print(f"{emoji} {step_name.title()}: {status}")
                
                print(f"\n🕒 Total Time: {self.calculate_duration(result)}")
                
                # Show URLs if deployed
                if "deployment" in steps and steps["deployment"]["status"] == "completed":
                    deploy_result = steps["deployment"]["result"]
                    if "output" in deploy_result:
                        print(f"\n🌐 Deployed to: {self.automator.config['deployment']['production_url']}")
                
                print(f"\n📋 Workflow saved to: workflow_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json")
                
            else:
                print("\n❌ AUTOMATION FAILED")
                print("=" * 50)
                print(f"Error: {result.get('error', 'Unknown error')}")
                
                # Show which steps completed
                steps = result.get("steps", {})
                for step_name, step_data in steps.items():
                    status = step_data.get("status", "unknown")
                    emoji = "✅" if status == "completed" else "❌"
                    print(f"{emoji} {step_name.title()}: {status}")
                
                return False
            
        except KeyboardInterrupt:
            print("\n⚠️  Automation interrupted by user")
            return False
        except Exception as e:
            print(f"\n❌ Fatal error: {e}")
            return False
        
        return True
    
    def calculate_duration(self, result: dict) -> str:
        """Calculate automation duration"""
        if "started_at" in result and "completed_at" in result:
            start = datetime.fromisoformat(result["started_at"])
            end = datetime.fromisoformat(result["completed_at"])
            duration = end - start
            return f"{duration.total_seconds():.1f} seconds"
        return "Unknown"
    
    def show_help(self):
        """Show detailed help information"""
        help_text = """
PRISM AUTO - Development Automation Tool

DESCRIPTION:
    Automate your entire development workflow from request to deployment.
    Uses AI to analyze requests, generate code, run tests, and deploy changes.

USAGE:
    prism-auto "your development request"
    prism-auto [OPTIONS] "your development request"

EXAMPLES:
    prism-auto "create a new testimonials page with customer reviews"
    prism-auto "fix the mobile navigation menu styling issues"
    prism-auto "add a contact form with email validation"
    prism-auto "enhance the portfolio page with filtering"
    prism-auto --analyze-only "implement user authentication system"

OPTIONS:
    --analyze-only          Only analyze the request, don't implement
    --skip-tests           Skip running tests
    --skip-deploy          Skip deployment step
    --skip-commit          Skip git commit
    --project-root PATH    Specify project root directory
    --config PATH          Use custom configuration file
    --verbose              Show detailed output
    --dry-run              Show what would be done without doing it

REQUEST TYPES:
    📄 New Pages           "create a new [page] page"
    🧩 Components          "add a [component] component"
    🐛 Bug Fixes           "fix [issue description]"
    ✨ Enhancements        "improve [feature description]"
    🎨 Styling             "update [element] styling"
    🔧 Configuration       "configure [setting]"

WORKFLOW STEPS:
    1. 🔍 Analyze request using AI
    2. 📋 Create implementation plan
    3. 🏗️  Generate/modify code files
    4. 📦 Install dependencies
    5. 🧪 Run tests and checks
    6. 💾 Commit to git
    7. 🚀 Deploy to production
    8. 📝 Generate documentation

CONFIGURATION:
    Edit automation-config.yaml to customize:
    - AI provider settings
    - Deployment configuration
    - Quality gates
    - File templates
    - Testing preferences

For more information, visit: https://github.com/prism-writing/automation
        """
        print(help_text)

def main():
    """Main CLI entry point"""
    parser = argparse.ArgumentParser(
        description="Prism Auto - Development Automation Tool",
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    
    parser.add_argument(
        "request",
        nargs="?",
        help="Development request to automate"
    )
    
    parser.add_argument(
        "--analyze-only",
        action="store_true",
        help="Only analyze the request, don't implement"
    )
    
    parser.add_argument(
        "--skip-tests",
        action="store_true",
        help="Skip running tests"
    )
    
    parser.add_argument(
        "--skip-deploy",
        action="store_true",
        help="Skip deployment step"
    )
    
    parser.add_argument(
        "--skip-commit",
        action="store_true",
        help="Skip git commit"
    )
    
    parser.add_argument(
        "--project-root",
        help="Project root directory"
    )
    
    parser.add_argument(
        "--config",
        help="Path to configuration file"
    )
    
    parser.add_argument(
        "--verbose",
        action="store_true",
        help="Show detailed output"
    )
    
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be done without doing it"
    )
    
    parser.add_argument(
        "--help-detailed",
        action="store_true",
        help="Show detailed help information"
    )
    
    args = parser.parse_args()
    
    # Initialize CLI
    cli = PrismAutoCLI()
    
    # Show detailed help if requested
    if args.help_detailed:
        cli.show_help()
        return
    
    # Show banner
    cli.print_banner()
    cli.print_project_info()
    
    # Validate request
    if not args.request:
        print("❌ Error: No request provided")
        print("💡 Example: prism-auto \"create a new about page\"")
        print("📖 For help: prism-auto --help-detailed")
        sys.exit(1)
    
    try:
        # Setup automator
        cli.setup_automator(args)
        
        # Analyze request
        analysis = cli.analyze_request(args.request, args)
        
        # If analyze-only, stop here
        if args.analyze_only or args.dry_run:
            print("✅ Analysis complete. Use without --analyze-only to implement.")
            return
        
        # Confirm implementation
        if not cli.confirm_implementation(analysis):
            print("❌ Implementation cancelled by user")
            return
        
        # Run automation
        success = cli.run_automation(args.request, analysis)
        
        if success:
            print("\n🎉 All done! Your request has been automated successfully.")
        else:
            sys.exit(1)
            
    except KeyboardInterrupt:
        print("\n⚠️  Operation cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Fatal error: {e}")
        if args.verbose:
            import traceback
            traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()
