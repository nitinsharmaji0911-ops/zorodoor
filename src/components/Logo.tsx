import React from 'react';

interface LogoProps {
  className?: string;
  inverted?: boolean;
  style?: React.CSSProperties;
}

export default function Logo({ className = "", inverted = false, style = {} }: LogoProps) {
  const fill = inverted ? "#ffffff" : "#111111";

  return (
    <svg
      viewBox="0 0 560 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ZORODOOR"
      role="img"
      style={{
        display: 'block',
        width: '160px',
        height: '36px',
        overflow: 'visible',
        ...style,
      }}
      className={className}
    >
      <text
        x="0"
        y="62"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="72"
        fontWeight="700"
        fill={fill}
        letterSpacing="-2"
        dominantBaseline="auto"
        textAnchor="start"
      >
        ZORODOOR
      </text>
    </svg>
  );
}
