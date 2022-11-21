import { Link, Links, Meta, Scripts } from '@remix-run/react';

export default function Catchall() {
  return (
    <main className="flex-grow mx-auto max-w-6xl w-full flex flex-col px-4 sm:px-6 lg:px-8">
      <div className="flex-shrink-0 my-auto py-16 sm:py-32">
        <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide">
          404 error
        </p>
        <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-2 text-base text-gray-500">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="text-base font-medium text-primary-600 hover:text-primary-500"
          >
            Go back home<span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
