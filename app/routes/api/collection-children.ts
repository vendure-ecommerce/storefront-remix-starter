import { DataFunctionArgs, json } from '@remix-run/server-runtime';
import { getCollectionChildren } from '~/providers/collections/children/children';
import { getCollectionMenuData } from '~/providers/collections/menu/menu';

export const loader = async ({
  params,
  request,
  context,
}: DataFunctionArgs) => {
  const url = new URL(request.url);
  const collectionId = url.searchParams.get('id');
  if (!collectionId) {
    return json({});
  }

  let resultPromise: [ReturnType<typeof getCollectionMenuData>];

  const promises = getCollectionChildren(collectionId);

  resultPromise = [promises];

  const [result] = await Promise.all(resultPromise);
  return {
    result: result.collections,
  };
};
