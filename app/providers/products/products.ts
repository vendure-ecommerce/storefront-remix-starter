import gql from "graphql-tag";
import { sdk } from "../../graphqlWrapper";
import { CollectionProductsQueryVariables } from '~/generated/graphql';

export function getCollectionProducts(variables: CollectionProductsQueryVariables) {
  return sdk.collectionProducts(variables);
}

export function getProductBySlug(slug: string) {
  return sdk.product({ slug });
}

export const detailedProductFragment = gql`
  fragment DetailedProduct on Product {
    id
    name
    description

    facetValues {
      facet {
        code
      }
      name
    }

    assets {
      id
      source
    }

    variants {
      id
      name
      priceWithTax
      currencyCode
      sku
    }
  }
`;

gql`
  query product($slug: String, $id: ID) {
    product(slug: $slug, id: $id) {
      ...DetailedProduct
    }
  }
`;

export const listedProductFragment = gql`
  fragment ListedProduct on SearchResult {
    productId
    productName
    slug
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
