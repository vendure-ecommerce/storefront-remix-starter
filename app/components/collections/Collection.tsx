import { Button, Typography } from "@mui/material";
import { Link } from "remix";
import { CollectionWithProducts } from "../../routes";
import { ProductCard } from "../products/ProductCard";

export function Collection({
  collection,
}: {
  collection: CollectionWithProducts;
}) {
  return (
    <>
      <div className="flex w-full justify-between items-center">
        <Typography variant="h4" className="text-secondary my-8">
          <Link to={`/collections/${collection.slug}`}>{collection.name}</Link>
        </Typography>
        <Button
          component={Link}
          to={`/collections/${collection.slug}`}
          variant="outlined"
          color="secondary"
          className="text-sm"
        >
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
    </>
  );
}
