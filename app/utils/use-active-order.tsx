import { useFetcher } from '@remix-run/react';
import { CartLoaderData } from '~/routes/api/active-order';
import { useEffect } from 'react';

export function useActiveOrder() {
  const activeOrderFetcher = useFetcher<CartLoaderData>();
  useEffect(() => {
    if (activeOrderFetcher.type === 'init') {
      activeOrderFetcher.load('/api/active-order');
    }
  }, [activeOrderFetcher]);

  function refresh() {
    activeOrderFetcher.load('/api/active-order');
  }

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
    activeOrderFetcher,
    activeOrder,
    removeItem,
    adjustOrderLine,
    refresh,
  };
}
