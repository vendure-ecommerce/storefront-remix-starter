import gql from 'graphql-tag';
import { QueryOptions, sdk } from '~/graphqlWrapper';

export function search(variables: { term: string }, options: QueryOptions) {
  // Használjuk az egyszerűsített lekérdezést
  return sdk.searchProduct(variables, options);
}

export const simpleSearchQuery = gql`
  query searchProduct($term: String) {
    search (input: {
      term: $term
      groupByProduct: true
    }) {
      totalItems
      items {
        productName
        score
        price {
          ...on PriceRange {
            min
            max
          }
        }
      }
    }
  }
`;