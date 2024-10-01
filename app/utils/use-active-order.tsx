import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { CartLoaderData } from '~/_routes/api/active-order';
import { ActiveCustomerData } from '~/routes/api/user/get-active-customer';

export function useActiveOrder() {
  const activeCustomerFetcher = useFetcher<ActiveCustomerData>();
  useEffect(() => {
    if (activeCustomerFetcher.state === 'idle' && !activeCustomerFetcher.data) {
      activeCustomerFetcher.load('/api/user/get-active-customer');
    }
  }, [activeCustomerFetcher]);

  const activeOrderFetcher = useFetcher<CartLoaderData>();
  useEffect(() => {
    if (activeOrderFetcher.state === 'idle' && !activeOrderFetcher.data) {
      activeOrderFetcher.load('/api/active-order');
    }
  }, [activeOrderFetcher]);

  function refresh() {
    activeOrderFetcher.load('/api/active-order');
  }

  const { activeCustomer } = activeCustomerFetcher.data ?? {};
  const { activeOrder } = activeOrderFetcher.data ?? {};
  const removeItem = (lineId: string) => {
    activeOrderFetcher.submit(
      {
        action: 'removeItem',
        lineId,
      },
      {
        method: 'post',
        action: '/api/active-order',
      },
    );
  };
  const adjustOrderLine = (lineId: string, quantity: number) => {
    activeOrderFetcher.submit(
      {
        action: 'adjustItem',
        lineId,
        quantity: quantity.toString(),
      },
      {
        method: 'post',
        action: '/api/active-order',
      },
    );
  };
  return {
    activeCustomerFetcher,
    activeCustomer,
    activeOrderFetcher,
    activeOrder,
    removeItem,
    adjustOrderLine,
    refresh,
  };
}
