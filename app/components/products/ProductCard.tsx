import { CurrencyCode, FeaturedProductsQuery } from "../../generated/graphql";
import { memoize } from "lodash/fp";
import { Typography } from "@mui/material";

export type ProductCardProps = FeaturedProductsQuery["search"]["items"][number];
export function ProductCard({
  productAsset,
  productName,
  priceWithTax,
  currencyCode,
}: ProductCardProps) {
  return (
    <div className="flex flex-col">
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
    </div>
  );
}

function Price({
  priceWithTax,
  currencyCode,
}: {
  priceWithTax: ProductCardProps["priceWithTax"];
  currencyCode: ProductCardProps["currencyCode"];
}) {
  if ("value" in priceWithTax) {
    return <>{formatPrice(priceWithTax.value, currencyCode)}</>;
  }
  if (priceWithTax.min === priceWithTax.max) {
    return <>{formatPrice(priceWithTax.min, currencyCode)}</>;
  }
  return (
    <>
      {formatPrice(priceWithTax.min, currencyCode)} -{" "}
      {formatPrice(priceWithTax.max, currencyCode)}
    </>
  );
}

const currencyFormatter = memoize(
  (currency: CurrencyCode) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency })
);
function formatPrice(value: number, currency: CurrencyCode) {
  return currencyFormatter(currency).format(value / 100);
}
