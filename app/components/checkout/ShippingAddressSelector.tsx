import { RadioGroup } from '@headlessui/react';
import { classNames } from '~/utils/class-names';
import { Price } from '~/components/products/Price';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import {
  ActiveCustomerAddressesQuery,
  CurrencyCode,
  EligibleShippingMethodsQuery,
} from '~/generated/graphql';

export type SelectedAddress = NonNullable<
  NonNullable<ActiveCustomerAddressesQuery['activeCustomer']>['addresses']
>[number];

export function ShippingAddressSelector({
  addresses,
  selectedAddressIndex,
  onChange,
}: {
  addresses: SelectedAddress[];
  selectedAddressIndex: number;
  onChange: (value: number) => void;
}) {
  return (
    <RadioGroup value={selectedAddressIndex} onChange={onChange}>
      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        {(addresses || []).map((address, index) => (
          <RadioGroup.Option
            key={index}
            value={index}
            className={({ checked, active }) =>
              classNames(
                checked ? 'border-transparent' : 'border-gray-300',
                active ? 'ring-2 ring-primary-500' : '',
                'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none',
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex-1 flex">
                  <span className="flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className="block text-sm font-medium text-gray-900"
                    >
                      {address.streetLine1}, {address.postalCode}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="mt-6 text-sm text-gray-800"
                    >
                      <ul>
                        <li>{address.streetLine1}</li>
                        <li>{address.streetLine2}</li>
                        <li>{address.city}</li>
                        <li>{address.province}</li>
                        <li>{address.postalCode}</li>
                        <li>{address.country.name}</li>
                      </ul>
                    </RadioGroup.Description>
                  </span>
                </span>
                {checked ? (
                  <CheckCircleIcon
                    className="h-5 w-5 text-primary-600"
                    aria-hidden="true"
                  />
                ) : null}
                <span
                  className={classNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-primary-500' : 'border-transparent',
                    'absolute -inset-px rounded-lg pointer-events-none',
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
