import React from 'react';

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

export { classNames, mergeClassName };
