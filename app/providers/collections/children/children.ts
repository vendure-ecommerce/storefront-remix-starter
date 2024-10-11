import gql from 'graphql-tag';
import { CollectionListOptions } from '~/generated/graphql';
import { sdk } from '~/graphqlWrapper';

export function getCollectionChildren(
  collectionId: string,
  options?: CollectionListOptions,
) {
  return sdk.collectionChildren({
    options: {
      ...options,
      filter: { ...options?.filter, parentId: { eq: collectionId } },
    },
  });
}

gql`
  query collectionChildren($options: CollectionListOptions) {
    collections(options: $options) {
      items {
        id
        name
        slug
        description
        parentId
        featuredAsset {
          id
          preview
        }
      }
    }
  }
`;
