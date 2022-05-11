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
      ...OrderDetail
      ...on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

export function activeOrder(options: QueryOptions) {
    return sdk.activeOrder(undefined, options).then(({activeOrder}) => activeOrder);
}

gql`
  fragment OrderDetail on Order {
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
`

gql`
  query activeOrder {
    activeOrder {
      ...OrderDetail
    }
  }
`;
