import { Button, Typography } from "@mui/material";
import React from "react";
import { LoaderFunction, useLoaderData } from "remix";
import { getCollections } from "../collections/collections";
import { Header } from "../components/header/Header";
import { ProductCard } from "../components/products/ProductCard";
import { getCollectionProducts } from "../products/products";

export async function loader() {
  const collections = await Promise.all(
    (
      await getCollections()
    )
    .sort((a, b) => {
      // 11 is the "Featured" collection
      if (a.id === '11') return -1;
      if (b.id === '11') return 1;
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
  return (
    <>
      <Header />
      <main className="max-w-5xl p-4 m-auto">
        {collections.map((collection) => (
          <React.Fragment key={collection.id}>
            <div className="flex w-full justify-between items-center">
              <Typography variant="h4" className="text-secondary my-8">
                {collection.name}
              </Typography>
              <Button variant="outlined" color="secondary" className="text-sm">
                Show All
              </Button>
            </div>
            <div
              className="grid grid-c gap-6"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
              }}
            >
              {collection.products.map((product) => (
                <ProductCard key={product.productId} {...product} />
              ))}
            </div>
          </React.Fragment>
        ))}
      </main>
    </>
  );
}
