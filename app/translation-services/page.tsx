'use client';

import React from 'react';
import { 
  Globe, 
  Users, 
  Clock, 
  Shield, 
  Award, 
  BookOpen,
  MessageSquare,
  FileText,
  Briefcase,
  GraduationCap,
  Heart,
  Scale,
  Zap
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import SampleDocumentTranslator from '../../components/SampleDocumentTranslator';
import { getMostSpokenLanguages } from '../../lib/languages';
import { spacing, borderRadius, shadows, colors, typography } from '@/lib/design-tokens';

export default function TranslationServicesPage() {
  const popularLanguages = getMostSpokenLanguages(12);
  
  const serviceTypes = [
    {
      icon: Briefcase,
      title: 'Business Translation',
      description: 'Corporate documents, contracts, proposals, and marketing materials',
      examples: ['Business proposals', 'Marketing content', 'Annual reports', 'Product descriptions']
    },
    {
      icon: Scale,
      title: 'Legal Translation',
      description: 'Certified legal document translation by qualified legal experts',
      examples: ['Contracts & agreements', 'Court documents', 'Patents', 'Compliance materials']
    },
    {
      icon: Heart,
      title: 'Medical Translation',
      description: 'Precise medical and pharmaceutical translation services',
      examples: ['Clinical trials', 'Medical reports', 'Patient records', 'Drug documentation']
    },
    {
      icon: BookOpen,
      title: 'Technical Translation',
      description: 'Specialized technical documentation and manuals',
      examples: ['User manuals', 'Technical specs', 'Software documentation', 'Engineering docs']
    },
    {
      icon: GraduationCap,
      title: 'Academic Translation',
      description: 'Scholarly articles, research papers, and academic materials',
      examples: ['Research papers', 'Dissertations', 'Academic journals', 'Educational content']
    },
    {
      icon: FileText,
      title: 'Document Translation',
      description: 'Personal and official document translation services',
      examples: ['Certificates', 'Immigration docs', 'Financial statements', 'Identity documents']
    }
  ];

  const features = [
    {
      icon: Globe,
      title: '100+ Languages',
      description: 'Professional translation services for every major language and many regional dialects'
    },
    {
      icon: Users,
      title: 'Native Experts',
      description: 'Certified translators who are native speakers with subject matter expertise'
    },
    {
      icon: Clock,
      title: 'Fast Turnaround',
      description: 'Quick delivery times without compromising on quality or accuracy'
    },
    {
      icon: Shield,
      title: 'Confidential & Secure',
      description: 'Your documents are protected with enterprise-grade security and NDAs'
    },
    {
      icon: Award,
      title: 'Certified Quality',
      description: 'ISO-certified translation process with multiple quality checks'
    },
    {
      icon: Zap,
      title: 'AI-Enhanced',
      description: 'Combining human expertise with AI tools for faster, more consistent results'
    }
  ];

  const stats = [
    { number: '100+', label: 'Languages Supported' },
    { number: '500+', label: 'Expert Translators' },
    { number: '10,000+', label: 'Projects Completed' },
    { number: '99.8%', label: 'Accuracy Rate' },
    { number: '24h', label: 'Average Turnaround' },
    { number: '50+', label: 'Industries Served' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="gradient-primary text-white section-padding">
          <div className="container">
            <div className="text-center space-y-8">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Globe className="w-12 h-12" />
                <h1 className="heading-1">
                  Professional Translation Services
                </h1>
              </div>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed">
                Break language barriers with expert translation services covering every language in the world. 
                From business documents to technical manuals, we deliver precise, culturally-aware translations 
                that preserve meaning and intent.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <a href="/translation-quote" className="btn-primary text-center">
                  Get Free Quote
                </a>
                <a href="/translation-quote" className="btn-secondary text-center">
                  <MessageSquare className="w-5 h-5 inline mr-2" />
                  Contact Expert
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding bg-white">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="section-padding bg-surface">
          <div className="container">
            <div className="text-center section-header">
              <h2 className="heading-2 text-foreground mb-4">
                Try Our Translation Services
              </h2>
              <p className="body-large text-muted max-w-3xl mx-auto">
                Experience the quality of our translations with real sample documents. 
                Select any document type and see instant translations to your target language.
              </p>
            </div>
            <SampleDocumentTranslator />
          </div>
        </section>

        {/* Service Types */}
        <section className="section-padding bg-white">
          <div className="container">
            <div className="text-center section-header">
              <h2 className="heading-2 text-foreground mb-4">
                Specialized Translation Services
              </h2>
              <p className="body-large text-muted max-w-3xl mx-auto">
                Our expert translators specialize in various industries and document types, 
                ensuring accurate and contextually appropriate translations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceTypes.map((service, index) => (
                <div key={index} className="card hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                  </div>
                  <p className="text-muted mb-4">{service.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Examples:</p>
                    <ul className="text-sm text-muted space-y-1">
                      {service.examples.map((example, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding bg-surface">
          <div className="container">
            <div className="text-center section-header">
              <h2 className="heading-2 text-foreground mb-4">
                Why Choose Our Translation Services
              </h2>
              <p className="body-large text-muted max-w-3xl mx-auto">
                We combine human expertise with cutting-edge technology to deliver 
                translations that are accurate, culturally appropriate, and delivered on time.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="card-white hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Languages */}
        <section className="section-padding bg-white">
          <div className="container">
            <div className="text-center section-header">
              <h2 className="heading-2 text-foreground mb-4">
                Most Popular Language Pairs
              </h2>
              <p className="body-large text-muted max-w-3xl mx-auto">
                We offer professional translation services for all major world languages, 
                with expert translators for the most commonly requested language pairs.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {popularLanguages.map((language) => (
                <div key={language.code} className="card text-center hover:bg-surface transition-colors">
                  <div className="text-2xl mb-2">🌍</div>
                  <h3 className="font-semibold text-foreground">{language.name}</h3>
                  <p className="text-sm text-muted">{language.nativeName}</p>
                  <p className="text-xs text-muted mt-1">
                    {language.speakers >= 1 ? `${language.speakers}M speakers` : `${Math.round(language.speakers * 10) / 10}M speakers`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Language Showcase */}
        <section className="section-padding gradient-primary text-white">
          <div className="container text-center">
            <h2 className="heading-2 mb-6">
              🌍 95 World Languages Available
            </h2>
            <p className="body-large mb-8 opacity-90">
              Professional translation services for every major language in the world
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm">
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="font-semibold">🇪🇸 Spanish</div>
                <div className="opacity-80">500M speakers</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="font-semibold">🇫🇷 French</div>
                <div className="opacity-80">280M speakers</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="font-semibold">🇩🇪 German</div>
                <div className="opacity-80">100M speakers</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="font-semibold">🇨🇳 Chinese</div>
                <div className="opacity-80">918M speakers</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="font-semibold">🇯🇵 Japanese</div>
                <div className="opacity-80">125M speakers</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="font-semibold">🇸🇦 Arabic</div>
                <div className="opacity-80">422M speakers</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="font-semibold">🇷🇺 Russian</div>
                <div className="opacity-80">258M speakers</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="font-semibold">🇵🇹 Portuguese</div>
                <div className="opacity-80">260M speakers</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="font-semibold">🇮🇹 Italian</div>
                <div className="opacity-80">65M speakers</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="font-semibold">...and 85+ more</div>
                <div className="opacity-80">All major languages</div>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-lg font-semibold">Try the translation demo below to see our full language list!</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding gradient-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="heading-2 mb-6">
              Ready to Break Language Barriers?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get started with professional translation services today. 
              Upload your document and receive a free quote within minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/translation-quote" className="btn-white text-center">
                Upload Document & Get Quote
              </a>
              <a href="/translation-quote" className="btn-secondary text-center">
                Speak with Expert
              </a>
            </div>
            <div className="mt-8 text-sm opacity-80">
              ✓ Free quotes ✓ Secure file upload ✓ 24/7 support ✓ Certified translators
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
