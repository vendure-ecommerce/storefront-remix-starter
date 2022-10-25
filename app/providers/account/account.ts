import gql from 'graphql-tag';
import {
    LoginMutation,
    LogoutMutation,
    RegisterCustomerAccountMutation,
    RegisterCustomerAccountMutationVariables,
    VerifyCustomerAccountMutation,
} from '~/generated/graphql';
import { QueryOptions, sdk } from '~/graphqlWrapper';

export const login = async (
    email: string,
    password: string,
    rememberMe: boolean,
    options: QueryOptions,
): Promise<LoginMutation['login']> => {
    return sdk
        .login({ email, password, rememberMe }, options)
        .then(({ login }) => login);
};

export const logout = async(
    options: QueryOptions,
): Promise<LogoutMutation['logout']> => {
    return sdk.logout({}, options).then(({ logout }) => logout);
}

export const registerCustomerAccount = async (
    options: QueryOptions,
    variables: RegisterCustomerAccountMutationVariables,
): Promise<RegisterCustomerAccountMutation['registerCustomerAccount']> => {
    return sdk
        .registerCustomerAccount(variables, options)
        .then(({ registerCustomerAccount }) => registerCustomerAccount);
};

export const verifyCustomerAccount = async (
    options: QueryOptions,
    token: string,
    password?: string,
): Promise<VerifyCustomerAccountMutation['verifyCustomerAccount']> => {
    return sdk
        .verifyCustomerAccount({ token, password }, options)
        .then(({ verifyCustomerAccount }) => verifyCustomerAccount);
};

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
