import React from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

interface LogoProps {
  variant?: 'full' | 'icon';
  className?: string;
  width?: number;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'full', 
  className = '', 
  width,
  height 
}) => {
  const { theme, resolvedTheme } = useTheme();
  const isDark = theme === 'dark' || resolvedTheme === 'dark';
  
  const defaultDimensions = variant === 'full' 
    ? { width: 200, height: 80 } 
    : { width: 64, height: 64 };
  
  const logoWidth = width || defaultDimensions.width;
  const logoHeight = height || defaultDimensions.height;
  
  if (variant === 'icon') {
    return (
      <Image
        src="/logo-icon.svg"
        alt="Prism Writing Logo"
        width={logoWidth}
        height={logoHeight}
        className={className}
        priority
      />
    );
  }
  
  return (
    <Image
      src={isDark ? "/logo-dark.svg" : "/logo.svg"}
      alt="Prism Writing - Professional Technical Writing Services"
      width={logoWidth}
      height={logoHeight}
      className={className}
      priority
    />
  );
};

export default Logo;
