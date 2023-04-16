import { useState } from "react";
import { Button } from "~/components/Button";
import { Price } from '~/components/products/Price';
import { ActiveCustomerOrderListQuery } from "~/generated/graphql";
import { OrderStateBadge } from "~/components/account/OrderStateBadge";
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { ArrowTopRightOnSquareIcon, EllipsisHorizontalCircleIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";

type OrderHistoryItemProps = {
    order?: NonNullable<ActiveCustomerOrderListQuery['activeCustomer']>['orders']['items'][number]
    isInitiallyExpanded?: boolean
    areDetailsInitiallyExpanded?: boolean
};


export default function OrderHistoryItem({
    order,
    isInitiallyExpanded = false,
    areDetailsInitiallyExpanded = false,
}: OrderHistoryItemProps) {

    const [isExpanded, setIsExpanded] = useState<boolean>(isInitiallyExpanded);
    const [areDetailsExpanded, setAreDetailsExpanded] = useState<boolean>(areDetailsInitiallyExpanded);

    return (
        <div className="my-10 first:mt-0 last:mb-0 border rounded-lg">

            {/* Upper Summary */}
            <div className="p-4 lg:p-6
            flex flex-row justify-between items-center
            bg-gray-50 border-b
        ">
                {/* Infos */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-16 text-sm">
                    {/* Info - Date */}
                    <div>
                        <span className="block font-medium">Date placed</span>
                        <span className="text-gray-500" title={(new Date(order?.orderPlacedAt)).toLocaleString()}>
                            {order?.orderPlacedAt ? (new Date(order.orderPlacedAt))
                                .toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })
                                :
                                '--'
                            }
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
                <div className="gap-4 lg:gap-6 flex flex-col items-end self-stretch justify-between md:flex-row md:items-center self-start">
                    <OrderStateBadge state={order?.state} />
                    <Button className="bg-white text-sm" onClick={() => setIsExpanded(!isExpanded)}>
                        <ChevronRightIcon className={`w-5 h-5 transition-transform duration-100 ${isExpanded && 'rotate-90'}`} />
                    </Button>
                </div>
            </div>

            {/* Collapsable details */}
            {isExpanded && (
                <div className="flex flex-col">
                    {order?.lines.map((line, key) => (
                        <div key={key} className="p-4 lg:p-6 border-b flex flex-row gap-8 justify-between">
                            {/* Product */}
                            <div className="inline-flex justify-center items-center justify gap-4">
                                <img src={line.featuredAsset?.source} className="w-24 h-24 object-cover rounded-md" />
                                <span className="flex flex-1 flex-col gap-0">
                                    {/* Product name */}
                                    <span className="text-black text-sm font-semibold line-clamp-3 md:line-clamp-2 max-w-md" title={line.productVariant.name}>
                                        {line.productVariant.name}
                                    </span>
                                    {/* Price and quantity */}
                                    <span className="text-gray-500 text-sm mt-1">
                                        <Price currencyCode={line.productVariant.currencyCode} priceWithTax={line.discountedLinePriceWithTax}></Price><span className="mx-3">-</span>{line.quantity} item{line.quantity > 1 ? 's' : ''}
                                    </span>
                                    {/* Shipment status */}
                                    <span className="text-gray-500 text-xs mt-2 tracking-wide">
                                        {line.fulfillments && line.fulfillments.length === 0 && ('Not shipped yet')}
                                        {line.fulfillments?.map((f, i) => (
                                            <span key={i} className="block" title={(new Date(f.updatedAt)).toLocaleString()}>
                                                {f.state}: {new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(f.updatedAt))}
                                            </span>
                                        ))}
                                    </span>
                                </span>
                            </div>
                            {/* Per product actions */}
                            <div className="inline-flex flex-col lg:flex-row justify-center items-stretch md:items-center gap-4 lg:gap-6">
                                {/* <Button disabled title="Not implemented"><span className="text-sm">Write a review</span></Button> */}
                                {/* <Button disabled title="Not implemented"><span className="text-sm">Return or replace</span></Button> */}
                                <Button disabled title="Not implemented" className="!p-1 md:!py-2 md:!px-4 !h-full md:!h-auto">
                                    <span className="text-xs hidden md:block">Actions</span>
                                    <EllipsisVerticalIcon className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {/* Per order actions */}
                    <div className="p-2 lg:py-3 lg:px-6 flex justify-end gap-2 lg:gap-6">
                        <Button disabled title="Not implemented">
                            <span className="text-xs">Get product support</span>
                        </Button>
                        <Button disabled title="Not implemented">
                            <span className="text-xs">View invoice</span>
                            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => setAreDetailsExpanded(!areDetailsExpanded)}>
                            <span className="text-xs">Detailed overview</span>
                            <ChevronRightIcon className={`w-5 h-5 transition-transform duration-100 ${areDetailsExpanded && 'rotate-90'}`} />
                        </Button>
                    </div>

                    {/* More details - Could be expanded with shipping adresses, payment option, etc. */}
                    {areDetailsExpanded && (
                        <div className="p-2 lg:p-3 grid grid-cols-2 gap-1 text-sm max-w-sm self-center md:self-end">
                            <h6 className="font-medium col-span-full">Order summary</h6>
                            <span>Item(s) Subtotal:</span>
                            <span className="text-end"><Price currencyCode={order?.currencyCode} priceWithTax={order?.subTotalWithTax}></Price></span>

                            <span>Shipping & handling:</span>
                            <span className="text-end"><Price currencyCode={order?.currencyCode} priceWithTax={order?.shippingLines.reduce((acc, s) => acc + s.priceWithTax, 0)}></Price></span>

                            <span>Total before tax:</span>
                            <span className="text-end"><Price currencyCode={order?.currencyCode} priceWithTax={order?.taxSummary.reduce((acc, t) => acc + t.taxBase, 0)}></Price></span>

                            <span>Estimated tax:</span>
                            <span className="text-end"><Price currencyCode={order?.currencyCode} priceWithTax={order?.taxSummary.reduce((acc, t) => acc + t.taxTotal, 0)}></Price></span>

                            <span>Total:</span>
                            {order?.totalWithTax && order.discounts ? (
                                <span className="text-end"><Price currencyCode={order?.currencyCode} priceWithTax={order.totalWithTax - order?.discounts.reduce((acc, curr) => acc + curr.amountWithTax, 0)}></Price></span>
                            ) : (
                                <span className="text-end">--</span>
                            )}

                            <span>Applied coupons:</span>
                            <span className="text-end"><Price currencyCode={order?.currencyCode} priceWithTax={order?.discounts.reduce((acc, curr) => acc + curr.amountWithTax, 0)}></Price></span>

                            <span className="font-medium">Grand total:</span>
                            <span className="font-medium text-end"><Price currencyCode={order?.currencyCode} priceWithTax={order?.totalWithTax}></Price></span>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}

