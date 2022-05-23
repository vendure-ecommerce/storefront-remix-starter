import gql from 'graphql-tag';
import { QueryOptions, sdk } from '~/graphqlWrapper';

export function login(
    email: string,
    password: string,
    rememberMe: boolean,
    options: QueryOptions,
) {
    return sdk.login({ email, password, rememberMe }, options);
}

export function logout(options: QueryOptions) {
    return sdk.logout({}, options);
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
