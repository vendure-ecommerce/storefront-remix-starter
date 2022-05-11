import gql from "graphql-tag";
import { sdk } from "../../graphqlWrapper";
import { SearchQueryVariables } from '~/generated/graphql';

export function search(variables: SearchQueryVariables) {
    return sdk.search(variables);
}

export function getProductBySlug(slug: string) {
    return sdk.product({slug});
}

export const detailedProductFragment = gql`
  fragment DetailedProduct on Product {
    id
    name
    description
    collections {
      id
      slug
      name
      breadcrumbs {
        id
        name
        slug
      }
    }
    facetValues {
      facet {
        code
      }
      name
    }
    featuredAsset {
      id
      preview
    }
    assets {
      id
      preview
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
  query search(
    $input: SearchInput!
  ) {
    search(
      input: $input
    ) {
      items {
        ...ListedProduct
      }
    }
  }
  ${listedProductFragment}
`;
