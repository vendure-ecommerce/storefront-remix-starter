import gql from "graphql-tag";
import { sdk } from "../../graphqlWrapper";

export function getCollectionProducts(collectionId: string) {
  return sdk.collectionProducts({ collectionId, take: 12 });
}

export const listedProductFragment = gql`
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
  query collectionProducts(
    $collectionId: ID
    $collectionSlug: String
    $take: Int = 12
  ) {
    search(
      input: {
        take: $take
        groupByProduct: true
        collectionId: $collectionId
        collectionSlug: $collectionSlug
      }
    ) {
      items {
        ...ListedProduct
      }
    }
  }
  ${listedProductFragment}
`;
