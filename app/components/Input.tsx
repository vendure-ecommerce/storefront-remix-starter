import React from 'react';
import { mergeClassName } from '~/utils/class-names';

export const Input = React.forwardRef(
  (
    props: React.PropsWithChildren<React.InputHTMLAttributes<HTMLInputElement>>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <input
        ref={ref}
        {...mergeClassName(
          props,
          'bg-white border border-gray-300 rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400',
        )}
      >
        {props.children}
      </input>
    );
  },
);
