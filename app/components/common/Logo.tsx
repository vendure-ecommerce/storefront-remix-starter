'use client';

import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <a className="max-w-[10rem]" href="/">
      <img
        src="https://sanitech.hu/image/catalog/branding/logo.png"
        width={256}
        height={42}
        alt="Logó"
      />
    </a>
  );
};

export default Logo;
