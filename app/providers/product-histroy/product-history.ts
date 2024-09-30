import gql from 'graphql-tag';
import {
  CreateProductHistoryInput,
  ProductHistoryInput,
  ProductHistoryListOptions,
  UpdateProductHistoryInput,
} from '~/generated/graphql';
import { sdk } from '~/graphqlWrapper';

export function addProductToProductHistory(input: CreateProductHistoryInput) {
  return sdk.createProductHistory({ input });
}

export function updateProductHistory(input: UpdateProductHistoryInput) {
  return sdk.updateProductHistory({ input });
}

export function getProductHistoryList(options: ProductHistoryListOptions) {
  return sdk.productHistories({ options });
}

export function getProductHistory(input: ProductHistoryInput) {
  return sdk.productHistory({ input });
}

export function deleteProductHistory(input: ProductHistoryInput) {
  return sdk.deleteProductHistory({ input });
}

gql`
  mutation createProductHistory($input: CreateProductHistoryInput!) {
    createProductHistory(input: $input) {
      ... on ProductHistory {
        id
      }
      ... on ProductHistoryError {
        errorCode
        message
      }
    }
  }
`;

gql`
  mutation updateProductHistory($input: UpdateProductHistoryInput!) {
    updateProductHistory(input: $input) {
      ... on UpdateResult {
        affected
        generatedMaps
        raw
      }
    }
  }
`;

gql`
  query productHistories($options: ProductHistoryListOptions) {
    productHistories(options: $options) {
      items {
        id
        customerId
        productVariant {
          id
          name
          price
          priceWithTax
          product {
            id
            featuredAsset {
              id
              preview
            }
            translations {
              languageCode
              slug
            }
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`;

gql`
  query productHistory($input: ProductHistoryInput!) {
    productHistory(input: $input) {
      id
      customerId
      productVariant {
        id
        sku
        name
        product {
          id
          translations {
            languageCode
            slug
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`;

gql`
  mutation deleteProductHistory($input: ProductHistoryInput!) {
    deleteProductHistory(input: $input) {
      result
      message
    }
  }
`;
