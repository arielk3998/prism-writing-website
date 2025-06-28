/**
 * Unique Industry Icons with High Contrast
 * 
 * Custom SVG icons specifically designed for each industry with
 * high contrast colors and unique visual elements.
 * 
 * @module IndustryIcons
 * @version 1.0.0
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface IconProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const getSize = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small': return 'w-8 h-8';
    case 'medium': return 'w-12 h-12';
    case 'large': return 'w-16 h-16';
    default: return 'w-8 h-8';
  }
};

// Common animation properties for smoother interactions
const iconAnimationProps = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { 
    duration: 0.4, 
    ease: [0.4, 0, 0.2, 1] as [number, number, number, number]
  },
  whileHover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }
  }
};

// Healthcare & Medical - Stethoscope with Heart
export const HealthcareIcon = ({ className = '', size = 'medium' }: IconProps) => (
  <motion.svg 
    viewBox="0 0 120 120" 
    className={`${getSize(size)} ${className}`}
    {...iconAnimationProps}
  >
    <defs>
      <linearGradient id="healthcareGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DC2626" />
        <stop offset="100%" stopColor="#991B1B" />
      </linearGradient>
    </defs>
    {/* Heart */}
    <path 
      d="M60,90 C50,80 30,65 30,45 C30,35 40,25 50,25 C55,25 60,30 60,30 C60,30 65,25 70,25 C80,25 90,35 90,45 C90,65 70,80 60,90 Z" 
      fill="url(#healthcareGrad)" 
    />
    {/* Stethoscope */}
    <circle cx="35" cy="35" r="8" fill="none" stroke="#FFFFFF" strokeWidth="3"/>
    <path d="M35,43 Q45,50 55,45" stroke="#FFFFFF" strokeWidth="3" fill="none"/>
    <circle cx="55" cy="45" r="3" fill="#FFFFFF"/>
  </motion.svg>
);

// Technology & Software - Circuit Board with Chip
export const TechnologyIcon = ({ className = '', size = 'medium' }: IconProps) => (
  <motion.svg 
    viewBox="0 0 120 120" 
    className={`${getSize(size)} ${className}`}
    {...iconAnimationProps}
  >
    <defs>
      <linearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    {/* Main chip */}
    <rect x="40" y="40" width="40" height="40" rx="4" fill="url(#techGrad)"/>
    {/* Circuit lines */}
    <path d="M20,30 L40,30 M80,30 L100,30 M20,60 L40,60 M80,60 L100,60 M20,90 L40,90 M80,90 L100,90" 
          stroke="#FFFFFF" strokeWidth="2"/>
    <path d="M30,20 L30,40 M60,20 L60,40 M90,20 L90,40 M30,80 L30,100 M60,80 L60,100 M90,80 L90,100" 
          stroke="#FFFFFF" strokeWidth="2"/>
    {/* Circuit nodes */}
    <circle cx="30" cy="30" r="2" fill="#FFFFFF"/>
    <circle cx="90" cy="30" r="2" fill="#FFFFFF"/>
    <circle cx="30" cy="90" r="2" fill="#FFFFFF"/>
    <circle cx="90" cy="90" r="2" fill="#FFFFFF"/>
  </motion.svg>
);

// Financial Services - Bank with Security Shield
export const FinancialIcon = ({ className = '', size = 'medium' }: IconProps) => (
  <motion.svg 
    viewBox="0 0 120 120" 
    className={`${getSize(size)} ${className}`}
    {...iconAnimationProps}
  >
    <defs>
      <linearGradient id="finGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#059669" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
    </defs>
    {/* Bank building */}
    <rect x="30" y="50" width="60" height="40" fill="url(#finGrad)"/>
    <polygon points="25,50 60,25 95,50" fill="url(#finGrad)"/>
    {/* Columns */}
    <rect x="40" y="55" width="4" height="30" fill="#FFFFFF"/>
    <rect x="58" y="55" width="4" height="30" fill="#FFFFFF"/>
    <rect x="76" y="55" width="4" height="30" fill="#FFFFFF"/>
    {/* Shield overlay */}
    <path d="M70,35 L85,42 L85,65 Q85,75 70,80 Q55,75 55,65 L55,42 Z" 
          fill="#FFFFFF" opacity="0.9"/>
    <path d="M65,55 L67,57 L72,52" stroke="url(#finGrad)" strokeWidth="2" fill="none"/>
  </motion.svg>
);

