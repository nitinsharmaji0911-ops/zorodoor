import React from 'react';

interface LogoProps {
  className?: string;
  inverted?: boolean;
  style?: React.CSSProperties;
}

export default function Logo({ className = "", inverted = false, style = {} }: LogoProps) {
  // If inverted is true, force whitetext. Otherwise fallback to current color.
  const textColor = inverted ? "text-white" : "text-[#111] dark:text-white";
  
  return (
    <span className={`flex items-center leading-[0.9] uppercase ${textColor} ${className}`} 
          style={{ fontFamily: 'Georgia, "Times New Roman", serif', ...style }}>
      <span className="tracking-tighter">ZOROD</span>
      <span style={{ letterSpacing: '-0.38em' }}>OO</span>
      <span style={{ marginLeft: '0.38em' }} className="tracking-tighter">R</span>
    </span>
  );
}
