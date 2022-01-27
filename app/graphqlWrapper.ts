import { DocumentNode, print } from "graphql";
import { getSdk } from "./generated/graphql";

export interface GraphqlResponse<Response> {
  errors: any[];
  data: Response;
}

// const agent = request.agent(app);
function sendQuery<Response, Variables = {}>(
  options: { query: string; variables?: Variables }
  // token?: string
): Promise<GraphqlResponse<Response>> {
  // const req = agent.post("/graphql").set("Accept", "application/json");

  // if (token) {
  //   req.set("Authorization", `Bearer ${token}`);
  // }

  return fetch("http://localhost:3001/shop-api", {
    method: "POST",
    body: JSON.stringify(options),
    headers: {
      // "Accept-Language": locale,
      "Content-Type": "application/json",
  },
  })
  // .then(async res => {
  //   console.log('ttt', await res.text());
  //   return res;
  // })

  .then((res) => res.json());
  // .then((res) => {
  //   if (res.error) {
  //     if (res.text) throw new Error(res.text);
  //     throw res.error;
  //   }
  //   return res.body;
  // })
  // .catch((e) => {
  //   throw e;
  // });
}


export const sdk = getSdk(requester);

function requester<R, V>(
  doc: DocumentNode,
  vars?: V,
  // options?: { token?: string }
): Promise<R> {
  return sendQuery<R, V>(
    { query: print(doc), variables: vars },
    // options?.token
  ).then((response) => {
    if (response.errors) {
      console.log(
        response.errors[0].extensions.exception.stacktrace.join("\n")
      );
      throw new Error(response.errors[0].message);
    }
    return response.data;
  });
}
