/**
 * Customer Signup Page
 * 
 * Public registration page for new clients to create accounts
 * and submit project requests.
 * 
 * @module CustomerSignup
 * @version 1.0.0
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ModernNavigation, ModernButton } from '../../components/ui/ModernComponents';
import { DarkModeToggle } from '../../components/ui/DarkModeToggle';
import { useAuth } from '../../contexts/AuthContext';

export default function CustomerSignup() {
  const { register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    phone: '',
    projectType: '',
    projectDescription: '',
    budget: '',
    timeline: ''
  });

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate password confirmation
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        setIsSubmitting(false);
        return;
      }

      if (formData.password.length < 6) {
        alert('Password must be at least 6 characters long');
        setIsSubmitting(false);
        return;
      }

      // Register the client
      const success = await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.name.split(' ')[0],
        lastName: formData.name.split(' ').slice(1).join(' ') || '',
      });

      if (success) {
        // Store additional client information
        const clientData = {
          company: formData.company,
          phone: formData.phone,
          projectType: formData.projectType,
          projectDescription: formData.projectDescription,
          budget: formData.budget,
          timeline: formData.timeline
        };
        localStorage.setItem(`client-data-${formData.email}`, JSON.stringify(clientData));

        alert('Account created successfully! You can now log in to track your project.');
        window.location.href = '/portal-enhanced';
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      alert('Registration failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <ModernNavigation
        logo={
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Prism Writing
            </span>
          </Link>
        }
        navItems={navItems}
        actions={
          <div className="flex items-center space-x-3">
            <DarkModeToggle />
            <Link href="/contact">
              <ModernButton variant="outline" size="sm">
                Get Quote
              </ModernButton>
            </Link>
            <Link href="/portal-enhanced">
              <ModernButton variant="primary" size="sm">
                Login
              </ModernButton>
            </Link>
          </div>
        }
      />

      <main className="pt-20">
        {/* Header */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">📝</span>
                <h1 className="text-4xl font-bold text-white">
                  Start Your Project
                </h1>
              </div>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Join hundreds of companies that trust Prism Writing Cooperative 
                for their technical documentation needs.
              </p>
              <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-100 px-4 py-2 rounded-lg">
                <span className="text-lg">🚀</span>
                <span className="font-medium">Free account • No commitment • Get started today</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Signup Form */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Create Your Account
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Tell us about your project and get matched with expert technical writers
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Account Security */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Account Security
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Password *
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        minLength={6}
                        required
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Minimum 6 characters
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Project Information */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Project Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Project Type
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="">Select project type</option>
                        <option value="api-documentation">API Documentation</option>
                        <option value="user-manuals">User Manuals</option>
                        <option value="sops">Standard Operating Procedures</option>
                        <option value="training-materials">Training Materials</option>
                        <option value="compliance-docs">Compliance Documentation</option>
                        <option value="other">Other / Custom Project</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Estimated Budget
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-5k">Under $5,000</option>
                        <option value="5k-15k">$5,000 - $15,000</option>
                        <option value="15k-30k">$15,000 - $30,000</option>
                        <option value="30k-plus">$30,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Description
                    </label>
                    <textarea
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Tell us about your project, target audience, and any specific requirements..."
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP (Rush Project)</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="2-3-months">2-3 months</option>
                      <option value="3-plus-months">3+ months</option>
                      <option value="flexible">Flexible timeline</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <ModernButton
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isSubmitting}
                  >
                    {isSubmitting ? 'Creating Account...' : 'Create Account & Start Project'}
                  </ModernButton>
                </div>

                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Already have an account?{' '}
                    <Link href="/portal-enhanced" className="text-blue-600 hover:text-blue-700 font-medium">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose Prism Writing?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Professional technical writing that drives results
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '⚡',
                  title: 'Fast Turnaround',
                  description: 'Get your documentation delivered on time, every time'
                },
                {
                  icon: '🎯',
                  title: 'Expert Writers',
                  description: 'Work with specialists in your industry and technology'
                },
                {
                  icon: '💎',
                  title: 'Premium Quality',
                  description: 'Professional documentation that exceeds expectations'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
