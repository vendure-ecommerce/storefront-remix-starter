import gql from 'graphql-tag';
import { QueryOptions, sdk } from '~/graphqlWrapper';

export function search(
  variables: { term: string; groupByProduct: boolean },
  options: QueryOptions,
) {
  // Használjuk az egyszerűsített lekérdezést
  return sdk.searchProduct(variables, options);
}

export const simpleSearchQuery = gql`
  query searchProduct($term: String, $groupByProduct: Boolean) {
    search(input: { term: $term, groupByProduct: $groupByProduct }) {
      totalItems
      items {
        productName
        productAsset {
          preview
        }
        customProductMappings {
          productSlug
        }
        score
        price {
          ... on PriceRange {
            min
            max
          }
        }
      }
    }
  }
`;
