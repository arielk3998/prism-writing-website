import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface AnimatedLogoProps {
  variant?: 'full' | 'icon';
  className?: string;
  width?: number;
  height?: number;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  variant = 'full', 
  className = '', 
  width,
  height 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [time, setTime] = useState(0);
  const { theme, resolvedTheme } = useTheme();
  const isDark = theme === 'dark' || resolvedTheme === 'dark';
  
  const defaultDimensions = variant === 'full' 
    ? { width: 200, height: 80 } 
    : { width: 64, height: 64 };
  
  const logoWidth = width || defaultDimensions.width;
  const logoHeight = height || defaultDimensions.height;

  // Simplified animation calculations - reduced flickering
  const heartbeatScale = 1 + Math.sin(time * 0.3) * 0.008; // Much more subtle breathing effect
  const hoverScale = isHovered ? 1.03 : 1; // Reduced hover scale
  const finalScale = hoverScale * heartbeatScale;

  // Reduced animation frequency to prevent flickering
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 0.05); // Much slower update rate
    }, 100); // 10fps instead of 60fps
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePos({ x: 50, y: 50 }); // Reset to center
    };

    svg.addEventListener('mousemove', handleMouseMove);
    svg.addEventListener('mouseenter', handleMouseEnter);
    svg.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      svg.removeEventListener('mousemove', handleMouseMove);
      svg.removeEventListener('mouseenter', handleMouseEnter);
      svg.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // AI-age magnetic field calculations
  const magneticStrength = isHovered ? 1 : 0;
  const magneticRadius = 50 + magneticStrength * 30;
  const distortion = Math.sin(time * 2) * magneticStrength * 2;
  
  // Prism transformations inspired by Rodchenko's constructivism
  const prismRotation = time * 10 + (mousePos.x - 50) * 0.2;
  const prismTiltX = (mousePos.x - 50) * 0.1;
  const prismTiltY = (mousePos.y - 50) * 0.1;
  
  // Saville's color harmonies - more sophisticated spectrum
  const spectrumColors = [
    { h: 260, s: 70, l: 60 }, // Purple-Blue
    { h: 200, s: 80, l: 55 }, // Cyan
    { h: 160, s: 75, l: 50 }, // Green
    { h: 45, s: 85, l: 55 },  // Yellow
    { h: 15, s: 80, l: 60 },  // Orange
    { h: 350, s: 75, l: 65 }  // Red-Pink
  ];

  if (variant === 'icon') {
    return (
      <svg
        ref={svgRef}
        width={logoWidth}
        height={logoHeight}
        viewBox="0 0 64 64"
        className={`${className} transition-all duration-500 ease-out cursor-pointer overflow-visible`}
        style={{ transform: `scale(${finalScale})` }}
      >
        <defs>
          {/* AI-age holographic gradient */}
          <radialGradient id="holographicCore" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)">
              <animate attributeName="stop-color" 
                values="rgba(255,255,255,0.9);rgba(99,102,241,0.8);rgba(255,255,255,0.9)" 
                dur="3s" repeatCount="indefinite"/>
            </stop>
            <stop offset="50%" stopColor="rgba(99,102,241,0.6)">
              <animate attributeName="stop-color" 
                values="rgba(99,102,241,0.6);rgba(139,92,246,0.7);rgba(99,102,241,0.6)" 
                dur="3s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" stopColor="rgba(99,102,241,0.3)"/>
          </radialGradient>

          {/* Liquid magnetic field effect */}
          <filter id="liquidMagnetic" x="-100%" y="-100%" width="300%" height="300%">
            <feTurbulence 
              baseFrequency={`${0.02 + magneticStrength * 0.03}`} 
              numOctaves="4" 
              result="noise"/>
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale={magneticStrength * 5}/>
            <feGaussianBlur stdDeviation={magneticStrength} result="blur"/>
            <feColorMatrix 
              type="saturate" 
              values={(1 + magneticStrength * 0.5).toString()}/>
            <feDropShadow 
              dx="0" dy="0" 
              stdDeviation={magneticStrength * 3} 
              floodColor="#6366f1" 
              floodOpacity={magneticStrength * 0.6}/>
          </filter>

          {/* Ruth Kedar's precision meets liquid dynamics */}
          <filter id="precisionLiquid">
            <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.15"/>
            <feGaussianBlur stdDeviation={magneticStrength * 0.5}/>
          </filter>
        </defs>
        
        {/* Core prism - Adrian Frutiger's systematic clarity */}
        <g style={{ 
          transform: `translate(${prismTiltX}px, ${prismTiltY}px) rotate(${prismRotation}deg)`,
          transformOrigin: '32px 32px'
        }}>
          <path 
            d="M 12 20 L 38 14 L 38 44 L 12 50 Z" 
            fill="url(#holographicCore)" 
            filter={isHovered ? "url(#liquidMagnetic)" : "url(#precisionLiquid)"}
            className="transition-all duration-300"
            style={{
              transform: `scale(${1 + distortion * 0.1})`,
              opacity: 0.9 + magneticStrength * 0.1
            }}
          />
        </g>
        
        {/* Electromagnetic spectrum rays - Otl Aicher's systematic approach */}
        <g style={{ 
          transform: `translate(${prismTiltX * 0.5}px, ${prismTiltY * 0.5}px)`,
          transformOrigin: '32px 32px'
        }}>
          {spectrumColors.map((color, i) => {
            const baseY = 18 + i * 5.5;
            const rayLength = 20 + magneticStrength * 15;
            const waveOffset = Math.sin(time * 3 + i * 0.5) * magneticStrength * 3;
            const magneticPull = magneticStrength * Math.sin(time * 2 + i * 0.3) * 2;
            
            return (
              <line 
                key={i}
                x1="38" 
                y1={baseY} 
                x2={38 + rayLength + waveOffset} 
                y2={baseY + magneticPull} 
                stroke={`hsl(${color.h}, ${color.s}%, ${color.l}%)`}
                strokeWidth={2 + magneticStrength * 2} 
                opacity={0.8 + magneticStrength * 0.2}
                className="transition-all duration-200"
                style={{
                  filter: isHovered ? `drop-shadow(0 0 ${4 + magneticStrength * 4}px hsl(${color.h}, ${color.s}%, ${color.l}%))` : 'none'
                }}
              >
                <animate 
                  attributeName="opacity" 
                  values="0.6;1;0.6" 
                  dur={`${2 + i * 0.2}s`} 
                  repeatCount="indefinite"
                />
              </line>
            );
          })}
        </g>

        {/* Magnetic field visualization */}
        {isHovered && (
          <g>
            <circle
              cx={mousePos.x * 0.64}
              cy={mousePos.y * 0.64}
              r={magneticRadius * 0.3}
              fill="none"
              stroke="rgba(99,102,241,0.3)"
              strokeWidth="1"
              opacity={magneticStrength * 0.6}
            >
              <animate attributeName="r" values="10;25;10" dur="2s" repeatCount="indefinite"/>
            </circle>
          </g>
        )}
      </svg>
    );
  }

  return (
    <svg
      ref={svgRef}
      width={logoWidth}
      height={logoHeight}
      viewBox="0 0 200 80"
      className={`${className} transition-all duration-500 ease-out cursor-pointer overflow-visible`}
      style={{ transform: `scale(${finalScale})` }}
    >
      <defs>
        {/* AI-enhanced holographic prism gradient */}
        <linearGradient id="aiHolographic" x1="0%" y1="0%" x2="100%" y2="100%">
          {spectrumColors.map((color, i) => (
            <stop 
              key={i}
              offset={`${(i / (spectrumColors.length - 1)) * 100}%`} 
              stopColor={`hsl(${color.h}, ${color.s}%, ${isDark ? color.l + 10 : color.l}%)`}
              stopOpacity={0.8 + magneticStrength * 0.2}
            >
              <animate 
                attributeName="stop-color" 
                values={`hsl(${color.h}, ${color.s}%, ${color.l}%);hsl(${color.h + 20}, ${color.s + 10}%, ${color.l + 10}%);hsl(${color.h}, ${color.s}%, ${color.l}%)`}
                dur={`${4 + i * 0.5}s`} 
                repeatCount="indefinite"/>
            </stop>
          ))}
        </linearGradient>

        {/* Alexander Rodchenko inspired dynamic geometry */}
        <pattern id="constructivistPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="none"/>
          <path d="M0,0 L20,20 M20,0 L0,20" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
        </pattern>

        {/* Magnetic liquid distortion - Ed Benguiat's expressive approach */}
        <filter id="expressiveLiquid" x="-150%" y="-150%" width="400%" height="400%">
          <feTurbulence 
            baseFrequency={`${0.015 + magneticStrength * 0.02} ${0.02 + magneticStrength * 0.025}`} 
            numOctaves="5" 
            result="turbulence"/>
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="turbulence" 
            scale={magneticStrength * 8}/>
          <feGaussianBlur stdDeviation={magneticStrength * 1.5} result="blur"/>
          <feColorMatrix 
            type="saturate" 
            values={(1 + magneticStrength * 0.8).toString()}/>
          <feDropShadow 
            dx="0" dy="0" 
            stdDeviation={magneticStrength * 4} 
            floodColor="#6366f1" 
            floodOpacity={magneticStrength * 0.7}/>
        </filter>

        {/* Precise geometric filter */}
        <filter id="geometricPrecision">
          <feDropShadow dx="2" dy="3" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.2"/>
        </filter>
      </defs>
      
      {/* Main holographic prism */}
      <g style={{ 
        transform: `translate(${prismTiltX}px, ${prismTiltY}px) rotate(${prismRotation * 0.3}deg)`,
        transformOrigin: '32px 40px'
      }}>
        <path 
          d="M 15 25 L 45 15 L 45 45 L 15 55 Z" 
          fill="url(#aiHolographic)" 
          filter={isHovered ? "url(#expressiveLiquid)" : "url(#geometricPrecision)"}
          className="transition-all duration-500"
          style={{
            transform: `scale(${1 + distortion * 0.05})`,
            opacity: 0.9 + magneticStrength * 0.1
          }}
        />
        <path 
          d="M 15 25 L 45 15 L 45 45 L 15 55 Z" 
          fill="url(#constructivistPattern)" 
          opacity={magneticStrength * 0.3}
        />
      </g>
      
      {/* Dynamic light spectrum */}
      <g style={{ 
        transform: `translate(${prismTiltX * 0.3}px, ${prismTiltY * 0.3}px)`,
        transformOrigin: '45px 30px'
      }}>
        {spectrumColors.map((color, i) => {
          const baseY = 18 + i * 5.5;
          const rayLength = 25 + magneticStrength * 25;
          const waveOffset = Math.sin(time * 2.5 + i * 0.7) * magneticStrength * 5;
          const magneticPull = magneticStrength * Math.sin(time * 1.8 + i * 0.4) * 3;
          
          return (
            <g key={i}>
              <line 
                x1="45" 
                y1={baseY} 
                x2={45 + rayLength + waveOffset} 
                y2={baseY + magneticPull} 
                stroke={`hsl(${color.h}, ${color.s}%, ${isDark ? color.l + 15 : color.l}%)`}
                strokeWidth={2 + magneticStrength * 2} 
                opacity={0.8 + magneticStrength * 0.2}
                className="transition-all duration-300"
                style={{
                  filter: isHovered ? `drop-shadow(0 0 ${6 + magneticStrength * 6}px hsl(${color.h}, ${color.s}%, ${color.l}%))` : 'none'
                }}
              >
                <animate 
                  attributeName="opacity" 
                  values="0.5;1;0.5" 
                  dur={`${3 + i * 0.3}s`} 
                  repeatCount="indefinite"
                />
                <animate 
                  attributeName="stroke-width" 
                  values={`${2 + magneticStrength * 2};${4 + magneticStrength * 3};${2 + magneticStrength * 2}`}
                  dur={`${3 + i * 0.3}s`} 
                  repeatCount="indefinite"
                />
              </line>
              
              {/* Particle trail effect */}
              {isHovered && (
                <circle
                  cx={45 + (rayLength + waveOffset) * 0.7}
                  cy={baseY + magneticPull * 0.7}
                  r={1 + magneticStrength}
                  fill={`hsl(${color.h}, ${color.s}%, ${color.l}%)`}
                  opacity={magneticStrength * 0.8}
                >
                  <animate attributeName="r" values="1;3;1" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite"/>
                </circle>
              )}
            </g>
          );
        })}
      </g>
      
      {/* Typography - Benguiat's expressiveness meets Scher's boldness */}
      <g className="transition-all duration-500" style={{ opacity: variant === 'full' ? 1 : 0 }}>
        <text 
          x="80" 
          y="35" 
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif" 
          fontSize="24" 
          fontWeight="800" 
          fill={isDark ? "#f9fafb" : "#1f2937"}
          className="transition-all duration-500"
          style={{ 
            transform: `translate(${prismTiltX * 0.2}px, ${prismTiltY * 0.1}px)`,
            filter: isHovered ? `drop-shadow(0 0 ${8 + magneticStrength * 4}px rgba(99, 102, 241, 0.6))` : 'none'
          }}
        >
          Prism
          <animate 
            attributeName="fill" 
            values={isDark ? "#f9fafb;#818cf8;#22d3ee;#34d399;#fbbf24;#f9fafb" : "#1f2937;#6366f1;#06b6d4;#10b981;#f59e0b;#1f2937"} 
            dur="6s" 
            repeatCount="indefinite"/>
        </text>
        <text 
          x="80" 
          y="55" 
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif" 
          fontSize="16" 
          fontWeight="400" 
          fill={isDark ? "#d1d5db" : "#6b7280"}
          className="transition-all duration-500"
          style={{ 
            transform: `translate(${prismTiltX * 0.15}px, ${prismTiltY * 0.08}px)`,
            opacity: 0.9 + magneticStrength * 0.1
          }}
        >
          Writing
        </text>
      </g>

      {/* Interactive magnetic field visualization */}
      {isHovered && (
        <g>
          <circle
            cx={mousePos.x * 2}
            cy={mousePos.y * 0.8}
            r={magneticRadius * 0.4}
            fill="none"
            stroke="rgba(99,102,241,0.2)"
            strokeWidth="1"
            opacity={magneticStrength * 0.5}
          >
            <animate attributeName="r" values="15;35;15" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle
            cx={mousePos.x * 2}
            cy={mousePos.y * 0.8}
            r={magneticRadius * 0.6}
            fill="none"
            stroke="rgba(99,102,241,0.1)"
            strokeWidth="2"
            opacity={magneticStrength * 0.3}
          >
            <animate attributeName="r" values="25;50;25" dur="4s" repeatCount="indefinite"/>
          </circle>
        </g>
      )}
    </svg>
  );
};

export default AnimatedLogo;
