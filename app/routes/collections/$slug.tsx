import { DataFunctionArgs } from "@remix-run/server-runtime";
import { LoaderFunction, useLoaderData } from "remix";
import { Collection } from "../../components/collections/Collection";
import { sdk } from "../../graphqlWrapper";

export type CollectionWithProducts = Awaited<ReturnType<typeof loader>>;

export async function loader({ params }: DataFunctionArgs) {
  const productsPromise = sdk.collectionProducts({
    collectionSlug: params.slug,
    take: 999,
  });
  const collection = (await sdk.collection({ slug: params.slug })).collection;
  if (!collection?.id || !collection?.name) throw "Collection not found";
  const products = (await productsPromise).search.items;

  return {
    ...collection,
    products,
  };
}

export default function CollectionSlug() {
  const collection = useLoaderData<CollectionWithProducts>();
  return <Collection collection={collection} />;
}
