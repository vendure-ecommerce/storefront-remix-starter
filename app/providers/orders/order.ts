import gql from "graphql-tag";
import { sdk } from "../../graphqlWrapper";

export function addItemToOrder(productVariantId: string, quantity: number) {
  return sdk.addItemToOrder({
    productVariantId,
    quantity,
  });
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

export function activeOrder(options: { headers?: Headers}) {
  return sdk.activeOrder(undefined, options);
}

gql`
  query activeOrder {
    activeOrder {
      id
      createdAt
      state
      subTotalWithTax
      currencyCode
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
`;
