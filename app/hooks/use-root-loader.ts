import { useMatches } from '@remix-run/react';
import { loader as rootLoader } from '~/root';

type LoaderDataType = Awaited<ReturnType<typeof rootLoader>>;

export function useRootLoader(): LoaderDataType {
    return useMatches().find(match => match.id === 'root')!.data as LoaderDataType
}
