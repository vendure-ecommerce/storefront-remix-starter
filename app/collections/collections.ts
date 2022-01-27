import gql from "graphql-tag";
import { sdk } from "../graphqlWrapper";

export function getCollections() {
  return sdk.collections().then((result) => result.collections.items);
}

gql`
  query collections {
    collections {
      items {
        id
        name
      }
    }
  }
`;
