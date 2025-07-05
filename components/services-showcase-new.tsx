'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Globe, 
  FileText, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Heart,
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Star,
  Zap,
  Award,
  BarChart3,
  Languages
} from 'lucide-react'

interface TranslationService {
  id: string
  icon: any
  title: string
  description: string
  features: string[]
  price: string
  turnaround: string
  accuracy: string
  popular: boolean
}

interface WritingService {
  id: string
  icon: any
  title: string
  description: string
  features: string[]
  price: string
  turnaround: string
  popular: boolean
}

const translationServices: TranslationService[] = [
  {
    id: 'document',
    icon: FileText,
    title: 'Document Translation',
    description: 'Professional translation of legal, medical, technical, and business documents.',
    features: ['Legal Documents', 'Medical Records', 'Technical Manuals', 'Financial Reports'],
    price: 'From $0.12/word',
    turnaround: '24-48 hours',
    accuracy: '99.9%',
    popular: true,
  },
  {
    id: 'website',
    icon: Globe,
    title: 'Website Localization',
    description: 'Complete website translation and cultural adaptation for global markets.',
    features: ['UI/UX Translation', 'SEO Optimization', 'Cultural Adaptation', 'CMS Integration'],
    price: 'From $0.15/word',
    turnaround: '3-7 days',
    accuracy: '99.8%',
    popular: false,
  },
  {
    id: 'certified',
    icon: Award,
    title: 'Certified Translation',
    description: 'Official certified translations for legal and official use.',
    features: ['Notarized Documents', 'Court Certified', 'Immigration Papers', 'Academic Records'],
    price: 'From $35/page',
    turnaround: '1-3 days',
    accuracy: '100%',
    popular: false,
  },
  {
    id: 'business',
    icon: Briefcase,
    title: 'Business Translation',
    description: 'Professional translation of business documents and communications.',
    features: ['Contracts & Agreements', 'Marketing Materials', 'Email Communications', 'Presentations'],
    price: 'From $0.18/word',
    turnaround: '2-4 days',
    accuracy: '99.7%',
    popular: false,
  },
]

const writingServices: WritingService[] = [
  {
    id: 'business',
    icon: Briefcase,
    title: 'Business Writing',
    description: 'Professional business content that drives results and engagement.',
    features: ['Marketing Copy', 'Business Plans', 'Proposals', 'Email Campaigns'],
    price: 'From $0.20/word',
    turnaround: '2-5 days',
    popular: true,
  },
  {
    id: 'academic',
    icon: GraduationCap,
    title: 'Academic Writing',
    description: 'Scholarly writing and research support for students and professionals.',
    features: ['Research Papers', 'Dissertations', 'Grant Proposals', 'Academic Editing'],
    price: 'From $0.25/word',
    turnaround: '3-7 days',
    popular: false,
  },
  {
    id: 'creative',
    icon: Heart,
    title: 'Creative Writing',
    description: 'Engaging creative content for brands, publications, and personal projects.',
    features: ['Blog Posts', 'Social Media', 'Scripts', 'Storytelling'],
    price: 'From $0.18/word',
    turnaround: '1-4 days',
    popular: false,
  },
  {
    id: 'technical',
    icon: FileText,
    title: 'Technical Writing',
    description: 'Clear, precise technical documentation and instructional content.',
    features: ['User Manuals', 'API Documentation', 'Software Guides', 'Process Documents'],
    price: 'From $0.30/word',
    turnaround: '3-7 days',
    popular: false,
  },
]

const languages = [
  { name: 'Spanish', speakers: '500M+', flag: '🇪🇸' },
  { name: 'French', speakers: '280M+', flag: '🇫🇷' },
  { name: 'German', speakers: '100M+', flag: '🇩🇪' },
  { name: 'Chinese', speakers: '1.1B+', flag: '🇨🇳' },
  { name: 'Japanese', speakers: '125M+', flag: '🇯🇵' },
  { name: 'Portuguese', speakers: '260M+', flag: '🇵🇹' },
  { name: 'Arabic', speakers: '400M+', flag: '🇸🇦' },
  { name: 'Russian', speakers: '150M+', flag: '🇷🇺' },
]

