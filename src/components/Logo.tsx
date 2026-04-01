import React from 'react';

interface LogoProps {
  inverted?: boolean;
  style?: React.CSSProperties;
  /** width in px - height scales proportionally (viewBox is 310x52) */
  width?: number;
}

export default function Logo({ inverted = false, style = {}, width = 180 }: LogoProps) {
  const src = inverted ? '/logo-white.svg' : '/logo-black.svg';
  const height = Math.round((52 / 310) * width);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="ZORODOOR"
      width={width}
      height={height}
      style={{
        display: 'block',
        width: `${width}px`,
        height: `${height}px`,
        objectFit: 'contain',
        objectPosition: 'left center',
        ...style,
      }}
    />
  );
}
