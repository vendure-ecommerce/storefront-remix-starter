import clsx, { ClassValue } from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function mergeClassName(props: React.HTMLAttributes<any>, className: string) {
  if (props.className !== undefined) {
    return {
      ...props,
      className: `${props.className} ${className}`,
    };
  }

  return {
    ...props,
    className: className,
  };
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { classNames, cn, mergeClassName };
