import React from 'react';

interface LogoProps {
  className?: string;
  inverted?: boolean;
  style?: React.CSSProperties;
}

export default function Logo({ inverted = false, style = {} }: LogoProps) {
  const src = inverted ? '/logo-white.svg' : '/logo-black.svg';
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="ZORODOOR"
      width={160}
      height={36}
      style={{
        display: 'block',
        width: '160px',
        height: '36px',
        objectFit: 'contain',
        objectPosition: 'left center',
        ...style,
      }}
    />
  );
}
