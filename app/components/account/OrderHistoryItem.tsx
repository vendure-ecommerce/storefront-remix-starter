import { useState } from "react";
import { Button } from "~/components/Button";
import { Price } from '~/components/products/Price';
import { ActiveCustomerOrderListQuery } from "~/generated/graphql";
import { OrderStateBadge } from "~/components/account/OrderStateBadge";

type OrderHistoryItemProps = {
    order?: NonNullable<ActiveCustomerOrderListQuery['activeCustomer']>['orders']['items'][number]
    isInitiallyExpanded?: boolean
};


export default function OrderHistoryItem({
    order,
    isInitiallyExpanded = false,
}: OrderHistoryItemProps) {

    const [isExpanded, setIsExpanded] = useState<boolean>(isInitiallyExpanded);

    return (
        <div className="my-10 first:mt-0 last:mb-0 border rounded-lg">

        {/* Upper Summary */}
        <div className="p-4 lg:p-6
            flex flex-row justify-between items-center
            bg-gray-50
        ">
            {/* Infos */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-8 lg:gap-16">
                {/* Info - Date */}
                <div>
                    <span className="block font-medium">Date placed</span>
                    <span className="text-gray-500" title={(new Date(order?.orderPlacedAt)).toLocaleString()}>
                        {order?.orderPlacedAt ? (new Date(order.orderPlacedAt)).toLocaleDateString() : '--'}
                    </span>
                </div>
                {/* Info - Total sum */}
                <div>
                    <span className="block font-medium">Total sum</span>
                    <span className="text-gray-500">
                        <Price currencyCode={order?.currencyCode} priceWithTax={order?.totalWithTax}></Price>
                    </span>
                </div>
                {/* Info - Order number */}
                <div>
                    <span className="block font-medium">Order number</span>
                    <span className="text-gray-500">{order?.code || '--'}</span>
                </div>
            </div>

            {/* Status + Actions */}
            <div className="gap-4 lg:gap-6 flex flex-col items-end md:flex-row md:items-center self-start">
                <OrderStateBadge state={order?.state}/>
                <Button className="bg-white text-sm" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? 'Less details' : 'More details'}
                </Button>
            </div>
        </div>

        {/* Collapsable details */}
        {isExpanded && order?.lines.map((line, key) => (
        <div key={key} className="p-4 lg:p-6 border-t">
            <span className="flex flex-row justify-center text-gray-300 font-bold select-none">
                {line.productVariant.name}
            </span>
        </div>
        ))}

        </div>
    );
}

