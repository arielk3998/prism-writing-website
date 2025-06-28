#!/usr/bin/env python3
"""
File Operations Module for Prism Writing Development Automation

This module handles all file operations including creation, modification,
backup, and validation for the automation system.
"""

import os
import shutil
from pathlib import Path
from typing import Dict, List, Optional, Tuple
import json
import re
from datetime import datetime

class PrismFileOperations:
    """Enhanced file operations for development automation"""
    
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.backup_dir = self.project_root / ".automation_backups"
        self.backup_dir.mkdir(exist_ok=True)
        
    def create_file(self, file_path: str, content: str, backup_existing: bool = True) -> Dict:
        """Create a new file with content"""
        full_path = self.project_root / file_path
        result = {
            "status": "success",
            "file_path": str(full_path),
            "action": "created",
            "backup_path": None,
            "error": None
        }
        
        try:
            # Create directory if it doesn't exist
            full_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Backup existing file if it exists
            if full_path.exists() and backup_existing:
                backup_path = self.backup_file(full_path)
                result["backup_path"] = str(backup_path)
                result["action"] = "replaced"
            
            # Write the content
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            result["size"] = len(content)
            
        except Exception as e:
            result["status"] = "failed"
            result["error"] = str(e)
        
        return result
    
    def modify_file(self, file_path: str, modifications: List[Dict], backup_existing: bool = True) -> Dict:
        """Modify an existing file with specified changes"""
        full_path = self.project_root / file_path
        result = {
            "status": "success",
            "file_path": str(full_path),
            "action": "modified",
            "backup_path": None,
            "modifications_applied": 0,
            "error": None
        }
        
        try:
            if not full_path.exists():
                result["status"] = "failed"
                result["error"] = "File does not exist"
                return result
            
            # Backup existing file
            if backup_existing:
                backup_path = self.backup_file(full_path)
                result["backup_path"] = str(backup_path)
            
            # Read current content
            with open(full_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Apply modifications
            modified_content = content
            for modification in modifications:
                if modification["type"] == "replace":
                    modified_content = modified_content.replace(
                        modification["search"],
                        modification["replacement"]
                    )
                elif modification["type"] == "insert_after":
                    modified_content = self.insert_after_pattern(
                        modified_content,
                        modification["pattern"],
                        modification["content"]
                    )
                elif modification["type"] == "insert_before":
                    modified_content = self.insert_before_pattern(
                        modified_content,
                        modification["pattern"],
                        modification["content"]
                    )
                elif modification["type"] == "append":
                    modified_content += modification["content"]
                elif modification["type"] == "prepend":
                    modified_content = modification["content"] + modified_content
                
                result["modifications_applied"] += 1
            
            # Write modified content
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(modified_content)
            
        except Exception as e:
            result["status"] = "failed"
            result["error"] = str(e)
        
        return result
    
    def insert_after_pattern(self, content: str, pattern: str, insert_content: str) -> str:
        """Insert content after a specific pattern"""
        lines = content.split('\n')
        new_lines = []
        
        for line in lines:
            new_lines.append(line)
            if pattern in line:
                # Maintain indentation
                indent = len(line) - len(line.lstrip())
                indented_content = '\n'.join([
                    ' ' * indent + line.strip() if line.strip() else ''
                    for line in insert_content.split('\n')
                ])
                new_lines.append(indented_content)
        
        return '\n'.join(new_lines)
    
    def insert_before_pattern(self, content: str, pattern: str, insert_content: str) -> str:
        """Insert content before a specific pattern"""
        lines = content.split('\n')
        new_lines = []
        
        for line in lines:
            if pattern in line:
                # Maintain indentation
                indent = len(line) - len(line.lstrip())
                indented_content = '\n'.join([
                    ' ' * indent + line.strip() if line.strip() else ''
                    for line in insert_content.split('\n')
                ])
                new_lines.append(indented_content)
            new_lines.append(line)
        
        return '\n'.join(new_lines)
    
    def backup_file(self, file_path: Path) -> Path:
        """Create a backup of an existing file"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_name = f"{file_path.name}.{timestamp}.backup"
        backup_path = self.backup_dir / backup_name
        
        shutil.copy2(file_path, backup_path)
        return backup_path
    
    def read_file(self, file_path: str) -> Optional[str]:
        """Read content of a file"""
        full_path = self.project_root / file_path
        
        try:
            if full_path.exists():
                with open(full_path, 'r', encoding='utf-8') as f:
                    return f.read()
        except Exception:
            pass
        
        return None
    
    def file_exists(self, file_path: str) -> bool:
        """Check if a file exists"""
        full_path = self.project_root / file_path
        return full_path.exists()
    
    def list_files(self, directory: str, pattern: str = "*") -> List[str]:
        """List files in a directory matching a pattern"""
        dir_path = self.project_root / directory
        
        if not dir_path.exists():
            return []
        
        files = []
        for file_path in dir_path.glob(pattern):
            if file_path.is_file():
                files.append(str(file_path.relative_to(self.project_root)))
        
        return files
    
    def validate_typescript_syntax(self, file_path: str) -> Dict:
        """Validate TypeScript syntax of a file"""
        full_path = self.project_root / file_path
        result = {
            "valid": True,
            "errors": [],
            "warnings": []
        }
        
        try:
            content = self.read_file(file_path)
            if not content:
                result["valid"] = False
                result["errors"].append("File not found or empty")
                return result
            
            # Basic syntax checks
            # Check for matching braces
            if content.count('{') != content.count('}'):
                result["valid"] = False
                result["errors"].append("Mismatched braces")
            
            # Check for matching parentheses
            if content.count('(') != content.count(')'):
                result["valid"] = False
                result["errors"].append("Mismatched parentheses")
            
            # Check for missing semicolons (basic check)
            lines = content.split('\n')
            for i, line in enumerate(lines, 1):
                stripped = line.strip()
                if (stripped and 
                    not stripped.startswith('//') and 
                    not stripped.startswith('/*') and
                    not stripped.endswith('{') and
                    not stripped.endswith('}') and
                    not stripped.endswith(',') and
                    not stripped.endswith(';') and
                    not stripped.startswith('import') and
                    not stripped.startswith('export') and
                    '=' in stripped):
                    result["warnings"].append(f"Line {i}: Missing semicolon?")
            
            # Check for React import
            if 'React' in content and 'import React' not in content:
                result["warnings"].append("React used but not imported")
            
        except Exception as e:
            result["valid"] = False
            result["errors"].append(f"Validation error: {e}")
        
        return result
    
    def create_directory_structure(self, structure: Dict) -> Dict:
        """Create a nested directory structure"""
        result = {
            "status": "success",
            "directories_created": [],
            "files_created": [],
            "errors": []
        }
        
        try:
            self._create_structure_recursive(structure, self.project_root, result)
        except Exception as e:
            result["status"] = "failed"
            result["errors"].append(str(e))
        
        return result
    
    def _create_structure_recursive(self, structure: Dict, base_path: Path, result: Dict):
        """Recursively create directory structure"""
        for name, value in structure.items():
            current_path = base_path / name
            
            if isinstance(value, dict):
                # It's a directory
                current_path.mkdir(exist_ok=True)
                result["directories_created"].append(str(current_path.relative_to(self.project_root)))
                
                # Recursively create subdirectories and files
                self._create_structure_recursive(value, current_path, result)
            
            elif isinstance(value, str):
                # It's a file with content
                with open(current_path, 'w', encoding='utf-8') as f:
                    f.write(value)
                result["files_created"].append(str(current_path.relative_to(self.project_root)))
    
    def get_file_info(self, file_path: str) -> Dict:
        """Get detailed information about a file"""
        full_path = self.project_root / file_path
        info = {
            "exists": False,
            "size": 0,
            "lines": 0,
            "type": None,
            "last_modified": None
        }
        
        if full_path.exists():
            info["exists"] = True
            info["size"] = full_path.stat().st_size
            info["last_modified"] = datetime.fromtimestamp(full_path.stat().st_mtime).isoformat()
            
            # Determine file type
            suffix = full_path.suffix.lower()
            if suffix in ['.tsx', '.ts']:
                info["type"] = "typescript"
            elif suffix in ['.jsx', '.js']:
                info["type"] = "javascript"
            elif suffix in ['.css', '.scss']:
                info["type"] = "stylesheet"
            elif suffix == '.json':
                info["type"] = "json"
            elif suffix == '.md':
                info["type"] = "markdown"
            else:
                info["type"] = "other"
            
            # Count lines
            try:
                with open(full_path, 'r', encoding='utf-8') as f:
                    info["lines"] = sum(1 for _ in f)
            except Exception:
                pass
        
        return info
    
    def find_imports(self, file_path: str) -> List[str]:
        """Find all imports in a TypeScript/JavaScript file"""
        content = self.read_file(file_path)
        if not content:
            return []
        
        imports = []
        lines = content.split('\n')
        
        for line in lines:
            stripped = line.strip()
            if stripped.startswith('import '):
                imports.append(stripped)
        
        return imports
    
    def find_exports(self, file_path: str) -> List[str]:
        """Find all exports in a TypeScript/JavaScript file"""
        content = self.read_file(file_path)
        if not content:
            return []
        
        exports = []
        lines = content.split('\n')
        
        for line in lines:
            stripped = line.strip()
            if stripped.startswith('export '):
                exports.append(stripped)
        
        return exports
    
    def analyze_dependencies(self, file_path: str) -> Dict:
        """Analyze dependencies used in a file"""
        content = self.read_file(file_path)
        if not content:
            return {"react_imports": [], "external_imports": [], "local_imports": []}
        
        imports = self.find_imports(file_path)
        analysis = {
            "react_imports": [],
            "next_imports": [],
            "external_imports": [],
            "local_imports": []
        }
        
        for import_line in imports:
            if "from 'react'" in import_line or 'from "react"' in import_line:
                analysis["react_imports"].append(import_line)
            elif "from 'next" in import_line or 'from "next' in import_line:
                analysis["next_imports"].append(import_line)
            elif "from './" in import_line or 'from "../' in import_line or 'from "./' in import_line:
                analysis["local_imports"].append(import_line)
            else:
                analysis["external_imports"].append(import_line)
        
        return analysis
