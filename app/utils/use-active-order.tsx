import { useFetcher } from '@remix-run/react';
import { CartLoaderData } from '~/routes/active-order';
import { useEffect } from 'react';

export function useActiveOrder() {
    const activeOrderFetcher = useFetcher<CartLoaderData>();
    useEffect(() => {
        if (activeOrderFetcher.type === 'init') {
            activeOrderFetcher.load('/active-order');
        }
    }, [activeOrderFetcher]);

    const { activeOrder } = activeOrderFetcher.data ?? {};
    const removeItem = (lineId: string) => {
        activeOrderFetcher.submit(
            {
                action: 'removeItem',
                lineId,
            },
            {
                method: 'post',
                action: '/active-order',
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
                action: '/active-order',
            },
        );
    };
    return { activeOrderFetcher, activeOrder, removeItem, adjustOrderLine };
}
