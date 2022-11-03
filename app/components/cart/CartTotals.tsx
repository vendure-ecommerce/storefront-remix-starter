import { Price } from '~/components/products/Price';
import * as React from 'react';
import { OrderDetailFragment } from '~/generated/graphql';
import { VatInfo } from '../VatInfo';

export function CartTotals({ order }: { order?: OrderDetailFragment | null }) {
    return (
        <dl className="border-t mt-6 border-gray-200 py-6 space-y-6">
            <div className="flex items-center justify-between">
                <dt className="text-sm">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                    <Price
                        priceWithTax={order?.subTotalWithTax}
                        currencyCode={order?.currencyCode}
                    ></Price>
                </dd>
            </div>
            <div className="flex items-center justify-between">
                <dt className="text-sm">Shipping</dt>
                <dd className="text-sm font-medium text-gray-900">
                    <Price
                        priceWithTax={order?.shippingWithTax ?? 0}
                        currencyCode={order?.currencyCode}
                    ></Price>
                </dd>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-base font-medium">Total</dt>
                <dd className="text-base font-medium text-gray-900">
                    <Price
                        priceWithTax={order?.totalWithTax}
                        currencyCode={order?.currencyCode}
                    ></Price>
                </dd>
            </div>

            {order?.taxSummary.length ?? 0 > 0 ? (
                <div className="flex items-center justify-between">
                <dt className="text-sm">Incl. {order?.taxSummary[0]?.taxRate ?? 0}% VAT</dt>
                <dd className="text-sm font-medium text-gray-900">
                    <Price
                        priceWithTax={order?.taxSummary.map(x => x.taxTotal).reduce((a,b) => a + b) ?? 0}
                        currencyCode={order?.currencyCode}
                    ></Price>
                </dd>
            </div>
            ) : ""}
            
        </dl>
    );
}
