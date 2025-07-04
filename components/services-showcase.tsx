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
  Languages,
  Headphones
} from 'lucide-react'

const translationServices = [
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
    id: 'interpretation',
    icon: Headphones,
    title: 'Interpretation Services',
    description: 'Live interpretation for meetings, conferences, and events.',
    features: ['Simultaneous', 'Consecutive', 'Remote', 'On-site'],
    price: 'From $150/hour',
    turnaround: 'Real-time',
    accuracy: '99.5%',
    popular: false,
  },
]

const writingServices = [
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
    <section className={`py-20 md:py-24 lg:py-28 bg-background ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors">
            <Star className="w-4 h-4 mr-2" />
            <span>Premium Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground">
            Professional Services That
            <span className="block gradient-text bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">Drive Global Success</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From translation to content creation, we provide comprehensive language services 
            that help businesses communicate effectively across cultures and markets.
          </p>
        </div>

        {/* Service Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-muted/70 backdrop-blur-sm rounded-xl p-1 flex border border-border/50 shadow-lg">
            <button
              onClick={() => setActiveTab('translation')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'translation'
                  ? 'bg-background text-foreground shadow-md border border-border/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              <Globe className="w-4 h-4 mr-2 inline" />
              Translation Services
            </button>
            <button
              onClick={() => setActiveTab('writing')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'writing'
                  ? 'bg-background text-foreground shadow-md border border-border/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              <FileText className="w-4 h-4 mr-2 inline" />
              Writing Services
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {(activeTab === 'translation' ? translationServices : writingServices).map((service) => (
            <Card key={service.id} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.02] border border-border/50 bg-white/80 backdrop-blur-sm">
              {service.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                  Popular
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <service.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">{service.title}</CardTitle>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
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
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium text-primary">{service.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Turnaround:</span>
                    <span className="font-medium">{service.turnaround}</span>
                  </div>
                  {'accuracy' in service && service.accuracy && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Accuracy:</span>
                      <span className="font-medium text-green-600">{service.accuracy}</span>
                    </div>
                  )}
                </div>

                <Link href={`/${activeTab}-services/${service.id}`}>
                  <Button variant="outline" className="w-full group">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Language Support Section */}
        {activeTab === 'translation' && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                <Languages className="w-6 h-6 inline mr-2" />
                95+ Languages Supported
              </h3>
              <p className="text-muted-foreground">
                Professional translation services in the world's most spoken languages
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {languages.map((language) => (
                <div key={language.name} className="text-center p-4 bg-white rounded-lg border border-white/50 hover:shadow-md transition-all">
                  <div className="text-2xl mb-2">{language.flag}</div>
                  <div className="font-medium text-sm">{language.name}</div>
                  <div className="text-xs text-muted-foreground">{language.speakers}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quality Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-100">
            <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">Quality Guarantee</h4>
            <p className="text-sm text-muted-foreground">
              99.8% accuracy rate with unlimited revisions until you're satisfied
            </p>
          </div>
          
          <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">Fast Delivery</h4>
            <p className="text-sm text-muted-foreground">
              Rush delivery available with same-day turnaround for urgent projects
            </p>
          </div>
          
          <div className="text-center p-6 bg-purple-50 rounded-2xl border border-purple-100">
            <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">Expert Team</h4>
            <p className="text-sm text-muted-foreground">
              Native speakers with specialized knowledge in your industry
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link href="/translation-quote">
            <Button size="lg" className="text-lg px-8 py-6 h-auto">
              <Zap className="w-5 h-5 mr-2" />
              Get Your Free Quote Now
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Get an instant quote in under 30 seconds • No commitment required
          </p>
        </div>
      </div>
    </section>
  )
}
