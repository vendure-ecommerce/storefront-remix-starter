import { RadioGroup } from '@headlessui/react';
import { classNames } from '~/utils/class-names';
import { Price } from '~/components/products/Price';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import {
  CurrencyCode,
  EligibleShippingMethodsQuery,
} from '~/generated/graphql';
import { useTranslation } from 'react-i18next';

export function ShippingMethodSelector({
  eligibleShippingMethods,
  currencyCode,
  shippingMethodId,
  onChange,
}: {
  eligibleShippingMethods: EligibleShippingMethodsQuery['eligibleShippingMethods'];
  shippingMethodId: string | undefined;
  onChange: (value?: string) => void;
  currencyCode?: CurrencyCode;
}) {
  const { t } = useTranslation();

  return (
    <RadioGroup value={shippingMethodId} onChange={onChange}>
      <RadioGroup.Label className="text-lg font-medium text-gray-900">
        {t('checkout.deliveryMethod')}
      </RadioGroup.Label>

      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        {eligibleShippingMethods.map((shippingMethod) => (
          <RadioGroup.Option
            key={shippingMethod.id}
            value={shippingMethod.id}
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
                      {shippingMethod.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="mt-6 text-sm font-medium text-gray-900"
                    >
                      <Price
                        priceWithTax={shippingMethod.priceWithTax}
                        currencyCode={currencyCode}
                      ></Price>
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
