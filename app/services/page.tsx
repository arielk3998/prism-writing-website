import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  PenTool, 
  FileText, 
  Globe, 
  CheckCircle, 
  Clock, 
  Users,
  Award,
  ArrowRight
} from 'lucide-react';
import Layout from '../../components/Layout';

// Force dynamic rendering to avoid SSG issues with client components
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Professional Writing, Editing & Translation Services | Prism Writing',
  description: 'Expert writing, editing, and translation services for businesses and individuals. Professional content creation, proofreading, and translation in 80+ languages.',
  keywords: 'writing services, editing services, translation services, proofreading, content writing, professional writing'
};

export default function ServicesPage() {
  const services = [
    {
      icon: PenTool,
      title: 'Writing Services',
      description: 'Professional content creation tailored to your needs',
      features: [
        'Blog posts and articles',
        'Website copy and content',
        'Marketing materials',
        'Business communications',
        'Creative writing',
        'Technical documentation'
      ],
      pricing: 'Starting at $0.10/word',
      href: '/contact'
    },
    {
      icon: FileText,
      title: 'Editing & Proofreading',
      description: 'Expert editing to perfect your documents',
      features: [
        'Grammar and spelling correction',
        'Style and flow improvement',
        'Structure and organization',
        'Fact-checking and verification',
        'Formatting and consistency',
        'Multiple revision rounds'
      ],
      pricing: 'Starting at $0.05/word',
      href: '/contact'
    },
    {
      icon: Globe,
      title: 'Translation Services',
      description: 'Professional translation in 80+ languages',
      features: [
        '80+ language pairs',
        'Native speaker translators',
        'Industry specialization',
        'Cultural adaptation',
        'Certified translations',
        '24-48 hour turnaround'
      ],
      pricing: 'Starting at $0.12/word',
      href: '/translation-services'
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Certified professionals with industry expertise'
    },
    {
      icon: Clock,
      title: 'Fast Turnaround',
      description: '24-48 hour delivery for most projects'
    },
    {
      icon: Award,
      title: 'Quality Guarantee',
      description: '99% accuracy rate with satisfaction guarantee'
    },
    {
      icon: CheckCircle,
      title: 'Multiple Revisions',
      description: 'Free revisions until you are completely satisfied'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                Professional Writing Services
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Expert writing, editing, and translation services to help you communicate effectively across languages and cultures.
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <service.icon className="w-12 h-12 text-blue-600 mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-blue-600">
                      {service.pricing}
                    </span>
                    <Link 
                      href={service.href}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Prism Writing
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We combine expertise, technology, and dedication to deliver exceptional results for every project.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600">
              Simple, efficient, and transparent workflow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Project Consultation',
                description: 'Discuss your requirements and get a detailed quote'
              },
              {
                step: 2,
                title: 'Expert Assignment',
                description: 'Matched with the best professional for your project'
              },
              {
                step: 3,
                title: 'Quality Delivery',
                description: 'Receive your completed work on time and on budget'
              },
              {
                step: 4,
                title: 'Satisfaction Guarantee',
                description: 'Free revisions until you are completely satisfied'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Contact us today for a free consultation and quote for your writing, editing, or translation project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Get Free Quote
                </Link>
                <Link 
                  href="/translation-services"
                  className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
                >
                  Translation Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
