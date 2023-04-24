import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

type HighlightedButtonProps = React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> & {
  isSubmitting?: boolean;
}

export function HighlightedButton(
  { isSubmitting = false, ...props }: HighlightedButtonProps,
) {
  return (
    <button
      disabled={isSubmitting}
      {...props}
      className={clsx(
        'bg-primary-500 border border-transparent rounded-md py-2 px-4 text-base font-medium text-white',
        'focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-gray-800 hover:bg-primary-600',
        'disabled:opacity-50 disabled:hover:opacity-30',
        'flex items-center justify-around gap-2',
        props.className,
      )}
    >
      {props.children}
      {isSubmitting && <ArrowPathIcon className='w-4 h-4 animate-spin'></ArrowPathIcon>}
    </button>
  );
}
