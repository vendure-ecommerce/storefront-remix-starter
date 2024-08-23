import { DataFunctionArgs } from '@remix-run/server-runtime';
import { getCollectionMenuData } from '~/providers/collections/menu/menu';

export const loader = async ({
  params,
  request,
  context,
}: DataFunctionArgs) => {
  let resultPromise: [ReturnType<typeof getCollectionMenuData>];
  const menuPromiseRes = getCollectionMenuData();
  resultPromise = [menuPromiseRes];

  const [result] = await Promise.all(resultPromise);
  return {
    result: result.collections,
  };
};
