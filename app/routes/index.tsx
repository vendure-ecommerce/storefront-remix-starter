import React from "react";
import { useLoaderData } from "@remix-run/react";
import { Collection } from "../components/collections/Collection";
import { Header } from "../components/header/Header";
import { getCollectionsHome } from "../providers/collections/collections";
import { getCollectionProducts } from "../providers/products/products";

export type CollectionWithProducts = Awaited<
  ReturnType<typeof loader>
>["collections"][number];
export async function loader({ request }: any) {
  const collections = await Promise.all(
    (
      await getCollectionsHome(request)
    )
      .sort((a, b) => {
        // 11 is the "Featured" collection
        if (a.id === "11") return -1;
        if (b.id === "11") return 1;
        return 0;
      })
      .map(async (c) => ({
        ...c,
        products: (await getCollectionProducts(c.id)).search.items,
      }))
  );
  return {
    collections,
  };
}

type LoaderData = Awaited<ReturnType<typeof loader>>;

export default function Index() {
  const { collections } = useLoaderData<LoaderData>();
  return collections.map((collection) => (
    <Collection collection={collection} />
  ));
}
