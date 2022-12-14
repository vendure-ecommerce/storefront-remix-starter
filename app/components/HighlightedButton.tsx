import { mergeClassName } from '~/utils/class-names';

export function HighlightedButton(
  props: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>,
) {
  return (
    <button
      {...mergeClassName(
        props,
        'bg-primary-500 border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-gray-800',
      )}
    >
      {props.children}
    </button>
  );
}
