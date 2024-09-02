'use client';

import { Link } from '@remix-run/react';
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link
      className="max-w-[10rem]"
      /* preventScrollReset */ to="/"
      prefetch="intent"
    >
      <img
        src="https://parkgep.hu/image/cache/catalog/branding/logo-color-3071x596.webp"
        width={256}
        height={42}
        alt="Logó"
      />
    </Link>
  );
};

export default Logo;
