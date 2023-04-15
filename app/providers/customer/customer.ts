import gql from 'graphql-tag';
import { QueryOptions, sdk } from '~/graphqlWrapper';
// import { OrderListOptions, CustomerOrdersArgs } from '~/generated/graphql';

export function getActiveCustomer(options: QueryOptions) {
  return sdk.activeCustomer(undefined, options);
}

export function getActiveCustomerDetails(options: QueryOptions) {
  return sdk.activeCustomerDetails(undefined, options);
}

export function getActiveCustomerAddresses(options: QueryOptions) {
  return sdk.activeCustomerAddresses(undefined, options);
}

export function getActiveCustomerOrderList(options: QueryOptions) {
  return sdk.activeCustomerOrderList(undefined, options);
}

gql`
  query activeCustomer {
    activeCustomer {
      id
      firstName
      lastName
    }
  }
`;

gql`
  query activeCustomerDetails {
    activeCustomer {
      id
      title
      firstName
      lastName
      phoneNumber
      emailAddress
    }
  }
`;

gql`
  query activeCustomerAddresses {
    activeCustomer {
      id
      addresses {
        id
        company
        fullName
        streetLine1
        streetLine2
        city
        province
        postalCode
        country {
          id
          code
          name
        }
        phoneNumber
        defaultShippingAddress
      }
    }
  }
`;

gql`
  query activeCustomerOrderList {
    activeCustomer {
      orders {
        totalItems
        items {
          code
          state
          orderPlacedAt
          currencyCode
          totalWithTax
          shippingWithTax
          lines {
            quantity
            discountedLinePriceWithTax
            featuredAsset {
              name
              source
              preview
            }
            productVariant {
              name
              sku
              currencyCode
              priceWithTax
            }
          }
        }
      }
    }
  }
`;
