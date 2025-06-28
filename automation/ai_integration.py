#!/usr/bin/env python3
"""
AI Integration Module for Prism Writing Development Automation

This module provides interfaces to various AI services for code generation,
analysis, and implementation assistance.
"""

import os
import json
import requests
from typing import Dict, List, Optional, Union
from abc import ABC, abstractmethod
import openai
from anthropic import Anthropic
import time

class AIProvider(ABC):
    """Abstract base class for AI providers"""
    
    @abstractmethod
    def generate_code(self, prompt: str, context: Dict) -> str:
        """Generate code based on prompt and context"""
        pass
    
    @abstractmethod
    def analyze_request(self, request: str, project_context: Dict) -> Dict:
        """Analyze a development request"""
        pass
    
    @abstractmethod
    def suggest_implementation(self, analysis: Dict) -> Dict:
        """Suggest implementation approach"""
        pass

class ClaudeProvider(AIProvider):
    """Anthropic Claude AI provider"""
    
    def __init__(self, api_key: str, model: str = "claude-3-5-sonnet-20241022"):
        self.client = Anthropic(api_key=api_key)
        self.model = model
    
    def generate_code(self, prompt: str, context: Dict) -> str:
        """Generate code using Claude"""
        system_prompt = f"""
        You are an expert Next.js/React/TypeScript developer working on the Prism Writing website.
        
        Project Context:
        - Framework: Next.js 15.3.4 with App Router
        - Language: TypeScript
        - Styling: Tailwind CSS
        - Components: Functional components with hooks
        - State: React useState/useEffect
        - Architecture: {context.get('architecture', 'Component-based with centralized config')}
        
        File Structure:
        - Pages: src/app/[page]/page.tsx
        - Components: src/components/[category]/[ComponentName].tsx
        - Config: src/config/siteConfig.ts
        - Styles: Tailwind classes, dark mode support
        
        Code Standards:
        - Use TypeScript interfaces for props
        - Include proper error handling
        - Follow accessibility best practices
        - Use semantic HTML
        - Implement responsive design
        - Support dark/light modes
        """
        
        try:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=4000,
                temperature=0.1,
                system=system_prompt,
                messages=[{
                    "role": "user",
                    "content": prompt
                }]
            )
            return response.content[0].text
        except Exception as e:
            raise Exception(f"Claude API error: {e}")
    
    def analyze_request(self, request: str, project_context: Dict) -> Dict:
        """Analyze development request using Claude"""
        analysis_prompt = f"""
        Analyze this development request for the Prism Writing website:
        
        Request: "{request}"
        
        Project Context: {json.dumps(project_context, indent=2)}
        
        Provide a detailed analysis in JSON format with:
        1. request_type: (new_page|component|enhancement|bugfix|styling|backend|deployment)
        2. complexity: (low|medium|high)
        3. estimated_time: hours
        4. components_needed: list of React components to create/modify
        5. files_to_create: list of new files needed
        6. files_to_modify: list of existing files to modify
        7. dependencies: list of npm packages needed
        8. implementation_steps: detailed step-by-step plan
        9. testing_requirements: what needs to be tested
        10. deployment_impact: description of deployment considerations
        11. risks: potential issues or challenges
        12. prerequisites: what needs to be done first
        
        Return only valid JSON.
        """
        
        try:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=2000,
                temperature=0.1,
                messages=[{
                    "role": "user",
                    "content": analysis_prompt
                }]
            )
            
            # Parse JSON response
            analysis_text = response.content[0].text
            # Extract JSON from response (handle potential markdown formatting)
            if "```json" in analysis_text:
                json_start = analysis_text.find("```json") + 7
                json_end = analysis_text.find("```", json_start)
                analysis_text = analysis_text[json_start:json_end].strip()
            
            return json.loads(analysis_text)
        except Exception as e:
            # Fallback analysis if AI fails
            return {
                "request_type": "general",
                "complexity": "medium",
                "estimated_time": 2,
                "error": f"Analysis failed: {e}"
            }
    
    def suggest_implementation(self, analysis: Dict) -> Dict:
        """Suggest implementation approach"""
        implementation_prompt = f"""
        Based on this analysis, provide a detailed implementation plan:
        
        Analysis: {json.dumps(analysis, indent=2)}
        
        Provide implementation suggestions in JSON format with:
        1. architecture: recommended architectural approach
        2. code_structure: how to organize the code
        3. component_hierarchy: how components should relate
        4. state_management: how to handle state
        5. styling_approach: CSS/styling strategy
        6. data_flow: how data should flow through the application
        7. error_handling: error handling strategy
        8. performance_considerations: optimization recommendations
        9. accessibility_notes: a11y considerations
        10. code_examples: key code snippets or patterns
        
        Return only valid JSON.
        """
        
        try:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=3000,
                temperature=0.1,
                messages=[{
                    "role": "user",
                    "content": implementation_prompt
                }]
            )
            
            implementation_text = response.content[0].text
            if "```json" in implementation_text:
                json_start = implementation_text.find("```json") + 7
                json_end = implementation_text.find("```", json_start)
                implementation_text = implementation_text[json_start:json_end].strip()
            
            return json.loads(implementation_text)
        except Exception as e:
            return {"error": f"Implementation suggestion failed: {e}"}

