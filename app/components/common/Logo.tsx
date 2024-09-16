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
        src="https://sanitech.hu/image/catalog/branding/logo.png"
        width={256}
        height={42}
        alt="Logó"
      />
    </Link>
  );
};

export default Logo;
