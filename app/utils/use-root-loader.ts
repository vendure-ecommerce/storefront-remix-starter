import { useMatches } from '@remix-run/react';
import { loader as rootLoader, RootLoaderData } from '~/root';

export function useRootLoader(): RootLoaderData {
  return useMatches().find((match) => match.id === 'root')!
    .data as RootLoaderData;
}
