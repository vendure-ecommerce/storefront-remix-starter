import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { ReactNode } from 'react';
import { mergeClassName } from '~/utils/class-names';
import { Button } from './Button';
import { HighlightedButton } from './HighlightedButton';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Modal = ({
  title,
  open,
  icon,
  iconBackground,
  children,

  submitProps,
  cancelProps,
}: {
  title: string;
  open: boolean;
  icon: ReactNode;
  iconBackground?: string;
  children: ReactNode | ReactNode[];

  submitProps?: ButtonProps;
  cancelProps?: ButtonProps;
}) => {
  return (
    <div
      className={`relative z-[100] ${open ? '' : 'hidden'}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div
                  className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${
                    iconBackground ? iconBackground : 'bg-white'
                  } sm:mx-0 sm:h-10 sm:w-10`}
                >
                  {icon}
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-xl leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  <div className="mt-2">
                    <div className="text-base text-gray-500">{children}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:bg-gray-100 px-4 pb-3 sm:pt-3 sm:px-6 sm:flex sm:flex-row-reverse sm:gap-x-4 space-y-2 sm:space-y-0">
              {cancelProps && (
                <Button
                  {...mergeClassName(
                    cancelProps,
                    'w-full sm:w-28 flex items-center gap-x-2 sm:gap-x-0 justify-center sm:justify-around',
                  )}
                >
                  <XMarkIcon className="w-4 h-4" /> Cancel
                </Button>
              )}

              {submitProps && (
                <HighlightedButton
                  {...mergeClassName(
                    submitProps,
                    'w-full sm:w-28 flex items-center gap-x-2 sm:gap-x-0 justify-center sm:justify-around',
                  )}
                >
                  <CheckIcon className="w-4 h-4" /> Submit
                </HighlightedButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
