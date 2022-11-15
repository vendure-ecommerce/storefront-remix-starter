import gql from 'graphql-tag';
import { UpdateCustomerInput } from '~/generated/graphql';
import { QueryOptions, sdk } from '~/graphqlWrapper';
import { listedProductFragment } from '../products/products';

export function getActiveCustomer(options: QueryOptions) {
    return sdk.activeCustomer(undefined, options);
}

export function getActiveCustomerAddresses(options: QueryOptions) {
    return sdk.activeCustomerAddresses(undefined, options);
}

export function updateCustomer(input: UpdateCustomerInput, options: QueryOptions){
    return sdk.updateCustomer({input}, options);
}


gql`
    query activeCustomer {
        activeCustomer {
            id
            firstName
            lastName
            user{
                verified
            }
        }
    }
`;

gql`
    mutation updateCustomer ($input: UpdateCustomerInput!) {
        updateCustomer (input: $input){
            ... on Customer {
                lastName
                firstName
            }
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
                defaultShippingAddress
                defaultBillingAddress
            }
        }
    }
`;
