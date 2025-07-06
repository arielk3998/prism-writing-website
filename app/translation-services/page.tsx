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
  Zap,
  Star,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import SampleDocumentTranslator from '../../components/SampleDocumentTranslator';
import { getMostSpokenLanguages } from '../../lib/languages';
import { spacing, borderRadius, shadows, colors, typography } from '@/lib/design-tokens';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function TranslationServicesPage() {
  const popularLanguages = getMostSpokenLanguages(12);
  
  const serviceTypes = [
    {
      icon: Briefcase,
      title: 'Enterprise Business Translation',
      description: 'Transform your global business communications with precision translations that maintain brand voice and cultural relevance',
      examples: ['Executive presentations', 'Strategic marketing campaigns', 'Annual reports', 'Product documentation'],
      gradient: 'from-blue-500 to-indigo-600',
      popular: true
    },
    {
      icon: Scale,
      title: 'Certified Legal Translation',
      description: 'Expert legal document translation by qualified legal professionals with certified accuracy for international compliance',
      examples: ['International contracts', 'Court documents', 'Patent applications', 'Regulatory compliance'],
      gradient: 'from-purple-500 to-pink-600',
      popular: false
    },
    {
      icon: Heart,
      title: 'Medical & Pharmaceutical',
      description: 'Specialized medical translation services ensuring accuracy in healthcare communications and pharmaceutical documentation',
      examples: ['Clinical trial protocols', 'Medical device manuals', 'Patient safety information', 'Regulatory submissions'],
      gradient: 'from-emerald-500 to-teal-600',
      popular: false
    },
    {
      icon: BookOpen,
      title: 'Technical Documentation',
      description: 'Comprehensive technical translation for engineering, software, and scientific content with industry-specific expertise',
      examples: ['API documentation', 'User manuals', 'Technical specifications', 'Software localization'],
      gradient: 'from-orange-500 to-red-600',
      popular: false
    },
    {
      icon: GraduationCap,
      title: 'Academic & Research',
      description: 'Scholarly translation services for academic institutions, researchers, and educational organizations worldwide',
      examples: ['Research publications', 'Dissertations', 'Academic journals', 'Educational materials'],
      gradient: 'from-indigo-500 to-purple-600',
      popular: false
    },
    {
      icon: FileText,
      title: 'Document Certification',
      description: 'Official document translation with certified accuracy for legal, immigration, and business purposes',
      examples: ['Birth certificates', 'Academic transcripts', 'Financial statements', 'Immigration documents'],
      gradient: 'from-teal-500 to-cyan-600',
      popular: false
    }
  ];

  const premiumFeatures = [
    {
      icon: Globe,
      title: '80+ Elite Languages',
      description: 'Comprehensive coverage including rare languages and specialized dialects with native-speaker excellence',
      stat: '80+',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Users,
      title: 'Certified Experts',
      description: 'Hand-picked native speakers with advanced degrees and 10+ years of specialized industry experience',
      stat: '500+',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Clock,
      title: 'Lightning Delivery',
      description: 'Premium 12-24 hour turnaround with real-time project tracking and instant communication',
      stat: '24hrs',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption, comprehensive NDAs, and ISO-certified security protocols for maximum confidentiality',
      stat: '100%',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Award,
      title: 'Certified Excellence',
      description: 'ISO 17100 certified translation process with triple-verification quality assurance standards',
      stat: '99.9%',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      icon: Zap,
      title: 'AI-Enhanced Precision',
      description: 'Cutting-edge AI tools combined with human expertise for unmatched consistency and accuracy',
      stat: '3X',
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  const stats = [
    { number: '80+', label: 'Languages Supported' },
    { number: '120+', label: 'Expert Translators' },
    { number: '2,500+', label: 'Projects Completed' },
    { number: '99.8%', label: 'Accuracy Rate' },
    { number: '48h', label: 'Average Turnaround' },
    { number: '25+', label: 'Industries Served' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Premium Hero Section - Apple-inspired */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-950 dark:via-blue-950/30 dark:to-indigo-950/20">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
          <div className="relative container py-24 lg:py-32">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-blue-50 text-safe-accent ring-1 ring-blue-700/10 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-300/20 mb-8">
                <Sparkles className="w-4 h-4 mr-2" />
                World's Premier Translation Platform
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-safe mb-8">
                Connect Globally with 
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"> Perfect Precision</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-safe-muted max-w-3xl mx-auto leading-relaxed mb-12">
                Enterprise-grade translation services that break language barriers and 
                unlock global opportunities with unmatched accuracy and cultural intelligence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Link href="/translation-quote">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Get Instant Quote
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold rounded-xl border-2 hover:shadow-lg transition-all duration-300">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Speak with Expert
                </Button>
              </div>
            </div>
          </div>
        </div>

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
              {premiumFeatures.map((feature, index) => (
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
            <h2 className="heading-2 mb-6 text-white drop-shadow-lg">
              🌍 80+ World Languages Available
            </h2>
            <p className="body-large mb-8 text-white/95 drop-shadow-md">
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
