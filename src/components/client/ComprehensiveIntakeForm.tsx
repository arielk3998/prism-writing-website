'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Users, 
  Target, 
  FileText, 
  Image, 
  CheckCircle2, 
  AlertCircle,
  Upload,
  Calendar,
  DollarSign,
  Globe,
  Palette,
  Settings,
  MessageSquare
} from 'lucide-react';
import type { ClientComprehensiveData, ValidationResult } from '../../lib/clientDataCollection';

interface ComprehensiveIntakeFormProps {
  onSubmit: (data: ClientComprehensiveData) => void;
  onValidationUpdate: (results: ValidationResult[]) => void;
}

export default function ComprehensiveIntakeForm({ onSubmit, onValidationUpdate }: ComprehensiveIntakeFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ClientComprehensiveData>({
    company: {
      name: '',
      industry: '',
      size: '',
      website: '',
      description: '',
      targetAudience: [],
      brandVoice: '',
      competitors: [],
      uniqueValueProposition: ''
    },
    contacts: {
      primary: {
        name: '',
        email: '',
        role: '',
        department: '',
        timezone: '',
        preferredContact: 'email',
        availability: ''
      },
      decisionMakers: []
    },
    project: {
      type: { category: '', subcategory: '', complexity: 'basic' },
      scope: '',
      objectives: [],
      deliverables: [],
      timeline: {
        startDate: new Date(),
        endDate: new Date(),
        milestones: [],
        criticalPath: []
      },
      budget: {
        total: 0,
        currency: 'USD',
        breakdown: [],
        paymentSchedule: []
      },
      constraints: [],
      requirements: []
    },
    content: {
      contentTypes: [],
      tone: '',
      style: '',
      keywords: [],
      seoRequirements: {
        targetKeywords: [],
        metaRequirements: {},
        structuredData: false
      },
      brandGuidelines: {
        colorPalette: [],
        typography: {},
        logoUsage: {},
        voiceAndTone: ''
      },
      existingContent: []
    },
    technical: {
      platforms: [],
      integrations: [],
      fileFormats: [],
      accessibility: {
        wcagLevel: 'AA',
        screenReader: false,
        colorContrast: false,
        keyboardNavigation: false
      },
      compliance: {
        gdpr: false,
        ccpa: false,
        hipaa: false,
        sox: false,
        industry: []
      }
    },
    assets: {
      images: [],
      videos: [],
      documents: [],
      brandAssets: []
    },
    approval: {
      reviewers: [],
      approvalStages: [],
      revisionLimits: 3,
      signOffProcess: ''
    }
  });

  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const steps = [
    {
      title: 'Company Information',
      icon: Building2,
      description: 'Tell us about your organization',
      fields: ['company.name', 'company.industry', 'company.size', 'company.website', 'company.description']
    },
    {
      title: 'Target Audience & Brand',
      icon: Target,
      description: 'Define your audience and brand voice',
      fields: ['company.targetAudience', 'company.brandVoice', 'company.uniqueValueProposition']
    },
    {
      title: 'Project Details',
      icon: FileText,
      description: 'Project scope, objectives, and deliverables',
      fields: ['project.type', 'project.scope', 'project.objectives', 'project.deliverables']
    },
    {
      title: 'Timeline & Budget',
      icon: Calendar,
      description: 'Project timeline and financial details',
      fields: ['project.timeline', 'project.budget']
    },
    {
      title: 'Content Requirements',
      icon: MessageSquare,
      description: 'Content specifications and guidelines',
      fields: ['content.contentTypes', 'content.tone', 'content.style', 'content.keywords']
    },
    {
      title: 'Technical & Compliance',
      icon: Settings,
      description: 'Technical requirements and compliance needs',
      fields: ['technical.platforms', 'technical.compliance', 'technical.accessibility']
    },
    {
      title: 'Assets & Resources',
      icon: Image,
      description: 'Upload relevant files and brand assets',
      fields: ['assets']
    },
    {
      title: 'Approval Process',
      icon: CheckCircle2,
      description: 'Define review and approval workflow',
      fields: ['approval.reviewers', 'approval.approvalStages']
    }
  ];

  // Calculate completion percentage
  useEffect(() => {
    const calculateCompletion = () => {
      let totalFields = 0;
      let completedFields = 0;

      // Count completed fields across all sections
      const checkField = (value: any) => {
        totalFields++;
        if (Array.isArray(value)) {
          if (value.length > 0) completedFields++;
        } else if (typeof value === 'object' && value !== null) {
          if (Object.keys(value).some(key => value[key] && value[key] !== '')) completedFields++;
        } else if (value && value !== '') {
          completedFields++;
        }
      };

      // Check company fields
      Object.values(formData.company).forEach(checkField);
      
      // Check project fields
      Object.values(formData.project).forEach(checkField);
      
      // Check content fields
      Object.values(formData.content).forEach(checkField);

      const percentage = totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;
      setCompletionPercentage(percentage);
    };

    calculateCompletion();
  }, [formData]);

  // Real-time validation
  useEffect(() => {
    const validateCurrentData = () => {
      const results: ValidationResult[] = [];
      
      // Validate current step fields
      const currentStepFields = steps[currentStep]?.fields || [];
      
      currentStepFields.forEach(fieldPath => {
        const value = getNestedValue(formData, fieldPath);
        const validation = validateField(fieldPath, value);
        if (validation) {
          results.push(validation);
        }
      });
      
      setValidationResults(results);
      onValidationUpdate(results);
    };

    validateCurrentData();
  }, [formData, currentStep, onValidationUpdate]);

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  const setNestedValue = (obj: any, path: string, value: any) => {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    const target = keys.reduce((current, key) => {
      if (!current[key]) current[key] = {};
      return current[key];
    }, obj);
    target[lastKey] = value;
  };

  const validateField = (fieldPath: string, value: any): ValidationResult | null => {
    // Field-specific validation logic
    switch (fieldPath) {
      case 'company.name':
        return {
          field: fieldPath,
          status: value && value.length > 2 ? 'valid' : 'invalid',
          confidence: value ? 0.95 : 0,
          issues: value ? [] : ['Company name is required'],
          suggestions: value ? [] : ['Please provide your full company name']
        };
      
      case 'company.industry':
        return {
          field: fieldPath,
          status: value && value.length > 0 ? 'valid' : 'invalid',
          confidence: value ? 0.9 : 0,
          issues: value ? [] : ['Industry is required'],
          suggestions: value ? [] : ['Select your primary industry sector']
        };
      
      case 'company.targetAudience':
        return {
          field: fieldPath,
          status: Array.isArray(value) && value.length > 0 ? 'valid' : 'needs_clarification',
          confidence: Array.isArray(value) && value.length > 1 ? 0.95 : 0.5,
          issues: !value || value.length === 0 ? ['Target audience not defined'] : [],
          suggestions: !value || value.length === 0 ? ['Define at least one target audience segment'] : []
        };
      
      default:
        return null;
    }
  };

  const handleInputChange = (fieldPath: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev };
      setNestedValue(updated, fieldPath, value);
      return updated;
    });
  };

  const handleArrayAdd = (fieldPath: string, newItem: string) => {
    if (!newItem.trim()) return;
    
    setFormData(prev => {
      const updated = { ...prev };
      const currentArray = getNestedValue(updated, fieldPath) || [];
      setNestedValue(updated, fieldPath, [...currentArray, newItem.trim()]);
      return updated;
    });
  };

  const handleArrayRemove = (fieldPath: string, index: number) => {
    setFormData(prev => {
      const updated = { ...prev };
      const currentArray = getNestedValue(updated, fieldPath) || [];
      const newArray = currentArray.filter((_: any, i: number) => i !== index);
      setNestedValue(updated, fieldPath, newArray);
      return updated;
    });
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files);
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Process files based on type
    newFiles.forEach(file => {
      if (file.type.startsWith('image/')) {
        const imageAsset = {
          name: file.name,
          type: file.type,
          url: URL.createObjectURL(file),
          metadata: { size: file.size },
          usage: 'pending_review'
        };
        setFormData(prev => ({
          ...prev,
          assets: {
            ...prev.assets,
            images: [...prev.assets.images, imageAsset]
          }
        }));
      } else {
        const docAsset = {
          name: file.name,
          type: file.type,
          url: URL.createObjectURL(file),
          confidential: false,
          relevance: 'pending_review'
        };
        setFormData(prev => ({
          ...prev,
          assets: {
            ...prev.assets,
            documents: [...prev.assets.documents, docAsset]
          }
        }));
      }
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Company Information
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Company Name *</label>
              <input
                type="text"
                value={formData.company.name}
                onChange={(e) => handleInputChange('company.name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your company's full legal name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Industry *</label>
              <select
                value={formData.company.industry}
                onChange={(e) => handleInputChange('company.industry', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select your industry</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="education">Education</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail</option>
                <option value="consulting">Consulting</option>
                <option value="nonprofit">Non-profit</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Company Size</label>
              <select
                value={formData.company.size}
                onChange={(e) => handleInputChange('company.size', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Website</label>
              <input
                type="url"
                value={formData.company.website}
                onChange={(e) => handleInputChange('company.website', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://yourcompany.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Company Description</label>
              <textarea
                value={formData.company.description}
                onChange={(e) => handleInputChange('company.description', e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of your company, products, and services..."
              />
            </div>
          </div>
        );

      case 1: // Target Audience & Brand
        return (
          <div className="space-y-6">
            <ArrayInput
              label="Target Audience Segments *"
              value={formData.company.targetAudience}
              onChange={(value) => handleInputChange('company.targetAudience', value)}
              placeholder="e.g., Small business owners, Enterprise CTOs, Healthcare professionals"
              onAdd={(item) => handleArrayAdd('company.targetAudience', item)}
              onRemove={(index) => handleArrayRemove('company.targetAudience', index)}
            />

            <div>
              <label className="block text-sm font-medium mb-2">Brand Voice & Tone</label>
              <select
                value={formData.company.brandVoice}
                onChange={(e) => handleInputChange('company.brandVoice', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select brand voice</option>
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="authoritative">Authoritative</option>
                <option value="casual">Casual</option>
                <option value="technical">Technical</option>
                <option value="conversational">Conversational</option>
                <option value="formal">Formal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Unique Value Proposition</label>
              <textarea
                value={formData.company.uniqueValueProposition}
                onChange={(e) => handleInputChange('company.uniqueValueProposition', e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What makes your company unique? What specific value do you provide?"
              />
            </div>

            <ArrayInput
              label="Main Competitors"
              value={formData.company.competitors}
              onChange={(value) => handleInputChange('company.competitors', value)}
              placeholder="Competitor name or website"
              onAdd={(item) => handleArrayAdd('company.competitors', item)}
              onRemove={(index) => handleArrayRemove('company.competitors', index)}
            />
          </div>
        );

      case 6: // Assets & Resources
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Upload Assets & Resources</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">
                  Upload brand assets, existing content, style guides, or any relevant files
                </p>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.svg,.ai,.psd,.figma"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Choose Files
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Uploaded Files:</h4>
                  <ul className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <p className="text-gray-600">
              This section is under development. Additional form fields will be added here.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Comprehensive Project Intake</h1>
          <div className="text-sm text-gray-600">
            {completionPercentage}% Complete
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Step Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : isCompleted
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <StepIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Current Step Content */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center space-x-3">
            {React.createElement(steps[currentStep].icon, { className: "w-6 h-6 text-blue-500" })}
            <div>
              <h2 className="text-xl font-semibold">{steps[currentStep].title}</h2>
              <p className="text-gray-600">{steps[currentStep].description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
          
          {/* Validation Results */}
          {validationResults.length > 0 && (
            <div className="mt-6 space-y-2">
              {validationResults.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-2 p-3 rounded-lg ${
                    result.status === 'valid'
                      ? 'bg-green-50 text-green-700'
                      : result.status === 'invalid'
                      ? 'bg-red-50 text-red-700'
                      : 'bg-yellow-50 text-yellow-700'
                  }`}
                >
                  {result.status === 'valid' ? (
                    <CheckCircle2 className="w-5 h-5 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium">{result.field}</p>
                    {result.issues.length > 0 && (
                      <ul className="text-sm mt-1 list-disc list-inside">
                        {result.issues.map((issue, i) => (
                          <li key={i}>{issue}</li>
                        ))}
                      </ul>
                    )}
                    {result.suggestions.length > 0 && (
                      <ul className="text-sm mt-1 list-disc list-inside">
                        {result.suggestions.map((suggestion, i) => (
                          <li key={i}>{suggestion}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={prevStep}
          disabled={currentStep === 0}
          variant="outline"
        >
          Previous
        </Button>
        
        {currentStep === steps.length - 1 ? (
          <Button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600"
            disabled={completionPercentage < 80}
          >
            Submit Intake Form
          </Button>
        ) : (
          <Button onClick={nextStep}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

// Helper component for array inputs
interface ArrayInputProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
  onAdd: (item: string) => void;
  onRemove: (index: number) => void;
}

function ArrayInput({ label, value, placeholder, onAdd, onRemove }: ArrayInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="flex space-x-2 mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Button onClick={handleAdd} disabled={!inputValue.trim()}>
          Add
        </Button>
      </div>
      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-blue-50 p-2 rounded-lg">
              <span className="text-sm">{item}</span>
              <button
                onClick={() => onRemove(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
