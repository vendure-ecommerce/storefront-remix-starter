import { DataFunctionArgs } from '@remix-run/server-runtime';
import { getOrderByCode } from '~/providers/orders/order';
import { useLoaderData } from '@remix-run/react';
import { CartContents } from '~/components/cart/CartContents';
import { CartTotals } from '~/components/cart/CartTotals';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useRevalidator } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { OrderDetailFragment } from '~/generated/graphql';
import { useTranslation } from 'react-i18next';

export async function loader({ params, request }: DataFunctionArgs) {
  try {
    const order = await getOrderByCode(params.orderCode!, { request });
    return {
      order,
      error: false,
    };
  } catch (ex) {
    return {
      order: null,
      error: true,
    };
  }
}

export default function CheckoutConfirmation() {
  const { order, error } = useLoaderData<typeof loader>();
  const revalidator = useRevalidator();
  const [retries, setRetries] = useState(1);
  const { t } = useTranslation();

  const orderNotFound = !order && !error;
  const orderErrored = !order && error;
  const maxRetries = 5;
  const retriesExhausted = retries >= maxRetries;
  const retryTimeout = 2500;

  const retry = () => {
    if (!window) return;
    setRetries(retries + 1);
    window.setTimeout(() => {
      if (retries > maxRetries) return;
      revalidator.revalidate();
    }, retryTimeout);
  };

  useEffect(() => {
    if (orderErrored) {
      retry();
    }
  }, [order]);

  useEffect(() => {
    if (
      revalidator.state === 'idle' &&
      orderErrored &&
      retries <= maxRetries &&
      retries > 1
    ) {
      retry();
    }
  }, [revalidator.state]);

  if (orderNotFound) {
    return (
      <div>
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          {t('checkout.orderNotFound')}
        </h2>
      </div>
    );
  }

  if (orderErrored && retriesExhausted) {
    return (
      <div>
        <h2 className="text-3xl flex items-center space-x-2 sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          <XCircleIcon className="text-red-600 w-8 h-8 sm:w-12 sm:h-12"></XCircleIcon>
          <span>{t('checkout.orderErrorTitle')}</span>
        </h2>
        <p className="text-lg text-gray-700">
          {t('checkout.orderErrorMessage')}
        </p>
      </div>
    );
  }

  if (orderErrored) {
    return (
      <div>
        <h2 className="text-3xl flex items-center space-x-2 sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          {t('checkout.orderProcessing')}
        </h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl flex items-center space-x-2 sm:text-5xl font-light tracking-tight text-gray-900 my-8">
        <CheckCircleIcon className="text-green-600 w-8 h-8 sm:w-12 sm:h-12"></CheckCircleIcon>
        <span>{t('order.summary')}</span>
      </h2>
      <p className="text-lg text-gray-700">
        {t('checkout.orderSuccessMessage')}{' '}
        <span className="font-bold">{order!.code}</span>
      </p>
      {order!.active && (
        <div className="rounded-md bg-blue-50 p-4 my-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon
                className="h-5 w-5 text-blue-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">
                {t('checkout.paymentMessage')}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="mt-12">
        <div className="mb-6">
          <CartContents
            orderLines={order!.lines}
            currencyCode={order!.currencyCode}
            editable={false}
          />
        </div>
        <CartTotals order={order as OrderDetailFragment}></CartTotals>
      </div>
    </div>
  );
}
