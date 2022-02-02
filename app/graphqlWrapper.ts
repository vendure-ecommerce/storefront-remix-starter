import { DocumentNode, print } from "graphql";
import { getSdk } from "./generated/graphql";

export interface GraphqlResponse<Response> {
  errors: any[];
  data: Response;
}

// const agent = request.agent(app);
function sendQuery<Response, Variables = {}>(
  options: { query: string; variables?: Variables, headers?: Headers }
  // token?: string
): Promise<GraphqlResponse<Response> & { headers: Headers }> {
  // const req = agent.post("/graphql").set("Accept", "application/json");

  // if (token) {
  //   req.set("Authorization", `Bearer ${token}`);
  // }

  const headers = new Headers(options.headers);
  headers.append("Content-Type", "application/json");

  return fetch("http://localhost:3001/shop-api", {
    method: "POST",
    body: JSON.stringify(options),
    credentials: "include",
    headers,
  }).then(async (res) => ({
    ...(await res.json()),
    headers: res.headers,
  }));
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

export const sdk: SdkWithHeaders = getSdk(requester) as any;

type Sdk = ReturnType<typeof getSdk>;
type SdkWithHeaders = {
  [k in keyof Sdk]: (
    ...args: Parameters<Sdk[k]>
  ) => Promise<Awaited<ReturnType<Sdk[k]>> & { _headers: Headers }>;
};

type X = ReturnType<SdkWithHeaders['collection']>;

function requester<R, V>(
  doc: DocumentNode,
  vars?: V,
  options?: { headers?: Headers }
): Promise<R & { _headers: Headers }> {
  return sendQuery<R, V>(
    { query: print(doc), variables: vars, ...options },
  ).then((response) => {
    if (response.errors) {
      console.log(
        response.errors[0].extensions.exception.stacktrace.join("\n")
      );
      throw new Error(response.errors[0].message);
    }
    return { ...response.data, _headers: response.headers };
  });
}
