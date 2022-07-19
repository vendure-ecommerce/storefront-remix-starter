import { useActiveOrder } from '~/utils/use-active-order';
import { CreateAddressInput } from '~/generated/graphql';

export type OutletContext = ReturnType<typeof useActiveOrder>;

export type ShippingFormData = CreateAddressInput;
