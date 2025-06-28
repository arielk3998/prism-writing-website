#!/usr/bin/env python3
"""
Enhanced AI Integration for Prism Writing Development Automation

This module provides a unified interface for AI-powered code generation,
analysis, and implementation with support for multiple providers.
"""

import os
import json
import re
from pathlib import Path
from typing import Dict, List, Optional, Tuple
import subprocess
import yaml

class PrismAIAssistant:
    """Enhanced AI assistant for development automation"""
    
    def __init__(self, config: Dict, project_root: str):
        self.config = config
        self.project_root = Path(project_root)
        self.context_cache = {}
        
    def analyze_request(self, request: str) -> Dict:
        """Analyze development request and create implementation plan"""
        
        # Get project context
        project_context = self.get_project_context()
        
        # Classify request type
        request_type = self.classify_request(request)
        
        # Generate detailed analysis
        analysis = {
            "request": request,
            "type": request_type,
            "complexity": self.estimate_complexity(request, request_type),
            "components_needed": self.identify_components(request, request_type),
            "files_to_create": self.identify_new_files(request, request_type),
            "files_to_modify": self.identify_existing_files(request, request_type),
            "dependencies": self.identify_dependencies(request, request_type),
            "implementation_plan": self.create_implementation_plan(request, request_type),
            "testing_strategy": self.plan_testing(request, request_type),
            "deployment_considerations": self.assess_deployment_impact(request)
        }
        
        return analysis
    
    def classify_request(self, request: str) -> str:
        """Classify the request type based on keywords and patterns"""
        request_lower = request.lower()
        
        # Page creation patterns - be more generous with detection
        if any(pattern in request_lower for pattern in [
            'new page', 'create page', 'add page', 'page for', 'build page',
            'create a page', 'add a page', 'make a page', 'build a page',
            'create new', 'add new', 'build new'
        ]) and 'page' in request_lower:
            return "new_page"
        
        # Also check for specific page types
        elif any(page_type in request_lower for page_type in [
            'about page', 'contact page', 'services page', 'portfolio page',
            'blog page', 'team page', 'pricing page', 'home page'
        ]):
            return "new_page"
        
        # Component patterns
        elif any(pattern in request_lower for pattern in [
            'component', 'widget', 'element', 'create a', 'add a'
        ]) and 'page' not in request_lower:
            return "component"
        
        # Bug fix patterns
        elif any(pattern in request_lower for pattern in [
            'fix', 'bug', 'error', 'issue', 'problem', 'broken'
        ]):
            return "bugfix"
        
        # Enhancement patterns
        elif any(pattern in request_lower for pattern in [
            'enhance', 'improve', 'update', 'modify', 'change', 'better'
        ]):
            return "enhancement"
        
        # Styling patterns
        elif any(pattern in request_lower for pattern in [
            'style', 'css', 'design', 'theme', 'color', 'layout', 'responsive'
        ]):
            return "styling"
        
        # Backend patterns
        elif any(pattern in request_lower for pattern in [
            'api', 'backend', 'server', 'database', 'endpoint'
        ]):
            return "backend"
        
        return "general"
    
    def estimate_complexity(self, request: str, request_type: str) -> str:
        """Estimate implementation complexity"""
        request_lower = request.lower()
        
        # High complexity indicators
        high_complexity = [
            'authentication', 'database', 'payment', 'complex', 'advanced',
            'integration', 'api', 'backend', 'server', 'security'
        ]
        
        # Medium complexity indicators
        medium_complexity = [
            'form', 'validation', 'interactive', 'dynamic', 'state',
            'multiple', 'several', 'navigation', 'routing'
        ]
        
        if any(keyword in request_lower for keyword in high_complexity):
            return "high"
        elif any(keyword in request_lower for keyword in medium_complexity):
            return "medium"
        else:
            return "low"
    
    def identify_components(self, request: str, request_type: str) -> List[str]:
        """Identify React components that need to be created or modified"""
        request_lower = request.lower()
        components = []
        
        # Common component patterns
        component_patterns = {
            'form': ['ContactForm', 'Form'],
            'nav': ['Navigation', 'Navbar'],
            'header': ['Header'],
            'footer': ['Footer'],
            'card': ['Card'],
            'modal': ['Modal'],
            'button': ['Button'],
            'input': ['Input'],
            'hero': ['Hero', 'HeroSection'],
            'about': ['AboutSection', 'TeamSection'],
            'contact': ['ContactSection', 'ContactForm'],
            'portfolio': ['PortfolioCard', 'PortfolioGrid'],
            'services': ['ServicesSection', 'ServiceCard'],
            'testimonial': ['TestimonialCard', 'TestimonialSection']
        }
        
        for keyword, component_names in component_patterns.items():
            if keyword in request_lower:
                components.extend(component_names)
        
        # For new pages, identify likely components
        if request_type == "new_page":
            if 'about' in request_lower:
                components.extend(['AboutHero', 'TeamSection', 'MissionSection'])
            elif 'contact' in request_lower:
                components.extend(['ContactForm', 'ContactInfo', 'MapSection'])
            elif 'services' in request_lower:
                components.extend(['ServicesGrid', 'ServiceCard', 'PricingSection'])
        
        return list(set(components))  # Remove duplicates
    
    def identify_new_files(self, request: str, request_type: str) -> List[str]:
        """Identify new files that need to be created"""
        files = []
        
        if request_type == "new_page":
            page_name = self.extract_page_name(request)
            if page_name:
                files.append(f"src/app/{page_name}/page.tsx")
                files.append(f"src/app/{page_name}/layout.tsx")
        
        elif request_type == "component":
            components = self.identify_components(request, request_type)
            for component in components:
                files.append(f"src/components/{component.lower()}/{component}.tsx")
        
        return files
    
    def identify_existing_files(self, request: str, request_type: str) -> List[str]:
        """Identify existing files that may need modification"""
        files = []
        
        # Common files that might need updates
        if request_type == "enhancement":
            if 'navigation' in request.lower():
                files.extend([
                    "src/components/layout/Header.tsx",
                    "src/components/navigation/Navigation.tsx"
                ])
            elif 'homepage' in request.lower() or 'home' in request.lower():
                files.append("src/app/page.tsx")
        
        elif request_type == "styling":
            files.extend([
                "tailwind.config.ts",
                "src/app/globals.css"
            ])
        
        return files
    
    def extract_page_name(self, request: str) -> Optional[str]:
        """Extract page name from request"""
        request_lower = request.lower()
        
        # Common page names
        page_keywords = {
            'about': 'about',
            'contact': 'contact',
            'services': 'services',
            'portfolio': 'portfolio',
            'blog': 'blog',
            'pricing': 'pricing',
            'team': 'team'
        }
        
        for keyword, page_name in page_keywords.items():
            if keyword in request_lower:
                return page_name
        
        # Try to extract custom page name
        patterns = [
            r'create (?:a )?(.+?) page',
            r'new (.+?) page',
            r'add (?:a )?(.+?) page'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, request_lower)
            if match:
                page_name = match.group(1).strip()
                # Clean up the page name
                page_name = re.sub(r'[^a-z0-9\s]', '', page_name)
                page_name = re.sub(r'\s+', '-', page_name)
                return page_name
        
        return None
    
    def identify_dependencies(self, request: str, request_type: str) -> List[str]:
        """Identify npm packages that might be needed"""
        dependencies = []
        request_lower = request.lower()
        
        # Form-related dependencies
        if any(keyword in request_lower for keyword in ['form', 'validation', 'input']):
            dependencies.extend(['react-hook-form', 'zod', '@hookform/resolvers'])
        
        # Animation dependencies
        if any(keyword in request_lower for keyword in ['animation', 'motion', 'transition']):
            dependencies.append('framer-motion')
        
        # Icon dependencies
        if any(keyword in request_lower for keyword in ['icon', 'icons']):
            dependencies.extend(['lucide-react', '@heroicons/react'])
        
        # Date handling
        if any(keyword in request_lower for keyword in ['date', 'calendar', 'time']):
            dependencies.append('date-fns')
        
        return dependencies
    
    def create_implementation_plan(self, request: str, request_type: str) -> List[Dict]:
        """Create step-by-step implementation plan"""
        plan = []
        
        if request_type == "new_page":
            page_name = self.extract_page_name(request)
            components = self.identify_components(request, request_type)
            
            plan.extend([
                {
                    "step": 1,
                    "action": "create_page_structure",
                    "description": f"Create page directory and main page component for {page_name}",
                    "files": [f"src/app/{page_name}/page.tsx"]
                },
                {
                    "step": 2,
                    "action": "create_components",
                    "description": f"Create supporting components: {', '.join(components)}",
                    "files": [f"src/components/{comp.lower()}/{comp}.tsx" for comp in components]
                },
                {
                    "step": 3,
                    "action": "update_navigation",
                    "description": "Add new page to navigation menu",
                    "files": ["src/components/layout/Header.tsx"]
                },
                {
                    "step": 4,
                    "action": "add_metadata",
                    "description": "Configure page metadata and SEO",
                    "files": [f"src/app/{page_name}/layout.tsx"]
                }
            ])
        
        elif request_type == "component":
            components = self.identify_components(request, request_type)
            plan.extend([
                {
                    "step": 1,
                    "action": "create_component",
                    "description": f"Create component files: {', '.join(components)}",
                    "files": [f"src/components/{comp.lower()}/{comp}.tsx" for comp in components]
                },
                {
                    "step": 2,
                    "action": "integrate_component",
                    "description": "Integrate component into relevant pages",
                    "files": ["src/app/page.tsx"]  # Default to homepage
                }
            ])
        
        return plan
    
    def plan_testing(self, request: str, request_type: str) -> Dict:
        """Plan testing strategy for the implementation"""
        testing = {
            "unit_tests": [],
            "integration_tests": [],
            "e2e_tests": [],
            "manual_tests": []
        }
        
        if request_type == "new_page":
            testing["manual_tests"].extend([
                "Verify page loads correctly",
                "Check responsive design",
                "Test navigation links",
                "Validate metadata and SEO"
            ])
        
        elif request_type == "component":
            testing["manual_tests"].extend([
                "Verify component renders correctly",
                "Test component props and interactions",
                "Check accessibility features"
            ])
        
        elif request_type == "bugfix":
            testing["manual_tests"].extend([
                "Verify bug is fixed",
                "Test related functionality",
                "Ensure no regression"
            ])
        
        return testing
    
    def assess_deployment_impact(self, request: str) -> Dict:
        """Assess deployment and production considerations"""
        impact = {
            "breaking_changes": False,
            "requires_env_vars": False,
            "requires_build": True,
            "affects_seo": False,
            "performance_impact": "minimal",
            "security_considerations": []
        }
        
        request_lower = request.lower()
        
        # Check for breaking changes
        if any(keyword in request_lower for keyword in ['remove', 'delete', 'restructure']):
            impact["breaking_changes"] = True
        
        # Check for SEO impact
        if any(keyword in request_lower for keyword in ['page', 'meta', 'title', 'description']):
            impact["affects_seo"] = True
        
        # Check for performance impact
        if any(keyword in request_lower for keyword in ['image', 'video', 'animation', 'large']):
            impact["performance_impact"] = "moderate"
        
        # Security considerations
        if any(keyword in request_lower for keyword in ['form', 'input', 'upload', 'contact']):
            impact["security_considerations"].extend([
                "Validate all user inputs",
                "Implement proper sanitization",
                "Add rate limiting if applicable"
            ])
        
        return impact
    
    def get_project_context(self) -> Dict:
        """Get current project context and structure"""
        if "project_context" in self.context_cache:
            return self.context_cache["project_context"]
        
        context = {
            "framework": "Next.js",
            "language": "TypeScript",
            "styling": "Tailwind CSS",
            "structure": {},
            "existing_pages": [],
            "existing_components": [],
            "package_info": {}
        }
        
        # Read package.json
        package_json = self.project_root / "package.json"
        if package_json.exists():
            with open(package_json, 'r') as f:
                context["package_info"] = json.load(f)
        
        # Scan existing pages
        pages_dir = self.project_root / "src" / "app"
        if pages_dir.exists():
            for item in pages_dir.iterdir():
                if item.is_dir() and (item / "page.tsx").exists():
                    context["existing_pages"].append(item.name)
        
        # Scan existing components
        components_dir = self.project_root / "src" / "components"
        if components_dir.exists():
            for category_dir in components_dir.iterdir():
                if category_dir.is_dir():
                    for component_file in category_dir.glob("*.tsx"):
                        context["existing_components"].append(component_file.stem)
        
        self.context_cache["project_context"] = context
        return context
    
    def generate_code(self, file_type: str, content_description: str, context: Dict) -> str:
        """Generate code for specific file types"""
        
        if file_type == "page":
            return self.generate_page_code(content_description, context)
        elif file_type == "component":
            return self.generate_component_code(content_description, context)
        elif file_type == "layout":
            return self.generate_layout_code(content_description, context)
        else:
            return self.generate_generic_code(content_description, context)
    
    def generate_page_code(self, description: str, context: Dict) -> str:
        """Generate Next.js page component code"""
        page_name = context.get("page_name", "NewPage")
        
        template = f'''import {{ Metadata }} from 'next'

export const metadata: Metadata = {{
  title: '{page_name} | Prism Writing Services',
  description: 'Professional writing services for {page_name.lower()}',
}}

export default function {page_name}Page() {{
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          {page_name}
        </h1>
        
        {{/* TODO: Add {page_name.lower()} content based on: {description} */}}
        <div className="space-y-6">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Content for {page_name.lower()} page will be implemented here.
          </p>
        </div>
      </div>
    </div>
  )
}}
'''
        return template
    
    def generate_component_code(self, description: str, context: Dict) -> str:
        """Generate React component code"""
        component_name = context.get("component_name", "NewComponent")
        
        template = f'''interface {component_name}Props {{
  // TODO: Define props based on: {description}
}}

export default function {component_name}({{ }}: {component_name}Props) {{
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        {component_name}
      </h2>
      
      {{/* TODO: Implement {component_name.lower()} functionality based on: {description} */}}
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-300">
          {component_name} content will be implemented here.
        </p>
      </div>
    </div>
  )
}}
'''
        return template
    
    def generate_layout_code(self, description: str, context: Dict) -> str:
        """Generate Next.js layout code"""
        page_name = context.get("page_name", "page")
        
        template = f'''import {{ Metadata }} from 'next'

export const metadata: Metadata = {{
  title: {{
    template: '%s | Prism Writing Services',
    default: '{page_name.title()} | Prism Writing Services',
  }},
  description: 'Professional writing services - {description}',
}}

export default function {page_name.title()}Layout({{
  children,
}}: {{
  children: React.ReactNode
}}) {{
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {{children}}
    </div>
  )
}}
'''
        return template
    
    def generate_generic_code(self, description: str, context: Dict) -> str:
        """Generate generic code based on description"""
        return f'''// TODO: Implement functionality based on: {description}
// Context: {json.dumps(context, indent=2)}

export default function GeneratedCode() {{
  // Implementation needed
  return null
}}
'''
