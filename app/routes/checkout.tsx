import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Outlet, useLocation, useOutletContext } from '@remix-run/react';
import { CartContents } from '~/components/cart/CartContents';
import { OutletContext } from '~/types';
import { classNames } from '~/utils/class-names';
import { CartTotals } from '~/components/cart/CartTotals';

const steps = [
  { name: 'Shipping', state: 'shipping' },
  { name: 'Payment', state: 'payment' },
  { name: 'Confirmation', state: 'confirmation' },
];

export default function Checkout() {
  const outletContext = useOutletContext<OutletContext>();
  const { activeOrder, adjustOrderLine, removeItem } = outletContext;
  const location = useLocation();
  let state = 'shipping';
  if (location.pathname === '/checkout/payment') {
    state = 'payment';
  } else if (location.pathname.startsWith('/checkout/confirmation')) {
    state = 'confirmation';
  }
  let isConfirmationPage = state === 'confirmation';

  return (
    <div className="bg-gray-50">
      <div
        className={classNames(
          isConfirmationPage ? 'lg:max-w-3xl mx-auto' : 'lg:max-w-7xl',
          'max-w-2xl mx-auto pt-8 pb-24 px-4 sm:px-6 lg:px-8',
        )}
      >
        <h2 className="sr-only">Checkout</h2>
        <nav
          aria-label="Progress"
          className="hidden sm:block pb-8 mb-8 border-b"
        >
          <ol role="list" className="flex space-x-4 justify-center">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className="flex items-center">
                {step.state === state ? (
                  <span aria-current="page" className="text-primary-600">
                    {step.name}
                  </span>
                ) : (
                  <span>{step.name}</span>
                )}

                {stepIdx !== steps.length - 1 ? (
                  <ChevronRightIcon
                    className="w-5 h-5 text-gray-300 ml-4"
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </nav>
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div className={isConfirmationPage ? 'lg:col-span-2' : ''}>
            <Outlet context={outletContext} />
          </div>

          {/* Order summary */}
          {!isConfirmationPage && (
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order summary
              </h2>

              <CartContents
                orderLines={activeOrder?.lines ?? []}
                currencyCode={activeOrder?.currencyCode!}
                editable={state === 'shipping'}
                removeItem={removeItem}
                adjustOrderLine={adjustOrderLine}
              ></CartContents>
              <CartTotals order={activeOrder}></CartTotals>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
