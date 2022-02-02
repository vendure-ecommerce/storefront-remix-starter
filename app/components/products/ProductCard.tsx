import { CurrencyCode, CollectionProductsQuery } from "../../generated/graphql";
import { memoize } from "lodash/fp";
import { Typography } from "@mui/material";
import { Link } from "remix";
import { Price } from "./Price";

export type ProductCardProps = CollectionProductsQuery["search"]["items"][number];
export function ProductCard({
  productAsset,
  productName,
  slug,
  priceWithTax,
  currencyCode,
}: ProductCardProps) {
  return (
    <Link className="flex flex-col" to={`/products/${slug}`}>
      <img
        className="rounded-xl flex-grow object-cover"
        alt=""
        src={productAsset?.preview}
      />
      <div className="h-2" />
      <Typography variant="body2" className="opacity-80">
        {productName}
      </Typography>
      <Typography className="font-bold tracking-tighter">
        <Price priceWithTax={priceWithTax} currencyCode={currencyCode} />
      </Typography>
    </Link>
  );
}
