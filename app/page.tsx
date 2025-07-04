'use client'

import React from 'react'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { ServicesShowcase } from '@/components/services-showcase'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ServicesShowcase />
      </main>
      <Footer />
    </div>
  )
}
