import gql from 'graphql-tag';
import { QueryOptions, sdk } from '../../graphqlWrapper';

export function addItemToOrder(
    productVariantId: string,
    quantity: number,
    options: QueryOptions,
) {
    return sdk.addItemToOrder(
        {
            productVariantId,
            quantity,
        },
        options,
    );
}

export function removeOrderLine(lineId: string, options: QueryOptions) {
    return sdk.removeOrderLine({ orderLineId: lineId }, options);
}

export function adjustOrderLine(
    lineId: string,
    quantity: number,
    options: QueryOptions,
) {
    return sdk.adjustOrderLine({ orderLineId: lineId, quantity }, options);
}

gql`
    mutation addItemToOrder($productVariantId: ID!, $quantity: Int!) {
        addItemToOrder(
            productVariantId: $productVariantId
            quantity: $quantity
        ) {
            __typename
            ...OrderDetail
            ... on ErrorResult {
                errorCode
                message
            }
        }
    }
`;

gql`
    mutation removeOrderLine($orderLineId: ID!) {
        removeOrderLine(orderLineId: $orderLineId) {
            __typename
            ...OrderDetail
            ... on ErrorResult {
                errorCode
                message
            }
        }
    }
`;

gql`
    mutation adjustOrderLine($orderLineId: ID!, $quantity: Int!) {
        adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
            __typename
            ...OrderDetail
            ... on ErrorResult {
                errorCode
                message
            }
        }
    }
`;

export function getActiveOrder(options: QueryOptions) {
    return sdk
        .activeOrder(undefined, options)
        .then(({ activeOrder }) => activeOrder);
}

gql`
    fragment OrderDetail on Order {
        id
        createdAt
        state
        currencyCode
        totalQuantity
        subTotal
        subTotalWithTax
        taxSummary {
            description
            taxRate
            taxTotal
        }
        shippingWithTax
        totalWithTax
        lines {
            id
            unitPriceWithTax
            linePriceWithTax
            quantity
            featuredAsset {
                id
                preview
            }
            productVariant {
                id
                name
                price
                product {
                    id
                    slug
                }
            }
        }
    }
`;

gql`
    query activeOrder {
        activeOrder {
            ...OrderDetail
        }
    }
`;
