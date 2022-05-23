import gql from 'graphql-tag';
import { QueryOptions, sdk } from '~/graphqlWrapper';
import { listedProductFragment } from '../products/products';

export function getActiveCustomer(options: QueryOptions) {
    return sdk.activeCustomer(undefined, options);
}

export function getActiveCustomerAddresses(options: QueryOptions) {
    return sdk.activeCustomerAddresses(undefined, options);
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
