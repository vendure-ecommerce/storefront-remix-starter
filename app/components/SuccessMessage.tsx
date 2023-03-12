import { CheckIcon } from '@heroicons/react/24/solid';

export function SuccessMessage({
  heading,
  message,
}: {
  heading: string;
  message: string;
}) {
  return (
    <div className="rounded-md bg-green-50 p-4 max-w-lg">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">{heading}</h3>
          <p className="text-sm text-green-700 mt-2">{message}</p>
        </div>
      </div>
    </div>
  );
}
