import { useFetcher, useLoaderData } from '@remix-run/react';
import { useActiveOrder } from '~/utils/use-active-order';
import { CreateAddressInput, CreateCustomerInput } from '~/generated/graphql';

export type OutletContext = ReturnType<typeof useActiveOrder>;

export type ShippingFormData = CreateAddressInput;
