import { DataFunctionArgs, LoaderFunctionArgs } from "@remix-run/server-runtime";
import { search } from "~/providers/search/search";

const filteredSearchLoader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const term = url.searchParams.get('q');

  let resultPromises: [ReturnType<typeof search>];
  const searchResultPromise = search(
    {
      input: {
        groupByProduct: true,
        term,
        take: 25,
        skip: 0,
      },
    },
    { request },
  );
  resultPromises = [searchResultPromise];

  const [result] = await Promise.all(
    resultPromises,
  );
  return {
    term,
    result: result.search,
  };
};

export const loader = async ({ params, request, context }: DataFunctionArgs) => {
  const {
    result,
    term,
  } = await filteredSearchLoader({
    params,
    request,
    context,
  });

  return {
    term,
    result,
  };
};