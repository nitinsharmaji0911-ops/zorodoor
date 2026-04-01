import React from 'react';

interface LogoProps {
  className?: string;
  inverted?: boolean;
  style?: React.CSSProperties;
}

export default function Logo({ className = "", inverted = false, style = {} }: LogoProps) {
  // Use explicit inline color to guarantee visibility regardless of Tailwind runtime or Dark Mode extensions
  const explicitColor = inverted ? "#ffffff" : "#111111";
  
  return (
    <span className={`inline-flex items-center leading-[0.9] uppercase ${className}`} 
          style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: explicitColor, ...style }}>
      <span className="tracking-tighter">ZOROD</span>
      <span style={{ letterSpacing: '-0.38em' }}>OO</span>
      <span style={{ marginLeft: '0.38em' }} className="tracking-tighter">R</span>
    </span>
  );
}
