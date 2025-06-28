#!/usr/bin/env python3
"""
Prism Auto - Complete CLI Interface for Development Automation

This is the main entry point for the Prism Writing development automation system.
It provides a comprehensive interface for end-to-end automation from natural
language requests to deployed features.

Usage:
    python prism_auto_complete.py "create a new about page with team information"
    python prism_auto_complete.py "fix the mobile navigation menu" --skip-deploy
    python prism_auto_complete.py "add a contact form with validation" --analyze-only
"""

import sys
import os
import argparse
import json
from pathlib import Path
from datetime import datetime
import traceback

# Add the automation directory to the Python path
automation_dir = Path(__file__).parent
sys.path.insert(0, str(automation_dir))

try:
    from prism_dev_automator import PrismDevAutomator
    from test_runner import PrismTestRunner
    from enhanced_ai_integration import PrismAIAssistant
    from file_operations import PrismFileOperations
except ImportError as e:
    print(f"Error importing automation modules: {e}")
    print("Make sure all automation modules are in the same directory")
    sys.exit(1)

class PrismAutoComplete:
    """Complete automation interface for Prism Writing development"""
    
    def __init__(self):
        self.project_root = self.find_project_root()
        self.automator = None
        self.session_id = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.session_log = []
        
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
    
    def print_banner(self):
        """Print the Prism Auto banner"""
        banner = """
╔═══════════════════════════════════════════════════════════════════════╗
║                            PRISM AUTO COMPLETE                        ║
║              Full-Stack Development Automation for Prism Writing      ║
║                                                                       ║
║  🤖 AI-Powered End-to-End Development Workflow                       ║
║  ⚡ From Natural Language Request to Production Deploy               ║
║  🎯 Built for Next.js, React, TypeScript Projects                   ║
║  🚀 Analyze → Implement → Test → Commit → Deploy → Document         ║
╚═══════════════════════════════════════════════════════════════════════╝
        """
        print(banner)
    
    def print_project_info(self):
        """Print current project information"""
        package_json = self.project_root / "package.json"
        if package_json.exists():
            try:
                with open(package_json, 'r', encoding='utf-8') as f:
                    package_data = json.load(f)
                    project_name = package_data.get("name", "Unknown")
                    version = package_data.get("version", "Unknown")
            except Exception:
                project_name = self.project_root.name
                version = "Unknown"
        else:
            project_name = self.project_root.name
            version = "Unknown"
        
        print(f"📁 Project: {project_name} (v{version})")
        print(f"📂 Root: {self.project_root}")
        print(f"🕒 Session: {self.session_id}")
        print(f"🔧 Automation Config: {'✓' if (self.project_root / 'automation-config.yaml').exists() else '✗'}")
        print()
    
    def setup_automator(self, args):
        """Initialize the automator with configuration"""
        try:
            self.automator = PrismDevAutomator(str(self.project_root))
            
            # Apply CLI overrides
            if args.skip_tests:
                self.automator.config["automation"]["run_tests"] = False
            if args.skip_deploy:
                self.automator.config["automation"]["auto_deploy"] = False
            if args.skip_commit:
                self.automator.config["automation"]["auto_commit"] = False
            if args.force:
                self.automator.config["automation"]["backup_before_changes"] = False
            
            return True
        except Exception as e:
            print(f"❌ Failed to initialize automator: {e}")
            if args.debug:
                traceback.print_exc()
            return False
    
    def log_session_event(self, event_type: str, data: dict):
        """Log session events for debugging and analysis"""
        event = {
            "timestamp": datetime.now().isoformat(),
            "type": event_type,
            "data": data
        }
        self.session_log.append(event)
    
    def analyze_request(self, request: str, args) -> dict:
        """Analyze the request and show the plan"""
        print("🔍 ANALYZING REQUEST")
        print("=" * 50)
        print(f"📝 Request: {request}")
        print()
        
        try:
            analysis = self.automator.analyze_request(request)
            self.log_session_event("analysis_complete", analysis)
            
            # Display analysis results
            print("📊 ANALYSIS RESULTS")
            print("-" * 30)
            print(f"🎯 Type: {analysis['type']}")
            print(f"📈 Complexity: {analysis['complexity']}")
            print(f"⏱️  Estimated Time: {analysis.get('estimated_time', 'Unknown')}")
            print()
            
            if analysis.get('components_needed'):
                print(f"🧩 Components to Create: {', '.join(analysis['components_needed'])}")
            
            if analysis.get('files_to_create'):
                print(f"📄 New Files: {len(analysis['files_to_create'])} files")
                for file_path in analysis['files_to_create'][:3]:  # Show first 3
                    print(f"    - {file_path}")
                if len(analysis['files_to_create']) > 3:
                    print(f"    ... and {len(analysis['files_to_create']) - 3} more")
            
            if analysis.get('files_to_modify'):
                print(f"✏️  Files to Modify: {len(analysis['files_to_modify'])} files")
            
            if analysis.get('dependencies'):
                print(f"📦 Dependencies: {', '.join(analysis['dependencies'])}")
            
            print()
            
            # Implementation plan
            if analysis.get('implementation_plan'):
                print("📋 IMPLEMENTATION PLAN")
                print("-" * 30)
                for step in analysis['implementation_plan']:
                    print(f"  {step['step']}. {step['description']}")
                print()
            
            # Deployment considerations
            if analysis.get('deployment_considerations'):
                deploy = analysis['deployment_considerations']
                print("🚀 DEPLOYMENT IMPACT")
                print("-" * 30)
                print(f"Breaking Changes: {'⚠️  Yes' if deploy.get('breaking_changes') else '✅ No'}")
                print(f"SEO Impact: {'📈 Yes' if deploy.get('affects_seo') else '➡️  None'}")
                print(f"Performance: {deploy.get('performance_impact', 'minimal').title()}")
                if deploy.get('security_considerations'):
                    print("🔒 Security Notes:")
                    for consideration in deploy['security_considerations']:
                        print(f"    - {consideration}")
                print()
            
            return analysis
            
        except Exception as e:
            print(f"❌ Analysis failed: {e}")
            if args.debug:
                traceback.print_exc()
            self.log_session_event("analysis_failed", {"error": str(e)})
            return None
    
    def confirm_implementation(self, analysis: dict, args) -> bool:
        """Get user confirmation before proceeding"""
        if args.auto_confirm:
            print("🤖 Auto-confirming implementation (--auto-confirm flag)")
            return True
        
        print("❓ CONFIRMATION REQUIRED")
        print("=" * 50)
        print(f"Ready to implement: {analysis['request']}")
        print(f"Type: {analysis['type']} | Complexity: {analysis['complexity']}")
        
        if analysis.get('deployment_considerations', {}).get('breaking_changes'):
            print("⚠️  WARNING: This implementation may include breaking changes!")
        
        print("\nThis will:")
        if analysis.get('files_to_create'):
            print(f"  ✨ Create {len(analysis['files_to_create'])} new files")
        if analysis.get('files_to_modify'):
            print(f"  ✏️  Modify {len(analysis['files_to_modify'])} existing files")
        if analysis.get('dependencies'):
            print(f"  📦 Install {len(analysis['dependencies'])} dependencies")
        
        if not args.skip_tests:
            print("  🧪 Run tests and validation")
        if not args.skip_commit:
            print("  📝 Create git commit")
        if not args.skip_deploy:
            print("  🚀 Deploy to production")
        
        print()
        
        while True:
            response = input("Proceed with implementation? [Y/n/details]: ").strip().lower()
            
            if response in ['', 'y', 'yes']:
                return True
            elif response in ['n', 'no']:
                print("❌ Implementation cancelled by user")
                return False
            elif response in ['d', 'details']:
                self.show_detailed_plan(analysis)
                continue
            else:
                print("Please enter 'y' for yes, 'n' for no, or 'd' for details")
    
    def show_detailed_plan(self, analysis: dict):
        """Show detailed implementation plan"""
        print("\n📋 DETAILED IMPLEMENTATION PLAN")
        print("=" * 50)
        
        plan = analysis.get('implementation_plan', [])
        for step in plan:
            print(f"\nStep {step['step']}: {step['action'].upper()}")
            print(f"Description: {step['description']}")
            if step.get('files'):
                print("Files affected:")
                for file_path in step['files']:
                    print(f"  - {file_path}")
        
        print("\n" + "=" * 50)
    
    def implement_request(self, analysis: dict, args) -> dict:
        """Execute the implementation"""
        print("🚀 IMPLEMENTING REQUEST")
        print("=" * 50)
        
        try:
            implementation = self.automator.implement_request(analysis)
            self.log_session_event("implementation_complete", implementation)
            
            # Show implementation results
            print("✅ IMPLEMENTATION RESULTS")
            print("-" * 30)
            print(f"Status: {implementation['status'].upper()}")
            
            if implementation.get('files_created'):
                print(f"📄 Created {len(implementation['files_created'])} files:")
                for file_path in implementation['files_created']:
                    print(f"    ✨ {file_path}")
            
            if implementation.get('files_modified'):
                print(f"✏️  Modified {len(implementation['files_modified'])} files:")
                for file_path in implementation['files_modified']:
                    print(f"    📝 {file_path}")
            
            if implementation.get('dependencies_installed'):
                print(f"📦 Installed dependencies: {', '.join(implementation['dependencies_installed'])}")
            
            if implementation.get('warnings'):
                print("⚠️  Warnings:")
                for warning in implementation['warnings']:
                    print(f"    - {warning}")
            
            if implementation.get('errors'):
                print("❌ Errors:")
                for error in implementation['errors']:
                    print(f"    - {error}")
            
            print()
            return implementation
            
        except Exception as e:
            print(f"❌ Implementation failed: {e}")
            if args.debug:
                traceback.print_exc()
            self.log_session_event("implementation_failed", {"error": str(e)})
            return None
    
    def run_tests(self, implementation: dict, args) -> dict:
        """Run tests on the implementation"""
        if args.skip_tests:
            print("⏭️  Skipping tests (--skip-tests flag)")
            return {"status": "skipped"}
        
        print("🧪 RUNNING TESTS")
        print("=" * 50)
        
        try:
            test_runner = PrismTestRunner(str(self.project_root))
            test_results = test_runner.run_all_tests(self.automator.config)
            self.log_session_event("tests_complete", test_results)
            
            print("📊 TEST RESULTS")
            print("-" * 30)
            print(f"Overall Status: {test_results['overall_status'].upper()}")
            
            for test in test_results['tests_run']:
                test_name = test['name'].replace('_', ' ').title()
                test_status = test['result']['status']
                status_icon = "✅" if test_status == "success" else "❌" if test_status == "failed" else "⚠️"
                print(f"{status_icon} {test_name}: {test_status}")
            
            if test_results.get('failures'):
                print("\n❌ Test Failures:")
                for failure in test_results['failures']:
                    print(f"    - {failure}")
            
            if test_results.get('warnings'):
                print("\n⚠️  Test Warnings:")
                for warning in test_results['warnings']:
                    print(f"    - {warning}")
            
            print()
            return test_results
            
        except Exception as e:
            print(f"❌ Tests failed: {e}")
            if args.debug:
                traceback.print_exc()
            self.log_session_event("tests_failed", {"error": str(e)})
            return {"status": "failed", "error": str(e)}
    
    def commit_changes(self, implementation: dict, analysis: dict, args) -> dict:
        """Commit changes to git"""
        if args.skip_commit:
            print("⏭️  Skipping git commit (--skip-commit flag)")
            return {"status": "skipped"}
        
        print("📝 COMMITTING CHANGES")
        print("=" * 50)
        
        try:
            commit_result = self.automator.commit_changes(implementation, analysis)
            self.log_session_event("commit_complete", commit_result)
            
            print("✅ GIT COMMIT RESULTS")
            print("-" * 30)
            print(f"Status: {commit_result['status'].upper()}")
            
            if commit_result.get('commit_hash'):
                print(f"📝 Commit: {commit_result['commit_hash']}")
            
            if commit_result.get('message'):
                print(f"💬 Message: {commit_result['message']}")
            
            if commit_result.get('files_committed'):
                print(f"📄 Files: {len(commit_result['files_committed'])} committed")
            
            print()
            return commit_result
            
        except Exception as e:
            print(f"❌ Git commit failed: {e}")
            if args.debug:
                traceback.print_exc()
            self.log_session_event("commit_failed", {"error": str(e)})
            return {"status": "failed", "error": str(e)}
    
    def deploy_changes(self, args) -> dict:
        """Deploy changes to production"""
        if args.skip_deploy:
            print("⏭️  Skipping deployment (--skip-deploy flag)")
            return {"status": "skipped"}
        
        print("🚀 DEPLOYING TO PRODUCTION")
        print("=" * 50)
        
        try:
            deploy_result = self.automator.deploy()
            self.log_session_event("deploy_complete", deploy_result)
            
            print("🎉 DEPLOYMENT RESULTS")
            print("-" * 30)
            print(f"Status: {deploy_result['status'].upper()}")
            
            if deploy_result.get('url'):
                print(f"🌐 URL: {deploy_result['url']}")
            
            if deploy_result.get('deployment_id'):
                print(f"🆔 Deployment ID: {deploy_result['deployment_id']}")
            
            print()
            return deploy_result
            
        except Exception as e:
            print(f"❌ Deployment failed: {e}")
            if args.debug:
                traceback.print_exc()
            self.log_session_event("deploy_failed", {"error": str(e)})
            return {"status": "failed", "error": str(e)}
    
    def generate_documentation(self, implementation: dict, analysis: dict, args) -> dict:
        """Generate documentation for the implementation"""
        print("📚 GENERATING DOCUMENTATION")
        print("=" * 50)
        
        try:
            docs_result = self.automator.generate_documentation(implementation, analysis)
            self.log_session_event("docs_complete", docs_result)
            
            print("✅ DOCUMENTATION GENERATED")
            print("-" * 30)
            
            if docs_result.get('files_created'):
                print("📄 Documentation files:")
                for doc_file in docs_result['files_created']:
                    print(f"    📝 {doc_file}")
            
            print()
            return docs_result
            
        except Exception as e:
            print(f"❌ Documentation generation failed: {e}")
            if args.debug:
                traceback.print_exc()
            self.log_session_event("docs_failed", {"error": str(e)})
            return {"status": "failed", "error": str(e)}
    
    def save_session_log(self):
        """Save session log for debugging and analysis"""
        log_file = self.project_root / f"automation_session_{self.session_id}.json"
        
        try:
            with open(log_file, 'w', encoding='utf-8') as f:
                json.dump({
                    "session_id": self.session_id,
                    "started_at": self.session_log[0]["timestamp"] if self.session_log else None,
                    "completed_at": datetime.now().isoformat(),
                    "events": self.session_log
                }, f, indent=2)
            
            print(f"📋 Session log saved: {log_file}")
        except Exception as e:
            print(f"⚠️  Failed to save session log: {e}")
    
    def print_summary(self, results: dict):
        """Print final summary of the automation session"""
        print("\n" + "=" * 70)
        print("🎯 AUTOMATION SUMMARY")
        print("=" * 70)
        
        # Overall status
        overall_success = all(
            result.get("status") in ["success", "completed", "skipped"]
            for result in results.values()
        )
        
        status_icon = "🎉" if overall_success else "⚠️"
        status_text = "SUCCESS" if overall_success else "COMPLETED WITH ISSUES"
        
        print(f"{status_icon} Overall Status: {status_text}")
        print()
        
        # Phase results
        phases = [
            ("Analysis", "analysis"),
            ("Implementation", "implementation"),
            ("Testing", "testing"),
            ("Git Commit", "commit"),
            ("Deployment", "deployment"),
            ("Documentation", "documentation")
        ]
        
        for phase_name, phase_key in phases:
            if phase_key in results:
                result = results[phase_key]
                status = result.get("status", "unknown")
                
                if status == "success" or status == "completed":
                    icon = "✅"
                elif status == "skipped":
                    icon = "⏭️"
                elif status == "failed":
                    icon = "❌"
                else:
                    icon = "⚠️"
                
                print(f"{icon} {phase_name}: {status.title()}")
        
        print("\n" + "=" * 70)
        print(f"🕒 Session ID: {self.session_id}")
        print(f"📁 Project: {self.project_root.name}")
        print(f"⏱️  Duration: {datetime.now().strftime('%H:%M:%S')}")
        print("=" * 70)
    
    def main(self):
        """Main CLI entry point"""
        parser = argparse.ArgumentParser(
            description="Prism Auto Complete - Full-Stack Development Automation",
            formatter_class=argparse.RawDescriptionHelpFormatter,
            epilog="""
Examples:
  python prism_auto_complete.py "create a new about page with team information"
  python prism_auto_complete.py "fix the mobile navigation menu" --skip-deploy
  python prism_auto_complete.py "add a contact form with validation" --analyze-only
  python prism_auto_complete.py "enhance the homepage with animations" --auto-confirm
            """
        )
        
        parser.add_argument("request", help="Natural language description of what to implement")
        parser.add_argument("--analyze-only", action="store_true", help="Only analyze the request, don't implement")
        parser.add_argument("--skip-tests", action="store_true", help="Skip running tests")
        parser.add_argument("--skip-commit", action="store_true", help="Skip git commit")
        parser.add_argument("--skip-deploy", action="store_true", help="Skip deployment")
        parser.add_argument("--auto-confirm", action="store_true", help="Auto-confirm implementation without user prompt")
        parser.add_argument("--force", action="store_true", help="Force implementation without backups")
        parser.add_argument("--debug", action="store_true", help="Enable debug output")
        parser.add_argument("--project-root", help="Override project root directory")
        
        args = parser.parse_args()
        
        # Override project root if specified
        if args.project_root:
            self.project_root = Path(args.project_root).resolve()
        
        # Initialize
        self.print_banner()
        self.print_project_info()
        
        if not self.setup_automator(args):
            sys.exit(1)
        
        # Track results
        results = {}
        
        try:
            # Phase 1: Analyze Request
            analysis = self.analyze_request(args.request, args)
            if not analysis:
                sys.exit(1)
            results["analysis"] = analysis
            
            # Stop here if analyze-only
            if args.analyze_only:
                print("✅ Analysis complete (--analyze-only flag)")
                self.save_session_log()
                return
            
            # Phase 2: Confirm Implementation
            if not self.confirm_implementation(analysis, args):
                self.save_session_log()
                return
            
            # Phase 3: Implement
            implementation = self.implement_request(analysis, args)
            if not implementation:
                sys.exit(1)
            results["implementation"] = implementation
            
            # Phase 4: Test
            test_results = self.run_tests(implementation, args)
            results["testing"] = test_results
            
            # Phase 5: Commit
            commit_results = self.commit_changes(implementation, analysis, args)
            results["commit"] = commit_results
            
            # Phase 6: Deploy
            deploy_results = self.deploy_changes(args)
            results["deployment"] = deploy_results
            
            # Phase 7: Documentation
            if self.automator.config.get("automation", {}).get("generate_docs", True):
                docs_results = self.generate_documentation(implementation, analysis, args)
                results["documentation"] = docs_results
            
            # Final summary
            self.print_summary(results)
            
        except KeyboardInterrupt:
            print("\n❌ Automation cancelled by user")
            results["status"] = "cancelled"
        except Exception as e:
            print(f"\n❌ Automation failed: {e}")
            if args.debug:
                traceback.print_exc()
            results["status"] = "failed"
            sys.exit(1)
        finally:
            self.save_session_log()

if __name__ == "__main__":
    cli = PrismAutoComplete()
    cli.main()
