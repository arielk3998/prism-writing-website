"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Languages, Sparkles, ArrowRight, Play, Pause, CheckCircle, Star, FileText, PenTool } from 'lucide-react';
import Link from 'next/link';

interface DocumentationExample {
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

  const examples: DocumentationExample[] = useMemo(() => [
    {
      id: '1',
      source: 'Clear API documentation drives developer adoption and reduces support requests',
      target: 'Well-structured endpoints with examples, authentication guides, and error handling',
      sourceLang: 'Challenge',
      targetLang: 'Solution',
      category: 'API Documentation',
      flag: '🔧',
      targetFlag: '📚'
    },
    {
      id: '2',
      source: 'Complex software features need user-friendly guides for successful adoption',
      target: 'Step-by-step tutorials with screenshots, troubleshooting, and best practices',
      sourceLang: 'Problem',
      targetLang: 'Result',
      category: 'User Manuals',
      flag: '❓',
      targetFlag: '✅'
    },
    {
      id: '3',
      source: 'Organizational processes require standardized procedures for consistency',
      target: 'Detailed SOPs with roles, responsibilities, and compliance frameworks',
      sourceLang: 'Need',
      targetLang: 'Delivery',
      category: 'Standard Operating Procedures',
      flag: '📋',
      targetFlag: '�'
    }
  ], []);

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
  }, [currentExample, isPlaying, examples]);

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
      title: "API Documentation",
      description: "Comprehensive API documentation including endpoint references, authentication guides, and developer resources",
      features: ["REST API docs", "Authentication guides", "Code examples", "Error handling"]
    },
    {
      icon: PenTool,
      title: "User Manual Creation", 
      description: "Professional user manuals and guides for software applications and technical products",
      features: ["Installation guides", "Feature documentation", "Troubleshooting", "Best practices"]
    },
    {
      icon: Globe,
      title: "Standard Operating Procedures",
      description: "Detailed SOPs for IT systems, quality management, compliance, and organizational processes",
      features: ["Process documentation", "Compliance SOPs", "Training materials", "Quality systems"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechFlow Systems",
      quote: "Prism Writing's API documentation transformed our developer experience. Clear, comprehensive, and exactly what we needed.",
      rating: 5
    },
    {
      name: "Marco Rodriguez", 
      company: "DevTools Inc.",
      quote: "Their technical writing expertise helped us create user manuals that actually get used. Outstanding quality and attention to detail.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                Prism Writing
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/services" className="hover:text-emerald-200 transition-colors">Services</Link>
              <Link href="/about" className="hover:text-emerald-200 transition-colors">About</Link>
              <Link href="/portfolio" className="hover:text-emerald-200 transition-colors">Portfolio</Link>
              <Link href="/login" className="bg-white text-slate-800 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors font-medium">
                Login
              </Link>
              <Link href="/register" className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg transition-colors font-medium">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Animated Translation Showcase */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-20">
        {/* Floating Animation Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-20"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 8 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <div className="mb-4 inline-flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0 px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Professional Technical Writing
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                Clear Documentation
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent block">
                  That Actually Works
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transform complex technical information into clear, actionable documentation that empowers users and drives business success
              </p>
            </motion.div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <div className="flex gap-2">
                {examples.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentExample(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentExample ? 'bg-emerald-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Translation Showcase */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              layout
              className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-0"
            >
              {/* Category and Language Info */}
              <div className="flex justify-between items-center mb-8">
                <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-sm">
                  {currentEx.category}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{currentEx.flag}</span>
                    <span>{currentEx.sourceLang}</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{currentEx.targetFlag}</span>
                    <span>{currentEx.targetLang}</span>
                  </div>
                </div>
              </div>

              {/* Source Text */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-gray-900">Original Text</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                  <p className="text-xl text-gray-800 font-medium min-h-[3rem] flex items-center">
                    {typingText}
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="ml-1 w-0.5 h-6 bg-emerald-600 inline-block"
                    />
                  </p>
                </div>
              </div>

              {/* Transformation Animation */}
              <div className="flex justify-center mb-8">
                <motion.div
                  animate={{
                    rotate: showTranslation ? 360 : 0,
                    scale: showTranslation ? [1, 1.2, 1] : 1
                  }}
                  transition={{ duration: 1 }}
                  className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center"
                >
                  <Languages className="w-8 h-8 text-white" />
                </motion.div>
              </div>

              {/* Translated Text */}
              <AnimatePresence mode="wait">
                {showTranslation && (
                  <motion.div
                    key={currentEx.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      <span className="font-semibold text-gray-900">Professional Translation</span>
                    </div>
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6 border-2 border-emerald-200">
                      <p className="text-xl text-gray-800 font-medium">
                        {currentEx.target}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 bg-white rounded-xl p-6 shadow-lg"
            >
              {[
                { number: '40+', label: 'Languages' },
                { number: '500+', label: 'Projects' },
                { number: '95%', label: 'Accuracy' },
                { number: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 text-lg rounded-lg transition-all duration-300 inline-flex items-center justify-center"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg rounded-lg transition-all duration-300 inline-flex items-center justify-center"
              >
                View All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Technical Writing Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert technical writing solutions that transform complex information into clear, actionable documentation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg bg-white rounded-lg p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by businesses worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="border-0 shadow-lg bg-white rounded-lg p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">&quot;{testimonial.quote}&quot;</p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Documentation?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join innovative companies that trust us to create clear, effective technical documentation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="bg-emerald-600 text-white hover:bg-emerald-500 text-lg px-8 py-4 rounded-lg transition-colors inline-flex items-center justify-center">
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/about" className="text-lg px-8 py-4 border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-slate-900 rounded-lg transition-colors inline-flex items-center justify-center">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
