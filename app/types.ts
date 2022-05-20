import { useFetcher, useLoaderData } from '@remix-run/react';
import { Fetcher } from '@remix-run/react/transition';
import { useActiveOrder } from '~/utils/use-active-order';
import { CreateAddressInput, CreateCustomerInput } from '~/generated/graphql';

// Can remove once https://github.com/remix-run/remix/pull/2876 is available
export type FetcherWithComponents<TData> = ReturnType<typeof useFetcher> &
    Fetcher<TData>;

export type OutletContext = ReturnType<typeof useActiveOrder>;

export type ShippingFormData = CreateAddressInput;
