import gql from "graphql-tag";
import { sdk } from "~/graphqlWrapper";
import { listedProductFragment } from "../products/products";

export function getActiveCustomer(request: Request) {
    return sdk.activeCustomer(undefined, {request});
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
