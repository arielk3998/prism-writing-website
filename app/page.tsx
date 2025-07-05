'use client'

import React from 'react'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { ServicesShowcase } from '@/components/services-showcase'
import { TranslationServiceCard } from '@/components/TranslationNavigationItems'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        
        {/* Featured Translation Service Card */}
        <section className="py-16 px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Service
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Professional translation solutions for global communication
            </p>
          </div>
          <TranslationServiceCard />
        </section>
        
        <ServicesShowcase />
      </main>
      <Footer />
    </div>
  )
}
