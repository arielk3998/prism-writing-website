/**
 * Modern UI Components Library
 * 
 * A collection of reusable, modern UI components that implement the design system
 * and follow current technology website trends. Each component is built with
 * accessibility, performance, and visual excellence in mind.
 * 
 * Design Principles:
 * - Micro-interactions and subtle animations
 * - Glass-morphism and modern visual effects
 * - Consistent spacing and typography
 * - Responsive and mobile-first design
 * - Accessibility compliance (WCAG 2.1 AA)
 * 
 * @module ModernComponents
 * @version 2.0.0
 * @author Prism Writing Cooperative
 */

'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Modern Button Component
 * 
 * A versatile button component with multiple variants, sizes, and states.
 * Includes smooth animations, loading states, and accessibility features.
 * 
 * @param variant - Visual style variant (primary, secondary, outline, ghost)
 * @param size - Button size (sm, md, lg, xl)
 * @param isLoading - Shows loading spinner when true
 * @param disabled - Disables the button when true
 * @param fullWidth - Makes button full width when true
 * @param children - Button content
 * @param className - Additional CSS classes
 * @param onClick - Click handler function
 */
interface ModernButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const ModernButton: React.FC<ModernButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  children,
  className = '',
  onClick,
}) => {
  const baseClasses = `
    relative inline-flex items-center justify-center font-semibold rounded-lg
    transition-all duration-300 ease-smooth focus:outline-none focus:ring-2 
    focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
    hover:scale-105 active:scale-95 transform-gpu
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg
      hover:from-blue-600 hover:to-blue-700 hover:shadow-xl
      focus:ring-blue-500 active:from-blue-700 active:to-blue-800
    `,
    secondary: `
      bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 
      text-safe shadow-md
      hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-500 dark:hover:to-gray-600 
      hover:shadow-lg
      focus:ring-gray-500 dark:focus:ring-gray-400 
      active:from-gray-300 active:to-gray-400 dark:active:from-gray-700 dark:active:to-gray-800
    `,
    outline: `
      border-2 border-blue-500 dark:border-blue-400 text-safe-accent bg-transparent
      hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-600 dark:hover:border-blue-300 
      hover:text-safe-accent dark:hover:text-blue-300
      focus:ring-blue-500 dark:focus:ring-blue-400 active:bg-blue-100 dark:active:bg-blue-900/30
    `,
    ghost: `
      text-safe-muted bg-transparent 
      hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-safe dark:hover:text-white
      focus:ring-gray-500 dark:focus:ring-gray-400 active:bg-gray-200 dark:active:bg-gray-600
    `,
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {isLoading && (
        <motion.div
          className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}
      {children}
    </motion.button>
  );
};

/**
 * Modern Card Component
 * 
 * A flexible card component with glass-morphism effects, hover animations,
 * and multiple layout options.
 * 
 * @param variant - Visual style variant (default, elevated, glass, interactive)
 * @param padding - Internal padding size (sm, md, lg, xl)
 * @param children - Card content
 * @param className - Additional CSS classes
 * @param onClick - Click handler for interactive cards
 */
interface ModernCardProps {
  variant?: 'default' | 'elevated' | 'glass' | 'interactive';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const ModernCard: React.FC<ModernCardProps> = ({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  onClick,
}) => {
  const baseClasses = `
    rounded-xl transition-all duration-300 ease-smooth
  `;

  const variantClasses = {
    default: `
      bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm
      hover:shadow-md
    `,
    elevated: `
      bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl
      border border-gray-100 dark:border-gray-700
    `,
    glass: `
      bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg 
      border border-white/20 dark:border-gray-700/20 shadow-lg
      hover:bg-white/80 dark:hover:bg-gray-800/80 hover:shadow-xl
    `,
    interactive: `
      bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer
      hover:shadow-lg hover:scale-105 hover:-translate-y-1
      active:scale-100 active:translate-y-0
    `,
  };

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const CardComponent = onClick ? motion.div : 'div';

  return (
    <CardComponent
      className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
      onClick={onClick}
      {...(onClick && {
        whileHover: { y: -4, scale: 1.02 },
        whileTap: { y: 0, scale: 1 },
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, ease: 'easeOut' },
      })}
    >
      {children}
    </CardComponent>
  );
};

