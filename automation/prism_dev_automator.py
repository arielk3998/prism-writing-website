#!/usr/bin/env python3
"""
Prism Writing Development Automation Tool

This tool automates the entire development workflow from feature request 
to deployment, including:
- Project analysis and planning
- Code generation and implementation
- Testing and quality assurance
- Git operations and deployment
- Documentation generation
"""

import os
import sys
import json
import subprocess
import argparse
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional
import yaml

# Import enhanced modules
from enhanced_ai_integration import PrismAIAssistant
from file_operations import PrismFileOperations
from test_runner import PrismTestRunner

class PrismDevAutomator:
    """Main automation orchestrator for Prism Writing development"""
    
    def __init__(self, project_root: str = "."):
        self.project_root = Path(project_root).resolve()
        self.config_file = self.project_root / "automation-config.yaml"
        self.log_file = self.project_root / "automation.log"
        self.config = self.load_config()
        
        # Initialize enhanced modules
        self.ai_assistant = PrismAIAssistant(self.config.get("ai_assistant", {}), str(self.project_root))
        self.file_ops = PrismFileOperations(str(self.project_root))
        
    def load_config(self) -> Dict:
        """Load automation configuration"""
        default_config = {
            "project": {
                "name": "prism-writing-website",
                "type": "nextjs",
                "framework": "react-typescript"
            },
            "automation": {
                "auto_commit": True,
                "auto_deploy": True,
                "run_tests": True,
                "generate_docs": True
            },
            "git": {
                "main_branch": "master",
                "auto_push": False
            },
            "deployment": {
                "platform": "vercel",
                "production_url": "https://prismwriting.com",
                "staging_url": "https://prism-writing-website-staging.vercel.app"
            },
            "ai_assistant": {
                "model": "claude-3.5-sonnet",
                "max_iterations": 10,
                "confidence_threshold": 0.8
            }
        }
        
        if self.config_file.exists():
            with open(self.config_file, 'r') as f:
                config = yaml.safe_load(f)
                # Merge with defaults
                return {**default_config, **config}
        else:
            # Create default config
            with open(self.config_file, 'w') as f:
                yaml.dump(default_config, f, default_flow_style=False)
            return default_config
    
    def log(self, message: str, level: str = "INFO"):
        """Log messages with timestamp"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_entry = f"[{timestamp}] {level}: {message}"
        print(log_entry)
        
        with open(self.log_file, 'a') as f:
            f.write(log_entry + "\n")
    
    def run_command(self, command: str, capture_output: bool = True) -> subprocess.CompletedProcess:
        """Execute shell command with logging"""
        self.log(f"Executing: {command}")
        
        try:
            result = subprocess.run(
                command,
                shell=True,
                cwd=self.project_root,
                capture_output=capture_output,
                text=True,
                check=True
            )
            if result.stdout:
                self.log(f"Output: {result.stdout.strip()}")
            return result
        except subprocess.CalledProcessError as e:
            self.log(f"Command failed: {e}", "ERROR")
            if e.stdout:
                self.log(f"STDOUT: {e.stdout}", "ERROR")
            if e.stderr:
                self.log(f"STDERR: {e.stderr}", "ERROR")
            raise
    
    def analyze_request(self, request: str) -> Dict:
        """Analyze user request and create implementation plan using enhanced AI"""
        self.log("Analyzing request...")
        
        # Use enhanced AI assistant for analysis
        analysis = self.ai_assistant.analyze_request(request)
        analysis["timestamp"] = datetime.now().isoformat()
        
        # Save analysis for reference
        analysis_file = self.project_root / f"analysis_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(analysis_file, 'w') as f:
            json.dump(analysis, f, indent=2)
        
        self.log(f"Analysis complete. Type: {analysis['type']}, Complexity: {analysis['complexity']}")
        return analysis
    
    def classify_request(self, request: str) -> str:
        """Classify the type of request"""
        request_lower = request.lower()
        
        if any(keyword in request_lower for keyword in ['new page', 'create page', 'add page']):
            return "new_page"
        elif any(keyword in request_lower for keyword in ['component', 'widget', 'ui']):
            return "component"
        elif any(keyword in request_lower for keyword in ['fix', 'bug', 'error', 'issue']):
            return "bugfix"
        elif any(keyword in request_lower for keyword in ['enhance', 'improve', 'update', 'modify']):
            return "enhancement"
        elif any(keyword in request_lower for keyword in ['style', 'css', 'design', 'theme']):
            return "styling"
        elif any(keyword in request_lower for keyword in ['api', 'backend', 'server']):
            return "backend"
        elif any(keyword in request_lower for keyword in ['deploy', 'release', 'publish']):
            return "deployment"
        else:
            return "general"
    
    def identify_components(self, request: str) -> List[str]:
        """Identify React components that need to be created or modified"""
        components = []
        request_lower = request.lower()
        
        # Common component patterns
        component_keywords = {
            'navigation': 'Navigation',
            'header': 'Header',
            'footer': 'Footer',
            'modal': 'Modal',
            'card': 'Card',
            'button': 'Button',
            'form': 'Form',
            'portfolio': 'Portfolio',
            'gallery': 'Gallery',
            'slider': 'Slider',
            'carousel': 'Carousel'
        }
        
        for keyword, component in component_keywords.items():
            if keyword in request_lower:
                components.append(component)
        
        return components
    
    def identify_files(self, request: str) -> List[str]:
        """Identify files that likely need modification"""
        files = []
        request_lower = request.lower()
        
        # Page-specific files
        if 'home' in request_lower or 'landing' in request_lower:
            files.append('src/app/page.tsx')
        if 'about' in request_lower:
            files.append('src/app/about/page.tsx')
        if 'contact' in request_lower:
            files.append('src/app/contact/page.tsx')
        if 'portfolio' in request_lower:
            files.append('src/app/portfolio/page.tsx')
        if 'services' in request_lower:
            files.append('src/app/services/page.tsx')
        if 'pricing' in request_lower:
            files.append('src/app/pricing/page.tsx')
        
        # Configuration files
        if any(keyword in request_lower for keyword in ['config', 'settings', 'site']):
            files.append('src/config/siteConfig.ts')
        
        # Styling files
        if any(keyword in request_lower for keyword in ['style', 'css', 'theme']):
            files.append('tailwind.config.ts')
            files.append('src/app/globals.css')
        
        return files
    
    def identify_dependencies(self, request: str) -> List[str]:
        """Identify npm packages that might be needed"""
        dependencies = []
        request_lower = request.lower()
        
        dependency_map = {
            'animation': ['framer-motion', 'react-spring'],
            'form': ['react-hook-form', '@hookform/resolvers', 'zod'],
            'icons': ['lucide-react', 'react-icons'],
            'date': ['date-fns', 'dayjs'],
            'chart': ['recharts', 'chart.js'],
            'markdown': ['react-markdown', 'remark-gfm'],
            'email': ['nodemailer', '@sendgrid/mail'],
            'validation': ['zod', 'yup']
        }
        
        for keyword, deps in dependency_map.items():
            if keyword in request_lower:
                dependencies.extend(deps)
        
        return list(set(dependencies))  # Remove duplicates
    
    def plan_testing(self, request: str) -> Dict:
        """Plan testing strategy based on request"""
        return {
            "unit_tests": "component" in self.classify_request(request),
            "integration_tests": "api" in request.lower(),
            "e2e_tests": "page" in self.classify_request(request),
            "accessibility_tests": "ui" in request.lower(),
            "performance_tests": "performance" in request.lower()
        }
    
    def assess_deployment_impact(self, request: str) -> Dict:
        """Assess deployment impact and strategy"""
        request_type = self.classify_request(request)
        
        impact_levels = {
            "new_page": "medium",
            "component": "low",
            "bugfix": "low",
            "enhancement": "medium",
            "styling": "low",
            "backend": "high",
            "deployment": "high"
        }
        
        return {
            "impact_level": impact_levels.get(request_type, "medium"),
            "requires_staging": request_type in ["backend", "deployment"],
            "breaking_changes": "breaking" in request.lower(),
            "rollback_plan": request_type in ["backend", "deployment"]
        }
    
    def implement_request(self, analysis: Dict) -> Dict:
        """Implement the analyzed request using enhanced AI and file operations"""
        self.log("Starting implementation...")
        
        implementation = {
            "started_at": datetime.now().isoformat(),
            "analysis": analysis,
            "steps": [],
            "files_created": [],
            "files_modified": [],
            "dependencies_installed": [],
            "status": "in_progress",
            "errors": [],
            "warnings": []
        }
        
        try:
            # Install dependencies if needed
            if analysis["dependencies"]:
                self.log(f"Installing dependencies: {', '.join(analysis['dependencies'])}")
                dep_result = self.install_dependencies(analysis["dependencies"])
                implementation["dependencies_installed"] = analysis["dependencies"]
                if not dep_result.get("success", True):
                    implementation["warnings"].append("Some dependencies may have failed to install")
            
            # Execute implementation plan
            implementation_plan = analysis.get("implementation_plan", [])
            
            for step in implementation_plan:
                self.log(f"Executing step {step['step']}: {step['description']}")
                
                step_result = self.execute_implementation_step(step, analysis)
                implementation["steps"].append({
                    **step,
                    "result": step_result,
                    "executed_at": datetime.now().isoformat()
                })
                
                # Aggregate results
                if step_result.get("files_created"):
                    implementation["files_created"].extend(step_result["files_created"])
                if step_result.get("files_modified"):
                    implementation["files_modified"].extend(step_result["files_modified"])
                if step_result.get("errors"):
                    implementation["errors"].extend(step_result["errors"])
                if step_result.get("warnings"):
                    implementation["warnings"].extend(step_result["warnings"])
                
                # Stop on critical errors
                if step_result.get("status") == "failed" and step_result.get("critical", False):
                    implementation["status"] = "failed"
                    break
            
            # Validate implementation
            if implementation["status"] != "failed":
                validation_result = self.validate_implementation(implementation)
                if validation_result["valid"]:
                    implementation["status"] = "completed"
                else:
                    implementation["status"] = "completed_with_warnings"
                    implementation["warnings"].extend(validation_result["issues"])
            
            implementation["completed_at"] = datetime.now().isoformat()
            
        except Exception as e:
            implementation["status"] = "failed"
            implementation["error"] = str(e)
            self.log(f"Implementation failed: {e}", "ERROR")
            raise
        
        return implementation
    
    def execute_implementation_step(self, step: Dict, analysis: Dict) -> Dict:
        """Execute a single implementation step"""
        action = step.get("action", "unknown")
        result = {
            "status": "success",
            "files_created": [],
            "files_modified": [],
            "errors": [],
            "warnings": []
        }
        
        try:
            if action == "create_page_structure":
                result = self.create_page_structure(step, analysis)
            elif action == "create_components":
                result = self.create_components(step, analysis)
            elif action == "update_navigation":
                result = self.update_navigation(step, analysis)
            elif action == "add_metadata":
                result = self.add_metadata(step, analysis)
            elif action == "create_component":
                result = self.create_single_component(step, analysis)
            elif action == "integrate_component":
                result = self.integrate_component(step, analysis)
            else:
                result = self.execute_generic_step(step, analysis)
                
        except Exception as e:
            result["status"] = "failed"
            result["errors"].append(str(e))
            self.log(f"Step execution failed: {e}", "ERROR")
        
        return result
    
    def create_page_structure(self, step: Dict, analysis: Dict) -> Dict:
        """Create the main page structure"""
        result = {"status": "success", "files_created": [], "errors": []}
        
        page_name = self.ai_assistant.extract_page_name(analysis["request"])
        if not page_name:
            page_name = "new-page"
        
        # Generate page code
        page_context = {
            "page_name": page_name.replace('-', ' ').title().replace(' ', ''),
            "description": analysis["request"]
        }
        
        page_code = self.ai_assistant.generate_code("page", analysis["request"], page_context)
        
        # Create the page file
        page_file = f"src/app/{page_name}/page.tsx"
        file_result = self.file_ops.create_file(page_file, page_code)
        
        if file_result["status"] == "success":
            result["files_created"].append(page_file)
            self.log(f"Created page: {page_file}")
        else:
            result["status"] = "failed"
            result["errors"].append(f"Failed to create page: {file_result['error']}")
        
        return result
    
    def create_components(self, step: Dict, analysis: Dict) -> Dict:
        """Create component files"""
        result = {"status": "success", "files_created": [], "errors": []}
        
        components = analysis.get("components_needed", [])
        
        for component_name in components:
            component_context = {
                "component_name": component_name,
                "description": analysis["request"]
            }
            
            component_code = self.ai_assistant.generate_code("component", analysis["request"], component_context)
            
            # Create component file
            component_file = f"src/components/{component_name.lower()}/{component_name}.tsx"
            file_result = self.file_ops.create_file(component_file, component_code)
            
            if file_result["status"] == "success":
                result["files_created"].append(component_file)
                self.log(f"Created component: {component_file}")
            else:
                result["errors"].append(f"Failed to create component {component_name}: {file_result['error']}")
        
        if result["errors"]:
            result["status"] = "partial_success"
        
        return result
    
    def validate_implementation(self, implementation: Dict) -> Dict:
        """Validate the implementation results"""
        validation = {
            "valid": True,
            "issues": [],
            "file_validations": []
        }
        
        # Validate created files
        for file_path in implementation.get("files_created", []):
            if file_path.endswith('.tsx') or file_path.endswith('.ts'):
                file_validation = self.file_ops.validate_typescript_syntax(file_path)
                validation["file_validations"].append({
                    "file": file_path,
                    "validation": file_validation
                })
                
                if not file_validation["valid"]:
                    validation["valid"] = False
                    validation["issues"].extend([
                        f"{file_path}: {error}" for error in file_validation["errors"]
                    ])
                
                if file_validation["warnings"]:
                    validation["issues"].extend([
                        f"{file_path}: {warning}" for warning in file_validation["warnings"]
                    ])
        
        return validation
        
        return implementation
    
    def install_dependencies(self, dependencies: List[str]):
        """Install npm dependencies"""
        if not dependencies:
            return
        
        self.log(f"Installing dependencies: {', '.join(dependencies)}")
        for dep in dependencies:
            self.run_command(f"npm install {dep}")
    
    def create_new_page(self, analysis: Dict) -> Dict:
        """Create a new page based on analysis"""
        # This would integrate with AI assistant to generate page content
        return {
            "action": "create_page",
            "details": "Page creation would be handled by AI assistant"
        }
    
    def create_component(self, analysis: Dict) -> Dict:
        """Create a new component based on analysis"""
        return {
            "action": "create_component",
            "details": "Component creation would be handled by AI assistant"
        }
    
    def enhance_existing(self, analysis: Dict) -> Dict:
        """Enhance existing functionality"""
        return {
            "action": "enhance",
            "details": "Enhancement would be handled by AI assistant"
        }
    
    def fix_issue(self, analysis: Dict) -> Dict:
        """Fix identified issues"""
        return {
            "action": "bugfix",
            "details": "Bug fixing would be handled by AI assistant"
        }
    
    def update_styles(self, analysis: Dict) -> Dict:
        """Update styling and design"""
        return {
            "action": "styling",
            "details": "Styling updates would be handled by AI assistant"
        }
    
    def run_tests(self) -> Dict:
        """Run test suite"""
        self.log("Running tests...")
        
        test_results = {
            "started_at": datetime.now().isoformat(),
            "tests": {}
        }
        
        try:
            # Build test
            self.log("Running build test...")
            build_result = self.run_command("npm run build")
            test_results["tests"]["build"] = {
                "status": "passed",
                "output": build_result.stdout
            }
            
            # Lint test
            if (self.project_root / "eslint.config.js").exists():
                self.log("Running lint test...")
                lint_result = self.run_command("npm run lint")
                test_results["tests"]["lint"] = {
                    "status": "passed",
                    "output": lint_result.stdout
                }
            
            # Type check
            if (self.project_root / "tsconfig.json").exists():
                self.log("Running type check...")
                type_result = self.run_command("npx tsc --noEmit")
                test_results["tests"]["types"] = {
                    "status": "passed",
                    "output": type_result.stdout
                }
            
            test_results["overall_status"] = "passed"
            
        except subprocess.CalledProcessError as e:
            test_results["overall_status"] = "failed"
            test_results["error"] = str(e)
            self.log(f"Tests failed: {e}", "ERROR")
            
        test_results["completed_at"] = datetime.now().isoformat()
        return test_results
    
    def commit_changes(self, implementation: Dict, analysis: Dict) -> Dict:
        """Commit changes to git with descriptive message"""
        if not self.config["automation"]["auto_commit"]:
            self.log("Auto-commit disabled, skipping...")
            return {"status": "skipped"}
        
        self.log("Committing changes...")
        
        try:
            # Check if there are changes to commit
            status_result = self.run_command("git status --porcelain")
            if not status_result.stdout.strip():
                return {
                    "status": "skipped",
                    "message": "No changes to commit"
                }
            
            # Add all changes (excluding .next and other ignored files)
            self.run_command("git add .")
            
            # Generate commit message
            commit_message = self.generate_commit_message(implementation, analysis)
            
            # Commit changes
            commit_result = self.run_command(f'git commit -m "{commit_message}"')
            
            # Get commit hash
            hash_result = self.run_command("git rev-parse HEAD")
            commit_hash = hash_result.stdout.strip()
            
            return {
                "status": "success",
                "commit_hash": commit_hash,
                "message": commit_message,
                "files_committed": implementation.get("files_created", []) + implementation.get("files_modified", [])
            }
            
        except subprocess.CalledProcessError as e:
            self.log(f"Git commit failed: {e}", "ERROR")
            return {
                "status": "failed",
                "error": str(e)
            }
    
    def generate_commit_message(self, implementation: Dict, analysis: Dict) -> str:
        """Generate descriptive commit message"""
        request_type = analysis.get("type", "general")
        request = analysis.get("request", "")
        
        # Get commit prefix from config
        prefix = self.config.get("git", {}).get("commit_message_prefix", "feat")
        
        # Generate appropriate message based on type
        if request_type == "new_page":
            page_name = self.ai_assistant.extract_page_name(request) or "new-page"
            message = f"{prefix}: add {page_name} page"
        elif request_type == "component":
            components = analysis.get("components_needed", [])
            if components:
                message = f"{prefix}: add {', '.join(components[:2])} component{'s' if len(components) > 1 else ''}"
            else:
                message = f"{prefix}: add new component"
        elif request_type == "bugfix":
            message = f"fix: {request[:50]}{'...' if len(request) > 50 else ''}"
        elif request_type == "enhancement":
            message = f"{prefix}: {request[:50]}{'...' if len(request) > 50 else ''}"
        elif request_type == "styling":
            message = f"style: {request[:50]}{'...' if len(request) > 50 else ''}"
        else:
            message = f"{prefix}: {request[:50]}{'...' if len(request) > 50 else ''}"
        
        # Add file count info
        files_created = len(implementation.get("files_created", []))
        files_modified = len(implementation.get("files_modified", []))
        
        if files_created > 0 or files_modified > 0:
            message += f" ({files_created} new, {files_modified} modified)"
        
        return message
    
    def generate_documentation(self, implementation: Dict, analysis: Dict) -> Dict:
        """Generate documentation for the implementation"""
        if not self.config["automation"]["generate_docs"]:
            self.log("Documentation generation disabled, skipping...")
            return {"status": "skipped"}
        
        self.log("Generating documentation...")
        
        try:
            docs_content = self.create_implementation_docs(implementation, analysis)
            
            # Create documentation file
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            docs_filename = f"implementation_{timestamp}.md"
            docs_path = self.project_root / "docs" / "implementations" / docs_filename
            
            # Ensure docs directory exists
            docs_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Write documentation
            with open(docs_path, 'w', encoding='utf-8') as f:
                f.write(docs_content)
            
            # Update main README if needed
            self.update_readme_with_implementation(implementation, analysis)
            
            return {
                "status": "success",
                "files_created": [str(docs_path.relative_to(self.project_root))],
                "documentation_path": str(docs_path)
            }
            
        except Exception as e:
            self.log(f"Documentation generation failed: {e}", "ERROR")
            return {
                "status": "failed",
                "error": str(e)
            }
    
    def create_implementation_docs(self, implementation: Dict, analysis: Dict) -> str:
        """Create markdown documentation for the implementation"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        docs = f"""# Implementation Documentation

