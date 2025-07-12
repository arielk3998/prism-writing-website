'use client';

import React from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import SampleDocumentTranslator from '../../components/SampleDocumentTranslator';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { 
  Globe, 
  FileText, 
  Award, 
  TrendingUp, 
  ArrowRight, 
  Star,
  CheckCircle,
  Sparkles,
  Zap
} from 'lucide-react';

const portfolioSamples = [
  {
    title: "Enterprise Software Documentation",
    description: "Global API documentation translated for Fortune 500 development teams across 12 countries",
    originalText: "This API endpoint enables developers to authenticate users and manage session tokens securely. The response includes a JWT token that must be included in subsequent requests to maintain session integrity.",
    languages: ["English → Japanese", "English → German", "English → Spanish", "English → French"],
    client: "TechCorp International",
    industry: "Technology",
    projectValue: "$45,000",
    deliveryTime: "72 hours",
    icon: FileText,
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    title: "Global Marketing Campaign Localization",
    description: "Brand messaging and marketing materials localized for European and Asian markets with cultural adaptation",
    originalText: "Our revolutionary solution transforms how businesses connect with customers, delivering unprecedented value through cutting-edge technology and innovative user experiences.",
    languages: ["English → French", "English → Mandarin", "English → Korean", "English → Portuguese"],
    client: "Global Brands Inc.",
    industry: "Marketing",
    projectValue: "$78,000",
    deliveryTime: "48 hours",
    icon: Globe,
    gradient: "from-purple-500 to-pink-600"
  },
  {
    title: "International Legal Documentation",
    description: "Complex contract and compliance documentation for multinational expansion with certified legal accuracy",
    originalText: "This agreement shall be governed by the laws of the jurisdiction in which the principal place of business is located, without regard to conflict of law principles and international arbitration standards.",
    languages: ["English → Spanish", "English → Portuguese", "English → Italian", "English → Dutch"],
    client: "LegalTech Solutions",
    industry: "Legal",
    projectValue: "$125,000",
    deliveryTime: "96 hours",
    icon: Award,
    gradient: "from-emerald-500 to-teal-600"
  }
];

const stats = [
  { label: "Projects Completed", value: "2,500+", icon: TrendingUp },
  { label: "Languages Supported", value: "80+", icon: Globe },
  { label: "Client Satisfaction", value: "99.8%", icon: Star },
  { label: "Average Delivery", value: "24hrs", icon: Zap }
];

export default function PortfolioPage() {
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
                Award-Winning Translation Excellence
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-safe mb-8">
                Portfolio of 
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"> Excellence</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-safe-muted max-w-3xl mx-auto leading-relaxed mb-12">
                Discover how we've helped global brands communicate across cultures 
                with precision, impact, and measurable results.
              </p>
              
              {/* Premium Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-safe mb-2">{stat.value}</div>
                    <div className="text-sm text-safe-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container py-24">
          {/* Interactive Demo Section - Stripe-inspired */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-safe mb-6">
                Experience Our Translation Magic
              </h2>
              <p className="text-xl text-safe-muted max-w-3xl mx-auto">
                Try our interactive demo with real project samples from Fortune 500 clients. 
                See the quality and precision that sets us apart.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-8">
                <SampleDocumentTranslator />
              </div>
            </div>
          </div>

          {/* Premium Portfolio Samples Grid */}
          <div>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-safe mb-6">
                Featured Success Stories
              </h2>
              <p className="text-xl text-safe-muted max-w-3xl mx-auto">
                Explore real projects from industry leaders who trust Prism Writing 
                to deliver exceptional results across global markets.
              </p>
            </div>
            
            <div className="grid gap-8">
              {portfolioSamples.map((sample, index) => (
                <Card key={index} className="overflow-hidden border-0 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${sample.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <CardContent className="relative p-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Project Info */}
                      <div className="lg:w-1/3">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className={`w-16 h-16 bg-gradient-to-br ${sample.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                            <sample.icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-safe-muted uppercase tracking-wide">{sample.industry}</div>
                            <h3 className="text-2xl font-bold text-safe">
                              {sample.title}
                            </h3>
                          </div>
                        </div>
                        
                        <p className="text-safe-muted mb-6 leading-relaxed">
                          {sample.description}
                        </p>
                        
                        {/* Project Metrics */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                            <div className="text-2xl font-bold text-safe">{sample.projectValue}</div>
                            <div className="text-sm text-safe-muted">Project Value</div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                            <div className="text-2xl font-bold text-safe">{sample.deliveryTime}</div>
                            <div className="text-sm text-safe-muted">Delivery Time</div>
                          </div>
                        </div>
                        
                        <div className="text-sm font-medium text-safe-muted mb-2">Client:</div>
                        <div className="text-lg font-semibold text-safe">{sample.client}</div>
                      </div>

                      {/* Content Preview */}
                      <div className="lg:w-2/3">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-6">
                          <h4 className="font-semibold text-safe mb-3 flex items-center">
                            <FileText className="w-5 h-5 mr-2" />
                            Original Content Sample:
                          </h4>
                          <p className="text-safe italic leading-relaxed">
                            "{sample.originalText}"
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-semibold text-safe flex items-center">
                            <Globe className="w-5 h-5 mr-2" />
                            Languages Delivered:
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {sample.languages.map((lang, idx) => (
                              <span key={idx} className="px-4 py-2 bg-blue-50 dark:bg-blue-950/30 text-safe-accent rounded-full text-sm font-medium">
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Premium Call to Action Section */}
          <div className="text-center py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-safe mb-6">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl text-safe-muted max-w-3xl mx-auto mb-12">
              Experience the same world-class quality and exceptional results that our 
              Fortune 500 clients trust for their most critical projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/translation-quote">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/translation-services">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold rounded-xl border-2 hover:shadow-lg transition-all duration-300">
                  <Globe className="w-5 h-5 mr-2" />
                  Explore All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