// Manufacturing & Industrial - Gear with Quality Badge
export const ManufacturingIcon = ({ className = '', size = 'medium' }: IconProps) => (
  <motion.svg 
    viewBox="0 0 120 120" 
    className={`${getSize(size)} ${className}`}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <defs>
      <linearGradient id="mfgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EA580C" />
        <stop offset="100%" stopColor="#C2410C" />
      </linearGradient>
    </defs>
    {/* Large gear */}
    <circle cx="60" cy="60" r="25" fill="url(#mfgGrad)"/>
    <circle cx="60" cy="60" r="12" fill="none" stroke="#FFFFFF" strokeWidth="3"/>
    {/* Gear teeth */}
    <rect x="58" y="30" width="4" height="8" fill="url(#mfgGrad)"/>
    <rect x="58" y="82" width="4" height="8" fill="url(#mfgGrad)"/>
    <rect x="30" y="58" width="8" height="4" fill="url(#mfgGrad)"/>
    <rect x="82" y="58" width="8" height="4" fill="url(#mfgGrad)"/>
    {/* Quality badge */}
    <circle cx="80" cy="40" r="12" fill="#FFFFFF"/>
    <path d="M75,40 L78,43 L85,36" stroke="url(#mfgGrad)" strokeWidth="2" fill="none"/>
  </motion.svg>
);

// Government & Defense - Eagle with Stars
export const GovernmentIcon = ({ className = '', size = 'medium' }: IconProps) => (
  <motion.svg 
    viewBox="0 0 120 120" 
    className={`${getSize(size)} ${className}`}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <defs>
      <linearGradient id="govGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#5B21B6" />
      </linearGradient>
    </defs>
    {/* Shield base */}
    <path d="M60,20 L85,35 L85,70 Q85,85 60,95 Q35,85 35,70 L35,35 Z" fill="url(#govGrad)"/>
    {/* Eagle silhouette */}
    <path d="M45,45 Q60,40 75,45 Q70,55 60,50 Q50,55 45,45" fill="#FFFFFF"/>
    {/* Stars */}
    <polygon points="60,65 62,70 67,70 63,73 65,78 60,75 55,78 57,73 53,70 58,70" fill="#FFFFFF"/>
    <circle cx="45" cy="35" r="2" fill="#FFFFFF"/>
    <circle cx="75" cy="35" r="2" fill="#FFFFFF"/>
  </motion.svg>
);

// Energy & Utilities - Lightning Bolt in Power Grid
export const EnergyIcon = ({ className = '', size = 'medium' }: IconProps) => (
  <motion.svg 
    viewBox="0 0 120 120" 
    className={`${getSize(size)} ${className}`}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <defs>
      <linearGradient id="energyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    {/* Power grid */}
    <circle cx="60" cy="60" r="30" fill="none" stroke="url(#energyGrad)" strokeWidth="3"/>
    <path d="M30,60 L90,60 M60,30 L60,90 M42,42 L78,78 M78,42 L42,78" 
          stroke="url(#energyGrad)" strokeWidth="2"/>
    {/* Lightning bolt */}
    <path d="M55,25 L40,55 L50,55 L45,85 L70,50 L60,50 L55,25" 
          fill="#FFFFFF" stroke="url(#energyGrad)" strokeWidth="1"/>
  </motion.svg>
);

// Education & Training - Graduation Cap with Books
export const EducationIcon = ({ className = '', size = 'medium' }: IconProps) => (
  <motion.svg 
    viewBox="0 0 120 120" 
    className={`${getSize(size)} ${className}`}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <defs>
      <linearGradient id="eduGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    {/* Books stack */}
    <rect x="35" y="70" width="50" height="6" rx="2" fill="url(#eduGrad)"/>
    <rect x="40" y="76" width="45" height="6" rx="2" fill="url(#eduGrad)" opacity="0.8"/>
    <rect x="45" y="82" width="40" height="6" rx="2" fill="url(#eduGrad)" opacity="0.6"/>
    {/* Graduation cap */}
    <ellipse cx="60" cy="45" rx="25" ry="5" fill="url(#eduGrad)"/>
    <rect x="35" y="40" width="50" height="10" rx="2" fill="url(#eduGrad)"/>
    {/* Tassel */}
    <path d="M85,45 L90,35 M90,35 L88,38 M90,35 L92,38" 
          stroke="#FFFFFF" strokeWidth="2" fill="none"/>
  </motion.svg>
);

// Aerospace & Defense - Rocket with Satellite
export const AerospaceIcon = ({ className = '', size = 'medium' }: IconProps) => (
  <motion.svg 
    viewBox="0 0 120 120" 
    className={`${getSize(size)} ${className}`}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <defs>
      <linearGradient id="aeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0EA5E9" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
    </defs>
    {/* Rocket body */}
    <ellipse cx="60" cy="25" rx="5" ry="8" fill="url(#aeroGrad)"/>
    <rect x="55" y="25" width="10" height="40" fill="url(#aeroGrad)"/>
    {/* Rocket fins */}
    <polygon points="50,60 55,65 55,70 45,70" fill="url(#aeroGrad)"/>
    <polygon points="70,60 65,65 65,70 75,70" fill="url(#aeroGrad)"/>
    {/* Flame */}
    <path d="M57,70 L60,85 L63,70" fill="#FFFFFF"/>
    {/* Satellite */}
    <rect x="75" y="40" width="15" height="8" rx="2" fill="#FFFFFF"/>
    <path d="M70,44 L90,44 M75,35 L75,50 M85,35 L85,50" 
          stroke="url(#aeroGrad)" strokeWidth="2"/>
  </motion.svg>
);

