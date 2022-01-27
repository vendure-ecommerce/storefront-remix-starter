import gql from "graphql-tag";
import { sdk } from "../graphqlWrapper";

export function getCollectionProducts(collectionId: string) {
  return sdk.collectionProducts({ collectionId });
}

const listedProductFragment = gql`
  fragment ListedProduct on SearchResult {
    productId
    productName
    productAsset {
      id
      preview
    }
    currencyCode
    priceWithTax {
      ... on PriceRange {
        min
        max
      }
      ... on SinglePrice {
        value
      }
    }
  }
`;

gql`
  query collectionProducts($collectionId: ID!) {
    search(
      input: { take: 12, groupByProduct: true, collectionId: $collectionId }
    ) {
      items {
        ...ListedProduct
      }
    }
  }
  ${listedProductFragment}
`;
