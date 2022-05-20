import gql from 'graphql-tag';
import { QueryOptions, sdk } from '../../graphqlWrapper';

export function getAvailableCountries(options: QueryOptions) {
    return sdk.availableCountries({}, options);
}

export function getEligibleShippingMethods(options: QueryOptions) {
    return sdk.eligibleShippingMethods({}, options);
}

gql`
    query eligibleShippingMethods {
        eligibleShippingMethods {
            id
            name
            description
            metadata
            price
            priceWithTax
        }
    }
`;

gql`
    query availableCountries {
        availableCountries {
            id
            name
            code
        }
    }
`;
