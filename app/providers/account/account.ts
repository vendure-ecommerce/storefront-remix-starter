import gql from 'graphql-tag';
import {
  LoginMutation,
  LogoutMutation,
  RegisterCustomerAccountMutation,
  RegisterCustomerAccountMutationVariables,
  UpdateCustomerInput,
  VerifyCustomerAccountMutation,
} from '~/generated/graphql';
import { QueryOptions, sdk, WithHeaders } from '~/graphqlWrapper';

export const login = async (
  email: string,
  password: string,
  rememberMe: boolean,
  options: QueryOptions,
): Promise<WithHeaders<LoginMutation['login']>> => {
  return sdk.login({ email, password, rememberMe }, options).then((res) => ({
    ...res.login,
    _headers: res._headers,
  }));
};

export const logout = async (
  options: QueryOptions,
): Promise<WithHeaders<LogoutMutation['logout']>> => {
  return sdk.logout({}, options).then((res) => ({
    ...res.logout,
    _headers: res._headers,
  }));
};

export const registerCustomerAccount = async (
  options: QueryOptions,
  variables: RegisterCustomerAccountMutationVariables,
): Promise<
  WithHeaders<RegisterCustomerAccountMutation['registerCustomerAccount']>
> => {
  return sdk.registerCustomerAccount(variables, options).then((res) => ({
    ...res.registerCustomerAccount,
    _headers: res._headers,
  }));
};

export const verifyCustomerAccount = async (
  options: QueryOptions,
  token: string,
  password?: string,
): Promise<
  WithHeaders<VerifyCustomerAccountMutation['verifyCustomerAccount']>
> => {
  return sdk
    .verifyCustomerAccount({ token, password }, options)
    .then((res) => ({
      ...res.verifyCustomerAccount,
      _headers: res._headers,
    }));
};

export async function updateCustomer(
  input: UpdateCustomerInput,
  options: QueryOptions,
) {
  return sdk.updateCustomer({ input }, options);
}

export async function requestUpdateCustomerEmailAddress(
  password: string,
  newEmailAddress: string,
  options: QueryOptions,
) {
  return sdk
    .requestUpdateCustomerEmailAddress({ password, newEmailAddress }, options)
    .then((res) => res.requestUpdateCustomerEmailAddress);
}

export async function updateCustomerEmailAddress(
  token: string,
  options: QueryOptions,
) {
  return sdk
    .updateCustomerEmailAddress({ token }, options)
    .then((res) => res.updateCustomerEmailAddress);
}

gql`
  mutation login($email: String!, $password: String!, $rememberMe: Boolean) {
    login(username: $email, password: $password, rememberMe: $rememberMe) {
      __typename
      ... on CurrentUser {
        id
        identifier
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  mutation logout {
    logout {
      success
    }
  }
`;

gql`
  mutation registerCustomerAccount($input: RegisterCustomerInput!) {
    registerCustomerAccount(input: $input) {
      __typename
      ... on Success {
        success
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  mutation verifyCustomerAccount($token: String!, $password: String) {
    verifyCustomerAccount(token: $token, password: $password) {
      __typename
      ... on CurrentUser {
        id
        identifier
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  mutation updateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      __typename
    }
  }
`;

gql`
  mutation requestUpdateCustomerEmailAddress(
    $password: String!
    $newEmailAddress: String!
  ) {
    requestUpdateCustomerEmailAddress(
      password: $password
      newEmailAddress: $newEmailAddress
    ) {
      __typename
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  mutation updateCustomerEmailAddress($token: String!) {
    updateCustomerEmailAddress(token: $token) {
      __typename
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;