## Overview
- **Request**: {analysis.get('request', 'Unknown')}
- **Type**: {analysis.get('type', 'Unknown')}
- **Complexity**: {analysis.get('complexity', 'Unknown')}
- **Implemented**: {timestamp}
- **Status**: {implementation.get('status', 'Unknown')}

## Analysis Results

### Components Created
{chr(10).join([f"- {comp}" for comp in analysis.get('components_needed', [])]) or "None"}

### Files Created
{chr(10).join([f"- `{file}`" for file in implementation.get('files_created', [])]) or "None"}

### Files Modified
{chr(10).join([f"- `{file}`" for file in implementation.get('files_modified', [])]) or "None"}

### Dependencies Installed
{chr(10).join([f"- {dep}" for dep in implementation.get('dependencies_installed', [])]) or "None"}

## Implementation Steps

"""
        
        # Add implementation steps
        for step in implementation.get('steps', []):
            docs += f"""### Step {step.get('step', '?')}: {step.get('description', 'Unknown')}
- **Action**: {step.get('action', 'Unknown')}
- **Status**: {step.get('result', {}).get('status', 'Unknown')}

"""
        
        # Add testing results
        docs += """## Testing Results

> Testing results will be available after test execution.

## Deployment Information

> Deployment information will be available after deployment.

