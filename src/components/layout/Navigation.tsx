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
import MobileNav from './MobileNav';
import { SimpleDarkModeToggle } from '../ui/SimpleDarkModeToggle';
import { AnimatedLogo } from '../ui/AnimatedLogo';
import { NAVIGATION_ITEMS } from '../../lib/constants';

interface NavigationProps {
  currentPage?: string;  // Optional current page path for active state
}

export default function Navigation({ currentPage }: NavigationProps) {
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
                className="scale-110 hover:scale-125 transition-transform duration-300" 
              />
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className={`transition-colors ${
                  currentPage === item.href
                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold'  // Active state styling
                    : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'  // Default and hover states
                }`}
              >
                {item.name}
              </a>
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