// Biotechnology & Life Sciences - DNA Helix with Laboratory Flask
export const BiotechnologyIcon = ({ className = '', size = 'medium' }: IconProps) => (
  <motion.svg 
    viewBox="0 0 120 120" 
    className={`${getSize(size)} ${className}`}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <defs>
      <linearGradient id="bioGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
    </defs>
    {/* DNA Helix */}
    <path d="M30,20 Q45,30 30,40 Q15,50 30,60 Q45,70 30,80 Q15,90 30,100" 
          stroke="url(#bioGrad)" strokeWidth="3" fill="none"/>
    <path d="M50,20 Q35,30 50,40 Q65,50 50,60 Q35,70 50,80 Q65,90 50,100" 
          stroke="url(#bioGrad)" strokeWidth="3" fill="none"/>
    {/* DNA connections */}
    <path d="M30,25 L50,25 M30,35 L50,35 M30,45 L50,45 M30,55 L50,55 M30,65 L50,65 M30,75 L50,75 M30,85 L50,85 M30,95 L50,95" 
          stroke="#FFFFFF" strokeWidth="2"/>
    {/* Laboratory flask */}
    <path d="M70,40 L70,25 L90,25 L90,40 L100,70 Q100,85 85,85 L75,85 Q60,85 60,70 Z" 
          fill="url(#bioGrad)"/>
    <rect x="75" y="20" width="10" height="8" fill="url(#bioGrad)"/>
    {/* Bubbles in flask */}
    <circle cx="80" cy="60" r="3" fill="#FFFFFF" opacity="0.7"/>
    <circle cx="75" cy="70" r="2" fill="#FFFFFF" opacity="0.5"/>
    <circle cx="85" cy="75" r="2" fill="#FFFFFF" opacity="0.6"/>
  </motion.svg>
);

// Telecommunications & Media - Radio Tower with Signal Waves
export const TelecommunicationsIcon = ({ className = '', size = 'medium' }: IconProps) => (
  <motion.svg 
    viewBox="0 0 120 120" 
    className={`${getSize(size)} ${className}`}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <defs>
      <linearGradient id="telecomGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F43F5E" />
        <stop offset="100%" stopColor="#BE185D" />
      </linearGradient>
    </defs>
    {/* Radio tower base */}
    <rect x="55" y="70" width="10" height="30" fill="url(#telecomGrad)"/>
    <polygon points="60,70 50,35 70,35" fill="url(#telecomGrad)"/>
    {/* Tower details */}
    <rect x="52" y="45" width="16" height="2" fill="#FFFFFF"/>
    <rect x="52" y="55" width="16" height="2" fill="#FFFFFF"/>
    <rect x="52" y="65" width="16" height="2" fill="#FFFFFF"/>
    {/* Signal waves */}
    <path d="M25,40 Q35,35 25,30" stroke="url(#telecomGrad)" strokeWidth="2" fill="none"/>
    <path d="M20,50 Q35,40 20,30" stroke="url(#telecomGrad)" strokeWidth="2" fill="none"/>
    <path d="M15,60 Q35,45 15,30" stroke="url(#telecomGrad)" strokeWidth="2" fill="none"/>
    <path d="M95,40 Q85,35 95,30" stroke="url(#telecomGrad)" strokeWidth="2" fill="none"/>
    <path d="M100,50 Q85,40 100,30" stroke="url(#telecomGrad)" strokeWidth="2" fill="none"/>
    <path d="M105,60 Q85,45 105,30" stroke="url(#telecomGrad)" strokeWidth="2" fill="none"/>
    {/* Satellite dish */}
    <ellipse cx="60" cy="25" rx="8" ry="4" fill="#FFFFFF"/>
    <path d="M60,25 L60,35" stroke="url(#telecomGrad)" strokeWidth="2"/>
  </motion.svg>
);

export const IndustryIconMap = {
  healthcare: HealthcareIcon,
  technology: TechnologyIcon,
  financial: FinancialIcon,
  manufacturing: ManufacturingIcon,
  government: GovernmentIcon,
  energy: EnergyIcon,
  education: EducationIcon,
  aerospace: AerospaceIcon,
  biotechnology: BiotechnologyIcon,
  telecommunications: TelecommunicationsIcon,
};

const IndustryIcons = {
  HealthcareIcon,
  TechnologyIcon,
  FinancialIcon,
  ManufacturingIcon,
  GovernmentIcon,
  EnergyIcon,
  EducationIcon,
  AerospaceIcon,
  BiotechnologyIcon,
  TelecommunicationsIcon,
  IndustryIconMap,
};

export default IndustryIcons;
