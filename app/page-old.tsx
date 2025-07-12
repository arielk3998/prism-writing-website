"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Languages, Sparkles, ArrowRight, Play, Pause, CheckCircle, Star, FileText, PenTool, Users } from 'lucide-react';
import Link from 'next/link';

interface TranslationExample {
  id: string;
  source: string;
  target: string;
  sourceLang: string;
  targetLang: string;
  category: string;
  flag: string;
  targetFlag: string;
}

export default function HomePage() {
  const [currentExample, setCurrentExample] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [typingText, setTypingText] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);

  const examples: TranslationExample[] = [
    {
      id: '1',
      source: 'Transform your global reach with professional translation services',
      target: 'Transformez votre portée mondiale avec des services de traduction professionnels',
      sourceLang: 'English',
      targetLang: 'French',
      category: 'Marketing',
      flag: '🇺🇸',
      targetFlag: '🇫🇷'
    },
    {
      id: '2',
      source: 'Innovation drives success in today\'s digital marketplace',
      target: 'La innovación impulsa el éxito en el mercado digital actual',
      sourceLang: 'English',
      targetLang: 'Spanish',
      category: 'Business',
      flag: '🇺🇸',
      targetFlag: '🇪🇸'
    },
    {
      id: '3',
      source: 'Quality assurance ensures excellence in every project',
      target: 'Qualitätssicherung gewährleistet Exzellenz in jedem Projekt',
      sourceLang: 'English',
      targetLang: 'German',
      category: 'Technical',
      flag: '🇺🇸',
      targetFlag: '🇩🇪'
    }
  ];

  // Typing animation effect
  useEffect(() => {
    if (!isPlaying) return;

    const example = examples[currentExample];
    let currentText = '';
    let charIndex = 0;

    setShowTranslation(false);
    setTypingText('');

    const typeInterval = setInterval(() => {
      if (charIndex < example.source.length) {
        currentText += example.source[charIndex];
        setTypingText(currentText);
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setShowTranslation(true), 800);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentExample, isPlaying]);

  // Auto-advance examples
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % examples.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying, examples.length]);

  const currentEx = examples[currentExample];

  const services = [
    {
      icon: FileText,
      title: "Document Translation",
      description: "Professional translation across 40+ languages with industry expertise",
      features: ["Certified translations", "Native speaker review", "Legal & medical specialization"]
    },
    {
      icon: Globe,
      title: "Website Localization", 
      description: "Complete cultural adaptation for international markets",
      features: ["SEO optimization", "CMS integration", "Cultural consulting"]
    },
    {
      icon: PenTool,
      title: "Content Writing",
      description: "Native content creation that resonates with local audiences",
      features: ["Marketing copy", "Technical writing", "Social media content"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechGlobal Inc.",
      quote: "Prism Writing transformed our global expansion. Their technical translation expertise is unmatched.",
      rating: 5
    },
    {
      name: "Marco Rodriguez", 
      company: "Healthcare Solutions",
      quote: "The quality and cultural sensitivity of their medical translations gave us complete confidence.",
      rating: 5
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', fontFamily: 'system-ui, sans-serif' }}>
      {/* Navigation */}
      <nav style={{ backgroundColor: '#2563eb', color: 'white', padding: '1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Prism Writing</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/login" style={{ color: 'white', textDecoration: 'underline' }}>Login</Link>
            <Link href="/register" style={{ color: 'white', textDecoration: 'underline' }}>Register</Link>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Hero Section */}
        <section style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
            Professional Translation & Writing Services
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '2rem' }}>
            Fast, accurate, and culturally adapted content for global businesses
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              href="/services" 
              style={{ 
                backgroundColor: '#2563eb', 
                color: 'white', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '0.5rem', 
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Our Services
            </Link>
            <Link 
              href="/translation-quote" 
              style={{ 
                border: '1px solid #2563eb', 
                color: '#2563eb', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '0.5rem', 
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Get Quote
            </Link>
          </div>
        </section>

        {/* Services Section */}
        <section style={{ padding: '4rem 0' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem', color: '#1f2937' }}>
            Featured Services
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Document Translation
              </h3>
              <p style={{ color: '#6b7280' }}>
                Professional translation of documents in 80+ languages
              </p>
            </div>
            <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Website Localization
              </h3>
              <p style={{ color: '#6b7280' }}>
                Culturally adapted content for global markets
              </p>
            </div>
            <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Content Writing
              </h3>
              <p style={{ color: '#6b7280' }}>
                Expert writing services for businesses
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ padding: '4rem 0', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#1f2937' }}>
            Ready to Get Started?
          </h2>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              href="/register"
              style={{ 
                backgroundColor: '#059669', 
                color: 'white', 
                padding: '1rem 2rem', 
                borderRadius: '0.5rem', 
                fontSize: '1.125rem',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Create Account
            </Link>
            <Link 
              href="/login"
              style={{ 
                backgroundColor: '#2563eb', 
                color: 'white', 
                padding: '1rem 2rem', 
                borderRadius: '0.5rem', 
                fontSize: '1.125rem',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Sign In
            </Link>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer style={{ backgroundColor: '#1f2937', color: 'white', padding: '2rem', textAlign: 'center' }}>
        <p>&copy; 2025 Prism Writing. Professional translation and writing services.</p>
      </footer>
    </div>
  )
}
