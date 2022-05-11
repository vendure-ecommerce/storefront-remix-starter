import gql from "graphql-tag";
import { QueryOptions, sdk } from "../../graphqlWrapper";

export function addItemToOrder(productVariantId: string, quantity: number, options: QueryOptions) {
  return sdk.addItemToOrder({
    productVariantId,
    quantity,
  }, options);
}

gql`
  mutation addItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ... on Order {
        id
        createdAt
        state
        lines {
          id
          productVariant {
            id
            name
            price
          }
        }
      }
    }
  }
`;

export function activeOrder(options: QueryOptions) {
  return sdk.activeOrder(undefined, options).then(({ activeOrder }) => activeOrder);
}

gql`
  query activeOrder {
    activeOrder {
      id
      createdAt
      state
      currencyCode
      totalQuantity
      subTotalWithTax
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
  }
`;
