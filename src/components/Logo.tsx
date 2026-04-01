import React from 'react';

interface LogoProps {
  className?: string;
  inverted?: boolean;
  style?: React.CSSProperties;
}

export default function Logo({ className = "", inverted = false, style = {} }: LogoProps) {
  // Use explicit color to guarantee visibility regardless of Tailwind runtime or Dark Mode extensions
  const explicitColor = inverted ? "#ffffff" : "#111111";
  
  return (
    <svg 
      viewBox="0 0 400 90" 
      preserveAspectRatio="xMinYMid meet"
      className={`inline-block ${className}`}
      style={{ height: '1.2em', width: 'auto', ...style }}
    >
      <text
        x="0"
        y="70"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="85"
        fontWeight="bold"
        fill={explicitColor}
        letterSpacing="-3"
      >
        ZORODOOR
      </text>
    </svg>
  );
}
