import { useFetcher } from '@remix-run/react';
import { Fetcher } from '@remix-run/react/transition';

// Can remove once https://github.com/remix-run/remix/pull/2876 is available
export type FetcherWithComponents<TData> = ReturnType<typeof useFetcher> & Fetcher<TData>;
