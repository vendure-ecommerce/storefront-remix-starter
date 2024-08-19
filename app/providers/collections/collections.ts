import gql from 'graphql-tag';
import { sdk } from '../../graphqlWrapper';
import { listedProductFragment } from '../products/products';
import { CollectionListOptions } from '~/generated/graphql';

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
