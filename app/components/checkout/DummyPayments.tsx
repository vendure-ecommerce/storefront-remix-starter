import { CreditCardIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { Form } from '@remix-run/react';
import { EligiblePaymentMethodsQuery } from '~/generated/graphql';

export function DummyPayments({
  paymentMethod,
  paymentError,
}: {
  paymentMethod: EligiblePaymentMethodsQuery['eligiblePaymentMethods'][number];
  paymentError?: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-gray-600 text-sm p-6">
        This is a dummy payment for demonstration purposes only
      </p>
      {paymentError && (
        <div className="rounded-md bg-red-50 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                There was an error processing the payment
              </h3>
              <div className="mt-2 text-sm text-red-700">{paymentError}</div>
            </div>
          </div>
        </div>
      )}
      <Form method="post">
        <input
          type="hidden"
          name="paymentMethodCode"
          value={paymentMethod.code}
        />
        <button
          type="submit"
          className="flex px-6 bg-primary-600 hover:bg-primary-700 items-center justify-center space-x-2 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <CreditCardIcon className="w-5 h-5"></CreditCardIcon>
          <span>Pay with {paymentMethod.name}</span>
        </button>
      </Form>
    </div>
  );
}
