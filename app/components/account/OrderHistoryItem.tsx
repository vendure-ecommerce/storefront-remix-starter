import { useState } from "react";
import { Button } from "~/components/Button";
import { Price } from '~/components/products/Price';
import { ActiveCustomerOrderListQuery } from "~/generated/graphql";
import { OrderStateBadge } from "~/components/account/OrderStateBadge";
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";

type OrderHistoryItemProps = {
    order?: NonNullable<ActiveCustomerOrderListQuery['activeCustomer']>['orders']['items'][number]
    isInitiallyExpanded?: boolean
    areDetailsInitiallyExpanded?: boolean
    className?: string
};


export default function OrderHistoryItem({
    order,
    isInitiallyExpanded = false,
    areDetailsInitiallyExpanded = false,
    className,
}: OrderHistoryItemProps) {

    const [isExpanded, setIsExpanded] = useState<boolean>(isInitiallyExpanded);
    const [areDetailsExpanded, setAreDetailsExpanded] = useState<boolean>(areDetailsInitiallyExpanded);
    const [isLineCalcExpanded, setIsLineCalcExpanded] = useState<boolean>(false);

    return (
        <div className={`border rounded-lg overflow-hidden ${className}`}>

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
                    <div className="flex" role="group">
                        <Button title="Actions for this order (Not implemented)" className="bg-white text-sm rounded-r-none border-r-0">
                            <span className="text-xs hidden">Actions</span>
                            <EllipsisVerticalIcon className="w-5 h-5" />
                        </Button>
                        <Button className="bg-white text-sm rounded-l-none" onClick={() => setIsExpanded(!isExpanded)} title="Expand this order">
                            <ChevronRightIcon className={`w-5 h-5 transition-transform duration-100 ${isExpanded && 'rotate-90'}`} />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Collapsable details */}
            {isExpanded && (
                <div className="flex flex-col">
                    {order?.lines.map((line, key) => (
                        <div key={key} className="p-4 lg:p-6 border-b flex flex-row gap-8 justify-between group">
                            {/* Product */}
                            <div className="inline-flex justify-center items-center justify gap-4">
                                <Link to={`/products/${line.productVariant.product.slug}`} className="hover:opacity-50 transition-opacity"><img src={line.featuredAsset?.source} className="w-24 h-24 object-cover rounded-md" /></Link>
                                <span className="flex flex-1 flex-col gap-0">
                                    {/* Product name */}
                                    <Link
                                        to={`/products/${line.productVariant.product.slug}`}
                                        className="text-black text-sm font-semibold line-clamp-3 md:line-clamp-2 max-w-md hover:text-black/50"
                                        title={line.productVariant.name}
                                    >
                                        {line.productVariant.name}
                                    </Link>
                                    {/* Price and quantity */}
                                    <button className="inline-flex gap-2 items-center w-fit text-gray-500 text-sm mt-1" onClick={() => setIsLineCalcExpanded(!isLineCalcExpanded)}>
                                        {isLineCalcExpanded && (<>
                                            <span title="Quantity">{line.quantity}</span>
                                            <span className="text-gray-300 select-none">×</span>
                                            <span title="Price per unit"><Price currencyCode={line.productVariant.currencyCode} priceWithTax={line.discountedUnitPriceWithTax}></Price></span>
                                            <span className="text-gray-300 select-none">Ξ</span>
                                        </>)}
                                        <span title="Subtotal"><Price currencyCode={line.productVariant.currencyCode} priceWithTax={line.discountedLinePriceWithTax}></Price></span>
                                    </button>
                                    {/* Shipment status */}
                                    <span className="text-gray-500 text-xs mt-2 tracking-wide">
                                        {line.fulfillmentLines?.reduce((acc, fLine) => acc + fLine.quantity, 0) === 0 ?
                                            'Not shipped yet'
                                            :
                                            `${line.fulfillmentLines?.reduce((acc, fLine) => acc + fLine.quantity, 0)} of ${line.quantity} items fulfilled`
                                        }
                                        {line.fulfillmentLines?.filter(fLine => fLine.quantity > 0).map((fLine, key) => (
                                            <span key={key} className="block first:mt-2" title={(new Date(fLine.fulfillment.updatedAt)).toLocaleString()}>
                                                {fLine.fulfillment.state}: {new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(fLine.fulfillment.updatedAt))}
                                            </span>
                                        ))}
                                    </span>
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Per order actions */}
                    <div className="p-2 lg:py-3 lg:px-6 gap-2 lg:gap-6 grid grid-cols-2 sm:flex justify-end items-center">
                        {order?.fulfillments?.map((f, i) => (
                            <Button
                                key={i}
                                onClickCapture={() => alert(`Here you'd need to Link your delivery service. Tracking code for this package is "${f.trackingCode}"`)}
                                className="text-xs"
                            >
                                {/* Only show package number if there are more than one: Looks cleaner */}
                                Track package {order.fulfillments?.length == 1 ? "" : `#${i + 1}`}
                            </Button>
                        ))}
                        <Button onClick={() => setAreDetailsExpanded(!areDetailsExpanded)} className="col-start-2">
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

