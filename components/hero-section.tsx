'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, 
  Globe, 
  Clock, 
  Shield, 
  Star,
  CheckCircle,
  Users,
  FileText,
  Award,
  Zap
} from 'lucide-react'

const stats = [
  { value: '95+', label: 'Languages', icon: Globe },
  { value: '10K+', label: 'Projects Completed', icon: FileText },
  { value: '500+', label: 'Happy Clients', icon: Users },
  { value: '99.8%', label: 'Satisfaction Rate', icon: Star },
]

const features = [
  {
    icon: Clock,
    title: 'Lightning Fast',
    description: '24-48 hour turnaround for most projects'
  },
  {
    icon: Shield,
    title: 'Certified Quality',
    description: 'ISO-certified translators and editors'
  },
  {
    icon: Award,
    title: 'Industry Experts',
    description: 'Native speakers with domain expertise'
  },
  {
    icon: Zap,
    title: 'AI-Enhanced',
    description: 'Technology-assisted workflow for consistency'
  }
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 section-padding">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-r from-green-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-20 w-4 h-4 bg-blue-500 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-48 right-32 w-6 h-6 bg-purple-500 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-green-500 rounded-full animate-bounce opacity-50"></div>
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-yellow-500 rounded-full animate-bounce opacity-30"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
              <Award className="w-4 h-4 mr-2" />
              <span>Trusted by 500+ Global Companies</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="heading-1">
                <span className="block text-foreground">Professional</span>
                <span className="block gradient-text">Translation Services</span>
                <span className="block text-foreground">for Global Success</span>
              </h1>
              <p className="body-large text-muted max-w-4xl mx-auto leading-relaxed">
                Expert translation and localization services in <strong className="text-primary font-semibold">95+ languages</strong>. 
                Fast, accurate, and culturally adapted content that drives global growth.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/translation-quote">
                <Button size="lg" className="text-lg px-8 py-6 h-auto group hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Zap className="w-5 h-5 mr-2" />
                  Get Instant Quote
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/translation-services">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto hover:shadow-lg transition-all duration-300">
                  <Globe className="w-5 h-5 mr-2" />
                  Explore Services
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="font-medium">99.8% Client Satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="font-medium">ISO Certified</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center card-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 group">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={feature.title} className="card-white hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors group-hover:scale-110">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-muted rounded-full flex justify-center bg-white/20 backdrop-blur-sm">
          <div className="w-1 h-3 bg-muted rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
