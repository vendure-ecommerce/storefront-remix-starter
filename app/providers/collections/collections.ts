import gql from 'graphql-tag';
import { CollectionListOptions } from '~/generated/graphql';
import { sdk } from '../../graphqlWrapper';

export function getCollections(
  request: Request,
  options?: CollectionListOptions,
) {
  return sdk.collections({ options }, { request }).then((result) => {
    return result.collections?.items;
  });
}

gql`
  query collections($options: CollectionListOptions) {
    collections(options: $options) {
      items {
        id
        name
        slug
        description
        parent {
          name
        }
        featuredAsset {
          id
          preview
        }
      }
    }
  }
`;

gql`
  query collection($slug: String, $id: ID) {
    collection(slug: $slug, id: $id) {
      id
      name
      slug
      description
      featuredAsset {
        id
        preview
      }
      breadcrumbs {
        id
        name
        slug
        assets {
          id
          preview
        }
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
`;