interface ServicesShowcaseProps {
  className?: string
}

export function ServicesShowcase({ className }: ServicesShowcaseProps) {
  const [activeTab, setActiveTab] = useState<'translation' | 'writing'>('translation')

  return (
    <section className="bg-background section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="text-center space-y-6 section-header">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors">
            <Star className="w-4 h-4 mr-2" />
            <span>Premium Services</span>
          </div>
          <h2 className="heading-1">
            Professional Services That
            <span className="block gradient-text">Drive Global Success</span>
          </h2>
          <p className="body-large text-muted max-w-4xl mx-auto leading-relaxed">
            From translation to content creation, we provide comprehensive language services 
            that help businesses communicate effectively across cultures and markets.
          </p>
        </div>

        {/* Service Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-surface rounded-lg p-1 border border-border">
            <button
              onClick={() => setActiveTab('translation')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'translation'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Globe className="w-4 h-4 mr-2 inline" />
              Translation Services
            </button>
            <button
              onClick={() => setActiveTab('writing')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'writing'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <FileText className="w-4 h-4 mr-2 inline" />
              Writing Services
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {activeTab === 'translation' 
            ? translationServices.map((service) => (
                <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden border border-border">
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                      Popular
                    </div>
                  )}
                  
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                      <service.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">{service.title}</CardTitle>
                    <p className="text-sm text-muted leading-relaxed">{service.description}</p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted">Price:</span>
                        <span className="font-medium text-primary">{service.price}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted">Turnaround:</span>
                        <span className="font-medium">{service.turnaround}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted">Accuracy:</span>
                        <span className="font-medium text-green-600">{service.accuracy}</span>
                      </div>
                    </div>

                    <Button className="w-full group-hover:shadow-md transition-all duration-300" variant="outline">
                      <span>Get Quote</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))
            : writingServices.map((service) => (
                <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden border border-border">
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                      Popular
                    </div>
                  )}
                  
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                      <service.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">{service.title}</CardTitle>
                    <p className="text-sm text-muted leading-relaxed">{service.description}</p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted">Price:</span>
                        <span className="font-medium text-primary">{service.price}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted">Turnaround:</span>
                        <span className="font-medium">{service.turnaround}</span>
                      </div>
                    </div>

                    <Button className="w-full group-hover:shadow-md transition-all duration-300" variant="outline">
                      <span>Get Quote</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))
          }
        </div>

        {/* Languages Section */}
        <div className="text-center mb-12">
          <h3 className="heading-3 text-foreground mb-4">
            <Languages className="w-8 h-8 inline mr-3 text-primary" />
            Available in 80+ Languages
          </h3>
          <p className="text-muted mb-8 max-w-2xl mx-auto">
            Professional translation services for every major world language with native-speaking experts.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
            {languages.map((language) => (
              <div key={language.name} className="card text-center hover:bg-surface transition-colors p-4">
                <div className="text-2xl mb-2">{language.flag}</div>
                <div className="font-medium text-sm text-foreground">{language.name}</div>
                <div className="text-xs text-muted">{language.speakers}</div>
              </div>
            ))}
          </div>
          
          <p className="text-sm text-muted mb-6">
            ...and 87 more languages including regional dialects and specialized technical vocabularies.
          </p>
          
          <Link href="/translation-services">
            <Button size="lg" className="hover:shadow-lg transition-all duration-300">
              <Globe className="w-5 h-5 mr-2" />
              View All Languages
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* CTA Section */}
        <div className="text-center gradient-primary rounded-2xl p-12 text-white">
          <h3 className="heading-3 mb-4">Ready to Get Started?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of businesses that trust us with their global communication needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/translation-quote">
              <Button size="lg" className="btn-white text-center">
                <Zap className="w-5 h-5 mr-2" />
                Get Instant Quote
              </Button>
            </Link>
            <Link href="/translation-services">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Globe className="w-5 h-5 mr-2" />
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
