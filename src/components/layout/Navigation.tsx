/**
 * Main Navigation Component
 * 
 * This is the primary navigation component that appears at the top of every page.
 * It provides a responsive navigation experience with both desktop and mobile views,
 * dark mode toggle, and active page highlighting.
 * 
 * Key Features:
 * - Responsive design (desktop navigation + mobile hamburger menu)
 * - Active page highlighting for better user orientation
 * - Dark mode toggle integration
 * - Backdrop blur effect for modern glass-morphism design
 * - Accessible navigation with keyboard support
 * - Consistent branding with logo/brand name
 * 
 * Design Principles:
 * - Mobile-first responsive design
 * - Consistent spacing and typography
 * - Clear visual hierarchy
 * - Smooth transitions and hover effects
 * 
 * @param currentPage - The current page path for active state highlighting
 * @returns The navigation component with responsive layout
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';
import MobileNav from './MobileNav';
import { SimpleDarkModeToggle } from '../ui/SimpleDarkModeToggle';
import { AnimatedLogo } from '../ui/AnimatedLogo';
import { NAVIGATION_ITEMS } from '../../lib/constants';

interface NavigationProps {
  currentPage?: string;  // Optional current page path for active state
}

export default function Navigation({ currentPage }: NavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    // Main navigation container with glass-morphism effect
    // Uses backdrop-blur for modern transparent overlay design
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 relative">
          {/* Brand/Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <AnimatedLogo 
                width={160} 
                height={40} 
                className="hover:scale-105 transition-transform duration-300" 
              />
            </Link>
          </div>
          
          {/* Desktop Navigation Links with Dropdowns */}
          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <div 
                key={item.name}
                className="relative group"
                onMouseEnter={() => 'submenu' in item && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link 
                  href={item.href} 
                  className={`flex items-center transition-colors ${
                    currentPage === item.href
                      ? 'text-indigo-600 dark:text-indigo-400 font-semibold'  // Active state styling
                      : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'  // Default and hover states
                  }`}
                >
                  {item.name}
                  {'submenu' in item && (
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                
                {/* Dropdown Menu */}
                {'submenu' in item && openDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Dark mode toggle for desktop */}
            <SimpleDarkModeToggle />
          </div>
          
          {/* Mobile Navigation Controls */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Dark mode toggle for mobile */}
            <SimpleDarkModeToggle />
            {/* Mobile hamburger menu */}
            <MobileNav currentPage={currentPage} />
          </div>
        </div>
      </div>
    </nav>
  );
}