class OpenAIProvider(AIProvider):
    """OpenAI GPT provider"""
    
    def __init__(self, api_key: str, model: str = "gpt-4"):
        openai.api_key = api_key
        self.model = model
    
    def generate_code(self, prompt: str, context: Dict) -> str:
        """Generate code using OpenAI GPT"""
        system_prompt = f"""
        You are an expert Next.js/React/TypeScript developer working on the Prism Writing website.
        Project context: {json.dumps(context)}
        Generate high-quality, production-ready code following best practices.
        """
        
        try:
            response = openai.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=4000,
                temperature=0.1
            )
            return response.choices[0].message.content
        except Exception as e:
            raise Exception(f"OpenAI API error: {e}")
    
    def analyze_request(self, request: str, project_context: Dict) -> Dict:
        """Analyze request using OpenAI"""
        # Similar implementation to Claude but using OpenAI API
        # ... implementation details
        pass
    
    def suggest_implementation(self, analysis: Dict) -> Dict:
        """Suggest implementation using OpenAI"""
        # Similar implementation to Claude but using OpenAI API
        # ... implementation details
        pass

class AIAssistant:
    """Main AI assistant that can use different providers"""
    
    def __init__(self, provider: str = "claude", **kwargs):
        self.provider_name = provider
        
        if provider == "claude":
            api_key = os.getenv("ANTHROPIC_API_KEY")
            if not api_key:
                raise ValueError("ANTHROPIC_API_KEY environment variable required")
            self.provider = ClaudeProvider(api_key, kwargs.get("model", "claude-3-5-sonnet-20241022"))
        
        elif provider == "openai":
            api_key = os.getenv("OPENAI_API_KEY")
            if not api_key:
                raise ValueError("OPENAI_API_KEY environment variable required")
            self.provider = OpenAIProvider(api_key, kwargs.get("model", "gpt-4"))
        
        else:
            raise ValueError(f"Unsupported AI provider: {provider}")
    
    def analyze_and_implement(self, request: str, project_context: Dict) -> Dict:
        """Complete analysis and implementation workflow"""
        workflow = {
            "request": request,
            "provider": self.provider_name,
            "timestamp": time.time()
        }
        
        try:
            # Step 1: Analyze the request
            analysis = self.provider.analyze_request(request, project_context)
            workflow["analysis"] = analysis
            
            # Step 2: Get implementation suggestions
            implementation = self.provider.suggest_implementation(analysis)
            workflow["implementation"] = implementation
            
            # Step 3: Generate code for each component/file
            workflow["generated_code"] = {}
            
            if "files_to_create" in analysis:
                for file_path in analysis["files_to_create"]:
                    code_prompt = f"""
                    Create the file: {file_path}
                    
                    Based on this analysis: {json.dumps(analysis)}
                    Implementation plan: {json.dumps(implementation)}
                    
                    Generate complete, production-ready code for this file.
                    Include proper imports, exports, types, and documentation.
                    """
                    
                    generated_code = self.provider.generate_code(code_prompt, project_context)
                    workflow["generated_code"][file_path] = generated_code
            
            workflow["status"] = "success"
            
        except Exception as e:
            workflow["status"] = "error"
            workflow["error"] = str(e)
        
        return workflow
    
    def generate_component(self, component_name: str, props: Dict, context: Dict) -> str:
        """Generate a specific React component"""
        prompt = f"""
        Create a React TypeScript component named {component_name}.
        
        Props interface: {json.dumps(props)}
        Context: {json.dumps(context)}
        
        Requirements:
        - Use functional component with hooks
        - Include proper TypeScript types
        - Implement responsive design with Tailwind
        - Support dark/light mode
        - Follow accessibility best practices
        - Include proper error handling
        """
        
        return self.provider.generate_code(prompt, context)
    
    def generate_page(self, page_name: str, requirements: List[str], context: Dict) -> str:
        """Generate a Next.js page"""
        prompt = f"""
        Create a Next.js page component for: {page_name}
        
        Requirements:
        {chr(10).join(f'- {req}' for req in requirements)}
        
        Context: {json.dumps(context)}
        
        Include:
        - Navigation component integration
        - SEO-friendly structure
        - Responsive design
        - Proper TypeScript types
        - Dark mode support
        - Loading states where appropriate
        """
        
        return self.provider.generate_code(prompt, context)
    
    def fix_issue(self, error_description: str, code_context: str, project_context: Dict) -> str:
        """Generate fix for a specific issue"""
        prompt = f"""
        Fix this issue in the Prism Writing website:
        
        Error: {error_description}
        
        Current code context:
        {code_context}
        
        Project context: {json.dumps(project_context)}
        
        Provide the corrected code with explanation of what was fixed.
        """
        
        return self.provider.generate_code(prompt, project_context)
    
    def enhance_feature(self, feature_description: str, current_code: str, enhancement_goals: List[str], context: Dict) -> str:
        """Enhance an existing feature"""
        prompt = f"""
        Enhance this feature: {feature_description}
        
        Current implementation:
        {current_code}
        
        Enhancement goals:
        {chr(10).join(f'- {goal}' for goal in enhancement_goals)}
        
        Context: {json.dumps(context)}
        
        Provide the enhanced code with improvements clearly marked.
        """
        
        return self.provider.generate_code(prompt, context)

# Example usage and testing
if __name__ == "__main__":
    # Test the AI assistant
    assistant = AIAssistant("claude")
    
    project_context = {
        "framework": "Next.js 15.3.4",
        "language": "TypeScript",
        "styling": "Tailwind CSS",
        "architecture": "Component-based"
    }
    
    # Test request analysis
    test_request = "Create a new testimonials page with customer reviews and ratings"
    result = assistant.analyze_and_implement(test_request, project_context)
    
    print(json.dumps(result, indent=2))