## Notes

This documentation was automatically generated by Prism Auto.
"""
        
        return docs
    
    def update_readme_with_implementation(self, implementation: Dict, analysis: Dict):
        """Update project README with implementation info"""
        try:
            readme_path = self.project_root / "README.md"
            
            if readme_path.exists():
                with open(readme_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Add implementation to changelog section
                timestamp = datetime.now().strftime("%Y-%m-%d")
                entry = f"- **{timestamp}**: {analysis.get('request', 'Implementation')}\n"
                
                # Look for changelog section or create one
                if "## Changelog" in content:
                    content = content.replace(
                        "## Changelog\n",
                        f"## Changelog\n{entry}"
                    )
                else:
                    content += f"\n\n## Changelog\n{entry}"
                
                with open(readme_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                    
        except Exception as e:
            self.log(f"Failed to update README: {e}", "WARNING")

    def update_navigation(self, step: Dict, analysis: Dict) -> Dict:
        """Update navigation to include new pages"""
        result = {"status": "success", "files_modified": [], "errors": []}
        
        try:
            page_name = self.ai_assistant.extract_page_name(analysis["request"])
            if not page_name:
                return result
            
            # Check if Header component exists
            header_path = "src/components/layout/Header.tsx"
            if self.file_ops.file_exists(header_path):
                # Read current header content
                header_content = self.file_ops.read_file(header_path)
                
                if header_content and page_name.lower() not in header_content.lower():
                    # Add navigation item
                    page_title = page_name.replace('-', ' ').title()
                    nav_item = f'''          <Link href="/{page_name}" className="hover:text-purple-600 transition-colors">
            {page_title}
          </Link>'''
                    
                    # Insert after existing nav items
                    modifications = [{
                        "type": "insert_before",
                        "pattern": "</nav>",
                        "content": nav_item
                    }]
                    
                    modify_result = self.file_ops.modify_file(header_path, modifications)
                    if modify_result["status"] == "success":
                        result["files_modified"].append(header_path)
                        self.log(f"Updated navigation in {header_path}")
                    else:
                        result["errors"].append(f"Failed to update navigation: {modify_result['error']}")
            
        except Exception as e:
            result["status"] = "failed"
            result["errors"].append(str(e))
        
        return result
    
    def add_metadata(self, step: Dict, analysis: Dict) -> Dict:
        """Add metadata and layout for new pages"""
        result = {"status": "success", "files_created": [], "errors": []}
        
        try:
            page_name = self.ai_assistant.extract_page_name(analysis["request"])
            if not page_name:
                return result
            
            # Generate layout code
            layout_context = {
                "page_name": page_name,
                "description": analysis["request"]
            }
            
            layout_code = self.ai_assistant.generate_code("layout", analysis["request"], layout_context)
            
            # Create layout file
            layout_file = f"src/app/{page_name}/layout.tsx"
            file_result = self.file_ops.create_file(layout_file, layout_code, backup_existing=False)
            
            if file_result["status"] == "success":
                result["files_created"].append(layout_file)
                self.log(f"Created layout: {layout_file}")
            else:
                result["errors"].append(f"Failed to create layout: {file_result['error']}")
        
        except Exception as e:
            result["status"] = "failed"
            result["errors"].append(str(e))
        
        return result
    
    def create_single_component(self, step: Dict, analysis: Dict) -> Dict:
        """Create a single component (used for component-type requests)"""
        return self.create_components(step, analysis)
    
    def integrate_component(self, step: Dict, analysis: Dict) -> Dict:
        """Integrate component into relevant pages"""
        result = {"status": "success", "files_modified": [], "errors": []}
        
        try:
            components = analysis.get("components_needed", [])
            if not components:
                return result
            
            # Default to integrating into homepage
            homepage_path = "src/app/page.tsx"
            
            if self.file_ops.file_exists(homepage_path):
                homepage_content = self.file_ops.read_file(homepage_path)
                
                # Add import and usage for each component
                for component_name in components:
                    if component_name.lower() not in homepage_content.lower():
                        # Add import
                        import_line = f"import {component_name} from '../components/{component_name.lower()}/{component_name}'"
                        
                        # Add component usage
                        component_usage = f"        <{component_name} />"
                        
                        modifications = [
                            {
                                "type": "insert_after",
                                "pattern": "import",
                                "content": import_line
                            },
                            {
                                "type": "insert_before",
                                "pattern": "</div>",
                                "content": component_usage
                            }
                        ]
                        
                        modify_result = self.file_ops.modify_file(homepage_path, modifications)
                        if modify_result["status"] == "success":
                            result["files_modified"].append(homepage_path)
                            self.log(f"Integrated {component_name} into homepage")
                        else:
                            result["errors"].append(f"Failed to integrate {component_name}: {modify_result['error']}")
        
        except Exception as e:
            result["status"] = "failed"
            result["errors"].append(str(e))
        
        return result
    
    def execute_generic_step(self, step: Dict, analysis: Dict) -> Dict:
        """Execute a generic implementation step"""
        result = {
            "status": "success",
            "files_created": [],
            "files_modified": [],
            "errors": [],
            "warnings": ["Generic step execution - manual review recommended"]
        }
        
        self.log(f"Executing generic step: {step.get('description', 'Unknown')}")
        
        # For generic steps, create placeholder files based on the description
        action = step.get("action", "unknown")
        files = step.get("files", [])
        
        for file_path in files:
            if not self.file_ops.file_exists(file_path):
                # Create placeholder content
                placeholder_content = f"""// TODO: Implement {action} for {analysis.get('request', '')}
// This file was auto-generated and needs manual implementation

export default function Placeholder() {{
  return (
    <div>
      <h2>Implementation Needed</h2>
      <p>Action: {action}</p>
      <p>Description: {step.get('description', '')}</p>
    </div>
  )
}}
"""
                
                file_result = self.file_ops.create_file(file_path, placeholder_content)
                if file_result["status"] == "success":
                    result["files_created"].append(file_path)
                else:
                    result["errors"].append(f"Failed to create {file_path}: {file_result['error']}")
        
        return result
