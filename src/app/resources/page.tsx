'use client';

import React, { useState } from 'react';
import { 
  ModernCard, 
  ModernSectionHeader
} from '@/components/ui/ModernComponents';
import { 
  Heart, 
  Code, 
  Search, 
  ExternalLink, 
  Shield, 
  CheckCircle, 
  Eye,
  BookOpen,
  FileText
} from 'lucide-react';

export default function ResourcesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const resourceCategories = [
    {
      id: 'healthcare',
      title: "Healthcare & Life Sciences",
      description: "Compliance standards for healthcare, medical devices, and life sciences documentation",
      icon: Heart,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      resources: [
        {
          name: "HIPAA (Health Insurance Portability and Accountability Act)",
          description: "Privacy and security standards for protected health information",
          url: "https://www.hhs.gov/hipaa/",
          authority: "U.S. Department of Health & Human Services",
          relevance: "Essential for healthcare documentation and training materials"
        },
        {
          name: "FDA 21 CFR Part 820 (Quality System Regulation)",
          description: "Quality management systems for medical device manufacturers",
          url: "https://www.fda.gov/medical-devices/postmarket-requirements-devices/quality-system-qs-regulationmedical-device-good-manufacturing-practices",
          authority: "U.S. Food and Drug Administration",
          relevance: "Critical for medical device documentation and SOPs"
        }
      ]
    },
    {
      id: 'technology',
      title: "Technology & Software",
      description: "Standards for software development, cybersecurity, and IT operations",
      icon: Code,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      resources: [
        {
          name: "NIST Cybersecurity Framework",
          description: "Framework for improving critical infrastructure cybersecurity",
          url: "https://www.nist.gov/cyberframework",
          authority: "National Institute of Standards and Technology",
          relevance: "Foundation for cybersecurity documentation and procedures"
        },
        {
          name: "ISO 27001 (Information Security Management)",
          description: "International standard for information security management systems",
          url: "https://www.iso.org/isoiec-27001-information-security.html",
          authority: "International Organization for Standardization",
          relevance: "Global standard for information security documentation"
        }
      ]
    }
  ];

  const complianceProcess = [
    {
      icon: Search,
      title: "Compliance Assessment",
      description: "We start every project by identifying applicable standards and compliance requirements for your industry."
    },
    {
      icon: CheckCircle,
      title: "Standard Integration",
      description: "We build compliance requirements directly into our documentation structure and content strategy."
    },
    {
      icon: Eye,
      title: "Ongoing Monitoring",
      description: "We stay current with regulatory changes and update documentation to maintain compliance over time."
    }
  ];

  const filteredCategories = resourceCategories.filter(category => {
    if (activeFilter === 'all') return true;
    return category.id === activeFilter;
  }).filter(category => {
    if (!searchTerm) return true;
    return category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           category.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filterButtons = [
    { id: 'all', label: 'All Industries' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'technology', label: 'Technology' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Compliance
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block mt-2">
                Resources
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Comprehensive collection of industry standards, compliance requirements, and best practices 
              for technical documentation across all major sectors.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-sm font-medium text-blue-700 border border-blue-200">
                <BookOpen className="w-4 h-4 mr-2" />
                Industry Standards
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-purple-50 rounded-full text-sm font-medium text-purple-700 border border-purple-200">
                <Shield className="w-4 h-4 mr-2" />
                Compliance Guidelines
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full text-sm font-medium text-green-700 border border-green-200">
                <FileText className="w-4 h-4 mr-2" />
                Best Practices
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {filterButtons.map((button) => (
                <button
                  key={button.id}
                  onClick={() => setActiveFilter(button.id)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    activeFilter === button.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {filteredCategories.map((category, categoryIndex) => (
              <ModernCard key={categoryIndex} className="p-8">
                <div className="flex items-start space-x-6 mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h2>
                    <p className="text-gray-600 text-lg">{category.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {category.resources.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className={`${category.bgColor} rounded-xl p-6 hover:shadow-md transition-shadow duration-200`}>
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex-1">{resource.name}</h3>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-3 p-2 text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">{resource.description}</p>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium text-gray-900">Authority: </span>
                          <span className="text-gray-600">{resource.authority}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">Relevance: </span>
                          <span className="text-gray-600">{resource.relevance}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Process Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModernSectionHeader
            title="Our Compliance Approach"
            subtitle="How we ensure your documentation meets all relevant industry standards"
            centered
          />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {complianceProcess.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Compliant Documentation?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let our experts ensure your documentation meets all relevant industry standards and regulatory requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Discuss Your Compliance Needs
              <ExternalLink className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/services"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Our Services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
