import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industries We Serve | Prism Writing',
  description: 'Professional writing services for various industries including technology, healthcare, finance, and more.',
};

export default function IndustriesPage() {
  const industries = [
    {
      name: 'Technology',
      description: 'Technical documentation, white papers, and marketing content for tech companies.',
      services: ['API Documentation', 'Technical Writing', 'Product Descriptions', 'Case Studies']
    },
    {
      name: 'Healthcare',
      description: 'Medical writing, compliance documentation, and patient education materials.',
      services: ['Medical Writing', 'Regulatory Documentation', 'Patient Education', 'Research Papers']
    },
    {
      name: 'Finance',
      description: 'Financial reports, investment documentation, and regulatory compliance materials.',
      services: ['Financial Reports', 'Investment Proposals', 'Compliance Documentation', 'Market Analysis']
    },
    {
      name: 'Education',
      description: 'Educational content, curriculum development, and training materials.',
      services: ['Curriculum Design', 'Training Materials', 'Educational Content', 'Assessment Tools']
    },
    {
      name: 'Manufacturing',
      description: 'Process documentation, safety manuals, and operational procedures.',
      services: ['Process Documentation', 'Safety Manuals', 'SOPs', 'Quality Assurance']
    },
    {
      name: 'Professional Services',
      description: 'Business documentation, proposals, and marketing materials for service providers.',
      services: ['Business Proposals', 'Marketing Materials', 'Process Documentation', 'Client Communications']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Industries We Serve
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our expert writing team delivers tailored solutions across diverse industries, 
            ensuring your content meets industry-specific standards and requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {industry.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {industry.description}
              </p>
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Key Services:
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {industry.services.map((service, serviceIndex) => (
                    <li key={serviceIndex} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Don&apos;t See Your Industry?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We work with businesses across all sectors. Contact us to discuss your specific needs.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
