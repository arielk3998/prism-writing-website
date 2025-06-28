/**
 * Enhanced Graphics Components
 * 
 * Professional, attention-grabbing visual components with advanced gradients,
 * patterns, and animations to create stunning visual impact.
 * 
 * @module EnhancedGraphics
 * @version 1.0.0
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Professional gradient backgrounds for different categories
export const CategoryBackgrounds = {
  'api-docs': 'bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600',
  'user-manual': 'bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700',
  'sop': 'bg-gradient-to-br from-orange-400 via-red-500 to-pink-600',
  'training': 'bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700',
  'compliance': 'bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700',
  'research': 'bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-700',
};

// Advanced geometric patterns
export const GeometricPattern = ({ variant = 'dots', className = '' }: { variant?: 'dots' | 'grid' | 'hexagon' | 'waves'; className?: string }) => {
  const patterns = {
    dots: (
      <defs>
        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1.5" fill="rgba(255,255,255,0.1)"/>
        </pattern>
      </defs>
    ),
    grid: (
      <defs>
        <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
        </pattern>
      </defs>
    ),
    hexagon: (
      <defs>
        <pattern id="hexagon" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
          <path d="M28,4 L52,20 L52,44 L28,60 L4,44 L4,20 Z" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        </pattern>
      </defs>
    ),
    waves: (
      <defs>
        <pattern id="waves" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
          <path d="M0,10 Q25,0 50,10 T100,10" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2"/>
        </pattern>
      </defs>
    )
  };

  return (
    <svg className={`absolute inset-0 w-full h-full ${className}`} style={{ zIndex: 1 }}>
      {patterns[variant]}
      <rect width="100%" height="100%" fill={`url(#${variant})`} />
    </svg>
  );
};

// Professional tech illustrations
export const TechIllustration = ({ type, className = '', size = 'large' }: { 
  type: 'api' | 'documentation' | 'security' | 'training' | 'analytics' | 'research';
  className?: string;
  size?: 'small' | 'medium' | 'large';
}) => {
  const dimensions = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-32 h-32'
  };

  const illustrations = {
    api: (
      <svg viewBox="0 0 120 120" className={`${dimensions[size]} ${className}`}>
        <defs>
          <linearGradient id="apiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <motion.g
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <circle cx="60" cy="60" r="45" fill="url(#apiGrad)" filter="url(#glow)" opacity="0.1"/>
          <circle cx="30" cy="40" r="8" fill="url(#apiGrad)"/>
          <circle cx="90" cy="40" r="8" fill="url(#apiGrad)"/>
          <circle cx="60" cy="80" r="8" fill="url(#apiGrad)"/>
          <path d="M30,40 L60,80 L90,40" stroke="url(#apiGrad)" strokeWidth="3" fill="none"/>
          <path d="M30,40 L90,40" stroke="url(#apiGrad)" strokeWidth="2" fill="none"/>
          <text x="60" y="100" textAnchor="middle" fill="url(#apiGrad)" fontSize="10" fontWeight="bold">API</text>
        </motion.g>
      </svg>
    ),
    documentation: (
      <svg viewBox="0 0 120 120" className={`${dimensions[size]} ${className}`}>
        <defs>
          <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>
        <motion.g
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <rect x="25" y="20" width="70" height="80" rx="5" fill="url(#docGrad)" opacity="0.1"/>
          <rect x="30" y="15" width="60" height="70" rx="3" fill="url(#docGrad)"/>
          <rect x="35" y="25" width="50" height="3" rx="1" fill="white" opacity="0.8"/>
          <rect x="35" y="35" width="40" height="2" rx="1" fill="white" opacity="0.6"/>
          <rect x="35" y="42" width="45" height="2" rx="1" fill="white" opacity="0.6"/>
          <rect x="35" y="49" width="35" height="2" rx="1" fill="white" opacity="0.6"/>
          <circle cx="40" cy="65" r="2" fill="white" opacity="0.8"/>
          <circle cx="50" cy="65" r="2" fill="white" opacity="0.8"/>
          <circle cx="60" cy="65" r="2" fill="white" opacity="0.8"/>
        </motion.g>
      </svg>
    ),
    security: (
      <svg viewBox="0 0 120 120" className={`${dimensions[size]} ${className}`}>
        <defs>
          <linearGradient id="secGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        <motion.g
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <path d="M60,15 L85,30 L85,65 Q85,85 60,95 Q35,85 35,65 L35,30 Z" fill="url(#secGrad)" opacity="0.1"/>
          <path d="M60,20 L80,32 L80,62 Q80,78 60,85 Q40,78 40,62 L40,32 Z" fill="url(#secGrad)"/>
          <circle cx="60" cy="50" r="8" fill="white" opacity="0.9"/>
          <path d="M57,50 L59,52 L63,48" stroke="url(#secGrad)" strokeWidth="2" fill="none"/>
        </motion.g>
      </svg>
    ),
    training: (
      <svg viewBox="0 0 120 120" className={`${dimensions[size]} ${className}`}>
        <defs>
          <linearGradient id="trainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <motion.g
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <rect x="20" y="30" width="80" height="50" rx="5" fill="url(#trainGrad)" opacity="0.1"/>
          <rect x="25" y="25" width="70" height="40" rx="3" fill="url(#trainGrad)"/>
          <circle cx="45" cy="45" r="8" fill="white" opacity="0.9"/>
          <path d="M42,45 L44,47 L48,43" stroke="url(#trainGrad)" strokeWidth="2" fill="none"/>
          <rect x="58" y="38" width="25" height="3" rx="1" fill="white" opacity="0.8"/>
          <rect x="58" y="45" width="20" height="2" rx="1" fill="white" opacity="0.6"/>
          <rect x="58" y="50" width="22" height="2" rx="1" fill="white" opacity="0.6"/>
          <rect x="30" y="75" width="60" height="15" rx="7" fill="url(#trainGrad)" opacity="0.8"/>
          <text x="60" y="85" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">LEARN</text>
        </motion.g>
      </svg>
    ),
    analytics: (
      <svg viewBox="0 0 120 120" className={`${dimensions[size]} ${className}`}>
        <defs>
          <linearGradient id="analyticsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
        <motion.g
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <rect x="25" y="70" width="8" height="20" fill="url(#analyticsGrad)" opacity="0.7"/>
          <rect x="40" y="55" width="8" height="35" fill="url(#analyticsGrad)" opacity="0.8"/>
          <rect x="55" y="40" width="8" height="50" fill="url(#analyticsGrad)"/>
          <rect x="70" y="25" width="8" height="65" fill="url(#analyticsGrad)" opacity="0.9"/>
          <rect x="85" y="35" width="8" height="55" fill="url(#analyticsGrad)" opacity="0.8"/>
          <path d="M29,70 Q42,50 57,45 Q72,25 89,35" stroke="url(#analyticsGrad)" strokeWidth="3" fill="none" opacity="0.6"/>
          <circle cx="29" cy="70" r="3" fill="url(#analyticsGrad)"/>
          <circle cx="57" cy="45" r="3" fill="url(#analyticsGrad)"/>
          <circle cx="89" cy="35" r="3" fill="url(#analyticsGrad)"/>
        </motion.g>
      </svg>
    ),
    research: (
      <svg viewBox="0 0 120 120" className={`${dimensions[size]} ${className}`}>
        <defs>
          <linearGradient id="researchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
        </defs>
        <motion.g
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <circle cx="50" cy="50" r="25" fill="none" stroke="url(#researchGrad)" strokeWidth="4" opacity="0.3"/>
          <circle cx="50" cy="50" r="20" fill="url(#researchGrad)" opacity="0.1"/>
          <circle cx="50" cy="50" r="15" fill="url(#researchGrad)" opacity="0.8"/>
          <rect x="70" y="70" width="4" height="20" rx="2" fill="url(#researchGrad)" transform="rotate(45 72 80)"/>
          <circle cx="72" cy="68" r="8" fill="none" stroke="url(#researchGrad)" strokeWidth="3"/>
          <path d="M45,45 L48,48 L55,41" stroke="white" strokeWidth="2" fill="none"/>
        </motion.g>
      </svg>
    )
  };

  return illustrations[type];
};

// Glassmorphism effect container
export const GlassmorphismCard = ({ 
  children, 
  className = '',
  intensity = 'medium' 
}: { 
  children: React.ReactNode; 
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
}) => {
  const intensities = {
    light: 'bg-white/10 backdrop-blur-sm border border-white/20',
    medium: 'bg-white/20 backdrop-blur-md border border-white/30',
    strong: 'bg-white/30 backdrop-blur-lg border border-white/40'
  };

  return (
    <div className={`${intensities[intensity]} rounded-xl shadow-xl ${className}`}>
      {children}
    </div>
  );
};

// Animated gradient background
export const AnimatedGradientBg = ({ 
  colors, 
  className = '',
  speed = 'medium' 
}: { 
  colors: string[]; 
  className?: string;
  speed?: 'slow' | 'medium' | 'fast';
}) => {
  const speeds = {
    slow: 'animate-pulse',
    medium: 'animate-pulse',
    fast: 'animate-pulse'
  };

  return (
    <div className={`absolute inset-0 ${speeds[speed]} ${className}`}>
      <div 
        className="absolute inset-0 opacity-75"
        style={{
          background: `linear-gradient(45deg, ${colors.join(', ')})`
        }}
      />
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: `linear-gradient(-45deg, ${colors.reverse().join(', ')})`
        }}
      />
    </div>
  );
};

// Professional portfolio card with enhanced graphics
export const EnhancedPortfolioCard = ({ 
  title,
  description,
  category,
  tags,
  pages,
  year,
  onViewSample,
  downloadable,
  onDownload,
  className = ''
}: {
  title: string;
  description: string;
  category: keyof typeof CategoryBackgrounds;
  tags: string[];
  pages: number;
  year: number;
  onViewSample: () => void;
  downloadable?: {
    sampleId: string;
    filename: string;
    description: string;
  };
  onDownload?: (sampleId: string) => void;
  className?: string;
}) => {
  const getIllustration = (cat: string) => {
    const mapping = {
      'api-docs': 'api',
      'user-manual': 'documentation',
      'sop': 'security',
      'training': 'training',
      'compliance': 'security',
      'research': 'research'
    } as const;
    return mapping[cat as keyof typeof mapping] || 'documentation';
  };

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {/* Background with gradient and pattern */}
      <div className={`absolute inset-0 ${CategoryBackgrounds[category]}`}>
        <GeometricPattern variant="dots" className="opacity-30" />
      </div>

      {/* Glassmorphism overlay */}
      <GlassmorphismCard intensity="medium" className="relative z-10 h-full p-6">
        {/* Header with illustration */}
        <div className="flex items-start justify-between mb-6">
          <TechIllustration 
            type={getIllustration(category)} 
            size="medium"
            className="flex-shrink-0"
          />
          <div className="text-right text-white/80">
            <div className="text-sm font-medium">{pages} pages</div>
            <div className="text-xs opacity-75">{year}</div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white leading-tight">
            {title}
          </h3>
          
          <p className="text-white/90 text-sm leading-relaxed line-clamp-3">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30">
                +{tags.length - 3} more
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="space-y-3 mt-6">
            <motion.button
              onClick={onViewSample}
              className="w-full bg-white/20 hover:bg-white/30 border border-white/40 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Sample →
            </motion.button>
            
            {downloadable && onDownload && (
              <motion.button
                onClick={() => onDownload(downloadable.sampleId)}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/30 text-white/90 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 backdrop-blur-sm text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                title={downloadable.description}
              >
                📄 Download Sample PDF
              </motion.button>
            )}
          </div>
        </div>
      </GlassmorphismCard>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

const EnhancedGraphics = {
  CategoryBackgrounds,
  GeometricPattern,
  TechIllustration,
  GlassmorphismCard,
  AnimatedGradientBg,
  EnhancedPortfolioCard
};

export default EnhancedGraphics;
