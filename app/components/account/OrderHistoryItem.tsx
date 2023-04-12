import { useState } from "react";
import { Button } from "~/components/Button";
import { Order } from "~/generated/graphql";


type OrderHistoryItemProps = {
    order?: Order // TODO: Is this the correct type?
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
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                {/* Info - Order number */}
                <div>
                    <span className="block font-medium">Order number</span>
                    <span className="text-gray-500">{order?.code || '--'}</span>
                </div>
                {/* Info - Date */}
                <div>
                    <span className="block font-medium">Date placed</span>
                    <span className="text-gray-500" title={(new Date(order?.createdAt)).toLocaleString()}>
                        {order?.createdAt ? (new Date(order.createdAt)).toLocaleDateString() : '--'}
                    </span>
                </div>
                {/* Info - Total sum */}
                <div>
                    <span className="block font-medium">Total sum</span>
                    {/* TODO: replace with actual values */}
                    <span className="text-gray-500">
                        {/* {new Intl.NumberFormat(undefined, { currency: order?.currencyCode, style: "currency" }).format(order?.totalWithTax || 0)} */}
                        {order?.totalWithTax || '--'}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-4 lg:gap-6 self-start">
                <Button className="bg-white text-sm" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? 'Less details' : 'More details'}
                </Button>
                <Button className="bg-white text-sm" disabled title="Not implemented">Invoice</Button>
            </div>
        </div>

        {/* Collapsable details */}
        {isExpanded && order?.lines?.map(line => (
        <div key={line.id} className="p-4 lg:p-6 border-t">
            <span className="flex flex-row justify-center text-gray-300 font-bold select-none">TODO</span>
        </div>
        ))}

        </div>
    );
}

