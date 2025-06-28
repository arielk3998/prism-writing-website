#!/usr/bin/env python3
"""
Test Runner for Prism Writing Development Automation

This module handles all testing aspects including build tests, syntax validation,
and integration testing for the automated development workflow.
"""

import subprocess
import json
from pathlib import Path
from typing import Dict, List, Optional
from datetime import datetime

class PrismTestRunner:
    """Test runner for development automation"""
    
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        
    def run_all_tests(self, config: Dict) -> Dict:
        """Run all configured tests"""
        test_config = config.get("testing", {})
        results = {
            "started_at": datetime.now().isoformat(),
            "overall_status": "success",
            "tests_run": [],
            "failures": [],
            "warnings": []
        }
        
        try:
            # Build test
            if test_config.get("build_test", True):
                build_result = self.run_build_test()
                results["tests_run"].append({
                    "name": "build_test",
                    "result": build_result
                })
                if build_result["status"] != "success":
                    results["overall_status"] = "failed"
                    results["failures"].append("Build test failed")
            
            # Type check
            if test_config.get("type_check", True):
                type_result = self.run_type_check()
                results["tests_run"].append({
                    "name": "type_check",
                    "result": type_result
                })
                if type_result["status"] != "success":
                    results["overall_status"] = "failed"
                    results["failures"].append("Type check failed")
            
            # Lint test
            if test_config.get("lint_test", True):
                lint_result = self.run_lint_test()
                results["tests_run"].append({
                    "name": "lint_test",
                    "result": lint_result
                })
                if lint_result["status"] != "success":
                    results["warnings"].append("Lint test had issues")
            
            # Unit tests (if configured)
            if test_config.get("unit_tests", False):
                unit_result = self.run_unit_tests()
                results["tests_run"].append({
                    "name": "unit_tests",
                    "result": unit_result
                })
                if unit_result["status"] != "success":
                    results["overall_status"] = "failed"
                    results["failures"].append("Unit tests failed")
            
            # E2E tests (if configured)
            if test_config.get("e2e_tests", False):
                e2e_result = self.run_e2e_tests()
                results["tests_run"].append({
                    "name": "e2e_tests",
                    "result": e2e_result
                })
                if e2e_result["status"] != "success":
                    results["warnings"].append("E2E tests had issues")
            
        except Exception as e:
            results["overall_status"] = "failed"
            results["failures"].append(f"Test runner error: {e}")
        
        results["completed_at"] = datetime.now().isoformat()
        return results
    
    def run_build_test(self) -> Dict:
        """Test if the project builds successfully"""
        result = {
            "status": "success",
            "output": "",
            "errors": [],
            "duration": 0
        }
        
        try:
            start_time = datetime.now()
            
            # Run next build
            process = subprocess.run(
                ["npm", "run", "build"],
                cwd=self.project_root,
                capture_output=True,
                text=True,
                timeout=300  # 5 minute timeout
            )
            
            end_time = datetime.now()
            result["duration"] = (end_time - start_time).total_seconds()
            result["output"] = process.stdout
            
            if process.returncode != 0:
                result["status"] = "failed"
                result["errors"].append(process.stderr)
            
        except subprocess.TimeoutExpired:
            result["status"] = "failed"
            result["errors"].append("Build timeout (5 minutes)")
        except Exception as e:
            result["status"] = "failed"
            result["errors"].append(str(e))
        
        return result
    
    def run_type_check(self) -> Dict:
        """Run TypeScript type checking"""
        result = {
            "status": "success",
            "output": "",
            "errors": [],
            "warnings": []
        }
        
        try:
            # Run tsc --noEmit
            process = subprocess.run(
                ["npx", "tsc", "--noEmit"],
                cwd=self.project_root,
                capture_output=True,
                text=True
            )
            
            result["output"] = process.stdout
            
            if process.returncode != 0:
                result["status"] = "failed"
                result["errors"].append(process.stderr)
            
        except Exception as e:
            result["status"] = "failed"
            result["errors"].append(str(e))
        
        return result
    
    def run_lint_test(self) -> Dict:
        """Run ESLint checking"""
        result = {
            "status": "success",
            "output": "",
            "errors": [],
            "warnings": []
        }
        
        try:
            # Check if ESLint is configured
            eslint_config = self.project_root / ".eslintrc.json"
            if not eslint_config.exists():
                result["warnings"].append("ESLint not configured")
                return result
            
            # Run eslint
            process = subprocess.run(
                ["npx", "eslint", "src/", "--ext", ".ts,.tsx"],
                cwd=self.project_root,
                capture_output=True,
                text=True
            )
            
            result["output"] = process.stdout
            
            if process.returncode != 0:
                # ESLint issues found, but not necessarily fatal
                result["warnings"].append("ESLint issues found")
                result["errors"].append(process.stderr)
            
        except Exception as e:
            result["status"] = "failed"
            result["errors"].append(str(e))
        
        return result
    
    def run_unit_tests(self) -> Dict:
        """Run unit tests (Jest/Vitest)"""
        result = {
            "status": "success",
            "output": "",
            "errors": [],
            "test_count": 0,
            "passed": 0,
            "failed": 0
        }
        
        try:
            # Check for test framework
            package_json = self.project_root / "package.json"
            if package_json.exists():
                with open(package_json, 'r') as f:
                    package_data = json.load(f)
                    scripts = package_data.get("scripts", {})
                    
                    if "test" in scripts:
                        process = subprocess.run(
                            ["npm", "test"],
                            cwd=self.project_root,
                            capture_output=True,
                            text=True
                        )
                        
                        result["output"] = process.stdout
                        
                        if process.returncode != 0:
                            result["status"] = "failed"
                            result["errors"].append(process.stderr)
                    else:
                        result["warnings"].append("No test script found in package.json")
            
        except Exception as e:
            result["status"] = "failed"
            result["errors"].append(str(e))
        
        return result
    
    def run_e2e_tests(self) -> Dict:
        """Run end-to-end tests (Playwright/Cypress)"""
        result = {
            "status": "success",
            "output": "",
            "errors": [],
            "warnings": []
        }
        
        try:
            # Check for E2E framework
            package_json = self.project_root / "package.json"
            if package_json.exists():
                with open(package_json, 'r') as f:
                    package_data = json.load(f)
                    deps = {**package_data.get("dependencies", {}), **package_data.get("devDependencies", {})}
                    
                    if "playwright" in deps or "@playwright/test" in deps:
                        # Run Playwright tests
                        process = subprocess.run(
                            ["npx", "playwright", "test"],
                            cwd=self.project_root,
                            capture_output=True,
                            text=True
                        )
                        
                        result["output"] = process.stdout
                        
                        if process.returncode != 0:
                            result["status"] = "failed"
                            result["errors"].append(process.stderr)
                    
                    elif "cypress" in deps:
                        # Run Cypress tests
                        process = subprocess.run(
                            ["npx", "cypress", "run"],
                            cwd=self.project_root,
                            capture_output=True,
                            text=True
                        )
                        
                        result["output"] = process.stdout
                        
                        if process.returncode != 0:
                            result["status"] = "failed"
                            result["errors"].append(process.stderr)
                    
                    else:
                        result["warnings"].append("No E2E framework detected")
            
        except Exception as e:
            result["status"] = "failed"
            result["errors"].append(str(e))
        
        return result
    
    def run_quick_validation(self, files_to_check: List[str]) -> Dict:
        """Run quick validation on specific files"""
        result = {
            "status": "success",
            "file_results": {},
            "errors": [],
            "warnings": []
        }
        
        for file_path in files_to_check:
            file_result = self.validate_file(file_path)
            result["file_results"][file_path] = file_result
            
            if file_result["status"] != "success":
                result["status"] = "failed"
                result["errors"].extend(file_result.get("errors", []))
            
            if file_result.get("warnings"):
                result["warnings"].extend(file_result["warnings"])
        
        return result
    
    def validate_file(self, file_path: str) -> Dict:
        """Validate a single file"""
        full_path = self.project_root / file_path
        result = {
            "status": "success",
            "errors": [],
            "warnings": [],
            "file_type": None
        }
        
        if not full_path.exists():
            result["status"] = "failed"
            result["errors"].append("File does not exist")
            return result
        
        # Determine file type and run appropriate checks
        suffix = full_path.suffix.lower()
        
        if suffix in ['.tsx', '.ts']:
            result["file_type"] = "typescript"
            ts_result = self.validate_typescript_file(file_path)
            result.update(ts_result)
        
        elif suffix in ['.jsx', '.js']:
            result["file_type"] = "javascript"
            js_result = self.validate_javascript_file(file_path)
            result.update(js_result)
        
        elif suffix == '.json':
            result["file_type"] = "json"
            json_result = self.validate_json_file(file_path)
            result.update(json_result)
        
        return result
    
    def validate_typescript_file(self, file_path: str) -> Dict:
        """Validate TypeScript file syntax"""
        result = {
            "status": "success",
            "errors": [],
            "warnings": []
        }
        
        try:
            # Run tsc on specific file
            process = subprocess.run(
                ["npx", "tsc", "--noEmit", file_path],
                cwd=self.project_root,
                capture_output=True,
                text=True
            )
            
            if process.returncode != 0:
                result["status"] = "failed"
                result["errors"].append(process.stderr)
            
        except Exception as e:
            result["status"] = "failed"
            result["errors"].append(str(e))
        
        return result
    
    def validate_javascript_file(self, file_path: str) -> Dict:
        """Validate JavaScript file syntax"""
        result = {
            "status": "success",
            "errors": [],
            "warnings": []
        }
        
        # Basic syntax validation can be added here
        # For now, just check if file is readable
        try:
            full_path = self.project_root / file_path
            with open(full_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Basic checks
            if content.count('{') != content.count('}'):
                result["warnings"].append("Mismatched braces")
            
            if content.count('(') != content.count(')'):
                result["warnings"].append("Mismatched parentheses")
            
        except Exception as e:
            result["status"] = "failed"
            result["errors"].append(str(e))
        
        return result
    
    def validate_json_file(self, file_path: str) -> Dict:
        """Validate JSON file syntax"""
        result = {
            "status": "success",
            "errors": [],
            "warnings": []
        }
        
        try:
            full_path = self.project_root / file_path
            with open(full_path, 'r', encoding='utf-8') as f:
                json.load(f)
        except json.JSONDecodeError as e:
            result["status"] = "failed"
            result["errors"].append(f"Invalid JSON: {e}")
        except Exception as e:
            result["status"] = "failed"
            result["errors"].append(str(e))
        
        return result
