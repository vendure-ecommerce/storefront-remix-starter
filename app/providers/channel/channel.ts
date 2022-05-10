import gql from 'graphql-tag';
import { QueryOptions, sdk } from '~/graphqlWrapper';

export function activeChannel(options: QueryOptions) {
  return sdk.activeChannel(undefined, options).then(({ activeChannel }) => activeChannel);
}

gql`
  query activeChannel {
    activeChannel {
      id
      currencyCode
    }
  }
`;
