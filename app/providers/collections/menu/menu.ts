import gql from 'graphql-tag';
import { CollectionListOptions } from '~/generated/graphql';
import { sdk } from '~/graphqlWrapper';

export function getCollectionMenuData(options?: CollectionListOptions) {
  return sdk.getCollectionsForMenu({ options });
}

export const collectionMenuQuery = gql`
  query getCollectionsForMenu($options: CollectionListOptions) {
    collections(options: $options) {
      items {
        id
        name
        slug
        description
        featuredAsset {
          id
          preview
        }
        children {
          id
          name
          slug
          featuredAsset {
            id
            preview
          }
        }
      }
    }
  }
`;