/**
 * Modern Hero Section Component
 * 
 * A stunning hero section with animated background effects, gradient overlays,
 * and dynamic content positioning.
 * 
 * @param title - Main headline text
 * @param subtitle - Secondary description text
 * @param backgroundImage - Optional background image URL
 * @param gradient - Background gradient overlay
 * @param children - Additional content (CTAs, etc.)
 * @param className - Additional CSS classes
 */
interface ModernHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  gradient?: string;
  children?: ReactNode;
  className?: string;
}

const ModernHero: React.FC<ModernHeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  children,
  className = '',
}) => {
  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: backgroundImage 
          ? `${gradient}, url(${backgroundImage})` 
          : gradient,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

/**
 * Modern Statistics Display Component
 * 
 * Animated statistics display with counting animations and visual emphasis.
 * 
 * @param stats - Array of statistic objects with value, label, and optional suffix
 * @param className - Additional CSS classes
 */
interface StatItem {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

interface ModernStatsProps {
  stats: StatItem[];
  className?: string;
}

const ModernStats: React.FC<ModernStatsProps> = ({
  stats,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('modern-stats');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div id="modern-stats" className={`grid grid-cols-2 lg:grid-cols-4 gap-8 ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <motion.div
            className="text-4xl lg:text-5xl font-bold text-safe-accent mb-2"
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1, type: 'spring' }}
          >
            {stat.prefix}
            <motion.span
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 2, delay: index * 0.2 }}
            >
              {isVisible ? (
                <CountingNumber target={stat.value} duration={2000} />
              ) : (
                0
              )}
            </motion.span>
            {stat.suffix}
          </motion.div>
          <div className="text-safe-muted font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

/**
 * Counting Number Animation Component
 * 
 * Animates numbers counting up from 0 to target value.
 */
interface CountingNumberProps {
  target: number;
  duration: number;
}

const CountingNumber: React.FC<CountingNumberProps> = ({ target, duration }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const increment = target / (duration / 16.67); // 60fps
    const timer = setInterval(() => {
      setCurrent(prev => {
        const next = prev + increment;
        if (next >= target) {
          clearInterval(timer);
          return target;
        }
        return next;
      });
    }, 16.67);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{Math.round(current)}</>;
};

/**
 * Modern Feature Grid Component
 * 
 * A responsive grid layout for showcasing features with icons, animations,
 * and hover effects.
 * 
 * @param features - Array of feature objects
 * @param columns - Number of columns (2, 3, or 4)
 * @param className - Additional CSS classes
 */
interface FeatureItem {
  icon: ReactNode;
  title: string;
  description: string;
  color?: string;
  href?: string;
}

interface ModernFeatureGridProps {
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const ModernFeatureGrid: React.FC<ModernFeatureGridProps> = ({
  features,
  columns = 3,
  className = '',
}) => {
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-8 ${className}`}>
      {features.map((feature, index) => {
        const cardContent = (
          <ModernCard
            variant="interactive"
            className={`h-full text-center transition-all duration-300 ${
              feature.href ? 'cursor-pointer hover:shadow-lg' : ''
            }`}
          >
            <motion.div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                feature.color || 'bg-blue-100 text-safe-accent'
              }`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {feature.icon}
            </motion.div>
            <h3 className="text-xl font-semibold text-safe mb-3">
              {feature.title}
            </h3>
            <p className="text-safe-muted leading-relaxed">
              {feature.description}
            </p>
            {feature.href && (
              <div className="mt-4 inline-flex items-center text-safe-accent hover:text-safe-accent font-medium text-sm">
                Learn More
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </ModernCard>
        );

        return (
          <motion.div
            key={index}
            className="group relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            {feature.href ? (
              <Link href={feature.href} className="block h-full">
                {cardContent}
              </Link>
            ) : (
              cardContent
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

/**
 * Modern Navigation Component
 * 
 * A sleek navigation bar with glass-morphism effects, smooth animations,
 * and responsive behavior.
 * 
 * @param logo - Logo component or text
 * @param navItems - Array of navigation items
 * @param actions - Optional action buttons (login, CTA, etc.)
 * @param className - Additional CSS classes
 */
interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface ModernNavigationProps {
  logo: ReactNode;
  navItems: NavItem[];
  actions?: ReactNode;
  className?: string;
}

const ModernNavigation: React.FC<ModernNavigationProps> = ({
  logo,
  navItems,
  actions,
  className = '',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/20 dark:bg-gray-900/95 dark:border-gray-700/20'
          : 'bg-white/80 backdrop-blur-sm dark:bg-gray-900/80'
      } ${className}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {logo}
          </motion.div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className={`relative font-semibold transition-colors duration-200 ${
                  item.isActive
                    ? 'text-safe-accent'
                    : 'text-safe hover:text-safe-accent dark:text-gray-200 dark:hover:text-blue-400'
                } text-sm lg:text-lg px-1`}
                style={{
                  fontWeight: '600'
                }}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {item.label}
                {item.isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-blue-600 dark:bg-blue-400"
                    layoutId="activeTab"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Desktop Actions */}
          {actions && (
            <div className="hidden md:flex items-center space-x-4">
              {actions}
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Actions (simplified) */}
            <div className="flex items-center space-x-2">
              {actions}
            </div>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-safe-muted hover:text-safe dark:hover:text-white transition-colors"
              aria-label="Toggle mobile menu"
            >
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/20 dark:bg-gray-900/95 dark:border-gray-700/20"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    item.isActive
                      ? 'text-safe-accent bg-blue-50 dark:bg-blue-900/20'
                      : 'text-safe hover:text-safe-accent hover:bg-gray-50 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-gray-700/50'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

/**
 * Modern Loading Spinner Component
 * 
 * An elegant loading spinner with smooth animations.
 * 
 * @param size - Spinner size (sm, md, lg)
 * @param color - Spinner color
 * @param className - Additional CSS classes
 */
interface ModernLoadingProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const ModernLoading: React.FC<ModernLoadingProps> = ({
  size = 'md',
  color = 'text-safe-accent',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-2 border-current border-t-transparent rounded-full ${color}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

/**
 * Modern Contact Form Component
 * 
 * A sophisticated contact form with validation, animations, and modern styling.
 * 
 * @param onSubmit - Form submission handler
 * @param isLoading - Loading state
 * @param className - Additional CSS classes
 */
interface ModernContactFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    projectType?: string;
    budget?: string;
    timeline?: string;
    message: string;
    subscribeToNewsletter?: boolean;
    allowFollowUp?: boolean;
  }) => void;
  isLoading?: boolean;
  className?: string;
}

const ModernContactForm: React.FC<ModernContactFormProps> = ({
  onSubmit,
  isLoading = false,
  className = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    subscribeToNewsletter: false,
    allowFollowUp: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-safe dark:text-gray-200 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-safe rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-safe dark:text-gray-200 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-safe rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="your.email@company.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-safe dark:text-gray-200 mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-safe rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Your company name"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-safe dark:text-gray-200 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-safe rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-safe dark:text-gray-200 mb-2">
            Project Type
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-safe rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select a service</option>
            <option value="api-documentation">API Documentation</option>
            <option value="user-manuals">User Manuals</option>
            <option value="sops">Standard Operating Procedures</option>
            <option value="training-materials">Training Materials</option>
            <option value="compliance-docs">Compliance Documentation</option>
            <option value="technical-writing">Technical Writing</option>
            <option value="content-strategy">Content Strategy</option>
            <option value="other">Other / Custom Project</option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-safe dark:text-gray-200 mb-2">
            Budget Range
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-safe rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select budget range</option>
            <option value="under-5k">Under $5,000</option>
            <option value="5k-15k">$5,000 - $15,000</option>
            <option value="15k-50k">$15,000 - $50,000</option>
            <option value="50k-plus">$50,000+</option>
            <option value="discuss">Prefer to discuss</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="timeline" className="block text-sm font-medium text-safe dark:text-gray-200 mb-2">
          Preferred Timeline
        </label>
        <select
          id="timeline"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-safe rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">Select timeline</option>
          <option value="asap">ASAP (Rush - additional fees apply)</option>
          <option value="1-2-weeks">1-2 weeks</option>
          <option value="3-4-weeks">3-4 weeks</option>
          <option value="1-2-months">1-2 months</option>
          <option value="3-months-plus">3+ months</option>
          <option value="flexible">Flexible</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-safe dark:text-gray-200 mb-2">
          Project Description *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-safe rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Tell us about your project, goals, and any specific requirements..."
        />
      </div>

      {/* Marketing Preferences */}
      <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h4 className="text-sm font-medium text-safe">Communication Preferences</h4>
        
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="subscribeToNewsletter"
            checked={formData.subscribeToNewsletter}
            onChange={(e) => setFormData(prev => ({ ...prev, subscribeToNewsletter: e.target.checked }))}
            className="mt-1 w-4 h-4 text-safe-accent bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <span className="text-sm text-safe">
            Subscribe to our newsletter for writing tips, industry insights, and company updates
          </span>
        </label>

        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="allowFollowUp"
            checked={formData.allowFollowUp}
            onChange={(e) => setFormData(prev => ({ ...prev, allowFollowUp: e.target.checked }))}
            className="mt-1 w-4 h-4 text-safe-accent bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <span className="text-sm text-safe">
            I agree to be contacted about my inquiry and future services (you can opt out anytime)
          </span>
        </label>
      </div>

      <ModernButton
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isLoading}
        onClick={() => {}}
      >
        {isLoading ? 'Sending Message...' : 'Send Message & Get Free Quote'}
      </ModernButton>
    </motion.form>
  );
};

/**
 * Modern Section Header Component
 * 
 * A reusable section header with consistent styling and animations.
 * 
 * @param title - Main heading text
 * @param subtitle - Optional subtitle text
 * @param badge - Optional badge text
 * @param centered - Center align text
 * @param className - Additional CSS classes
 */
interface ModernSectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  className?: string;
}

const ModernSectionHeader: React.FC<ModernSectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  centered = false,
  className = '',
}) => {
  return (
    <motion.div
      className={`${centered ? 'text-center' : ''} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {badge && (
        <motion.div
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-safe-accent mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {badge}
        </motion.div>
      )}
      <motion.h2
        className="text-4xl font-bold text-safe mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-xl text-safe-muted leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

/**
 * Modern Testimonial Component
 * 
 * An elegant testimonial card with rating, quote, and author information.
 * 
 * @param testimonial - Testimonial data object
 * @param className - Additional CSS classes
 */
interface TestimonialData {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  avatar?: string;
}

interface ModernTestimonialProps {
  testimonial: TestimonialData;
  className?: string;
}

const ModernTestimonial: React.FC<ModernTestimonialProps> = ({
  testimonial,
  className = '',
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-safe-muted'}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  return (
    <ModernCard variant="elevated" className={`h-full ${className}`}>
      <div className="flex items-center mb-4">
        {renderStars(testimonial.rating)}
      </div>
      <blockquote className="text-safe-muted italic mb-6 leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <div className="flex items-center">
        {testimonial.avatar ? (
          <Image
            src={testimonial.avatar}
            alt={testimonial.author}
            width={48}
            height={48}
            className="rounded-full mr-4"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold mr-4">
            {testimonial.author.charAt(0)}
          </div>
        )}
        <div>
          <div className="font-semibold text-safe">{testimonial.author}</div>
          <div className="text-sm text-safe-muted">{testimonial.role}</div>
          <div className="text-sm text-safe-muted">{testimonial.company}</div>
        </div>
      </div>
    </ModernCard>
  );
};

// Export all components
export {
  ModernButton,
  ModernCard,
  ModernHero,
  ModernStats,
  ModernFeatureGrid,
  ModernNavigation,
  ModernLoading,
  ModernContactForm,
  ModernSectionHeader,
  ModernTestimonial,
};
