import { memoize } from 'lodash/fp';
import { CurrencyCode } from '../../generated/graphql';
import { ProductCardProps } from './ProductCard';

export function Price({
    priceWithTax,
    currencyCode,
}: {
    priceWithTax?: number | ProductCardProps['priceWithTax'];
    currencyCode?: ProductCardProps['currencyCode'];
}) {
    if (priceWithTax == null || !currencyCode) {
        return <></>;
    }
    if (typeof priceWithTax === 'number') {
        return <>{formatPrice(priceWithTax, currencyCode)}</>;
    }
    if ('value' in priceWithTax) {
        return <>{formatPrice(priceWithTax.value, currencyCode)}</>;
    }
    if (priceWithTax.min === priceWithTax.max) {
        return <>{formatPrice(priceWithTax.min, currencyCode)}</>;
    }
    return (
        <>
            {formatPrice(priceWithTax.min, currencyCode)} -{' '}
            {formatPrice(priceWithTax.max, currencyCode)}
        </>
    );
}

const currencyFormatter = memoize(
    (currency: CurrencyCode) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency }),
);
export function formatPrice(value: number, currency: CurrencyCode) {
    return currencyFormatter(currency).format(value / 100);
}
