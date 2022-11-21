import gql from 'graphql-tag';
import { QueryOptions, sdk } from '../../graphqlWrapper';
import { PaymentInput } from '~/generated/graphql';

export function getAvailableCountries(options: QueryOptions) {
  return sdk.availableCountries({}, options);
}

export function getEligibleShippingMethods(options: QueryOptions) {
  return sdk.eligibleShippingMethods({}, options);
}

export function getEligiblePaymentMethods(options: QueryOptions) {
  return sdk.eligiblePaymentMethods({}, options);
}

export function generateBraintreeClientToken(options: QueryOptions) {
  return sdk.generateBraintreeClientToken({}, options);
}

export function createStripePaymentIntent(options: QueryOptions) {
  return sdk.createStripePaymentIntent({}, options);
}

export function getNextOrderStates(options: QueryOptions) {
  return sdk.nextOrderStates({}, options);
}

export function addPaymentToOrder(input: PaymentInput, options: QueryOptions) {
  return sdk.addPaymentToOrder({ input }, options);
}

export function transitionOrderToState(state: string, options: QueryOptions) {
  return sdk.transitionOrderToState({ state }, options);
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
  query eligiblePaymentMethods {
    eligiblePaymentMethods {
      id
      code
      name
      description
      eligibilityMessage
      isEligible
    }
  }
`;

gql`
  query nextOrderStates {
    nextOrderStates
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

gql`
  mutation addPaymentToOrder($input: PaymentInput!) {
    addPaymentToOrder(input: $input) {
      ...OrderDetail
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  mutation transitionOrderToState($state: String!) {
    transitionOrderToState(state: $state) {
      ...OrderDetail
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  mutation createStripePaymentIntent {
    createStripePaymentIntent
  }
`;

gql`
  query generateBraintreeClientToken {
    generateBraintreeClientToken
  }
`;
