import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataFunctionArgs, redirect } from "@remix-run/server-runtime";
import { useState } from "react";
import { Form, useLoaderData } from "remix";
import { Price } from "../../components/products/Price";
import { addItemToOrder } from "../../providers/orders/order";
import { getProductBySlug } from "../../providers/products/products";

export type Product = Awaited<ReturnType<typeof loader>>;

export async function loader({ params }: DataFunctionArgs) {
  const productRes = await getProductBySlug(params.slug!);
  if (!productRes.product) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return productRes.product!;
}

export async function action({ request, params }: DataFunctionArgs) {
  const body = await request.formData();
  const variantId = body.get("variantId")?.toString();
  const quantity = Number(body.get("quantity")?.toString());
  if (!variantId || !(quantity > 0)) {
    return { errors: ["Oops, invalid input"] };
  }
  const res = await addItemToOrder(variantId, quantity);
  return redirect(`/products/${params.slug}`, { headers: res._headers });
}

export default function ProductSlug() {
  const product = useLoaderData<Product>();
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0].id
  );
  const selectedVariant = product.variants.find(
    (v) => v.id === selectedVariantId
  )!;

  const asset = product.assets[0];
  const brandName = product.facetValues.find(
    (fv) => fv.facet.code === "brand"
  )?.name;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {asset ? (
          <img src={asset.source} alt="" />
        ) : (
          <span>No Image Available</span>
        )}
        <section className="bg-gray-100 p-8">
          <div className="h-8" />
          {brandName && (
            <Typography variant="body2" className="opacity-50 mb-2">
              {brandName}
            </Typography>
          )}
          <Typography variant="h3">{product.name}</Typography>
          <Form method="post">
            <FormControl fullWidth className="my-4">
              <InputLabel id="productVariantLabel">Variant</InputLabel>
              <Select
                labelId="productVariantLabel"
                id="productVariant"
                value={selectedVariantId}
                name="variantId"
                label="Variant"
                onChange={(e) => setSelectedVariantId(e.target.value)}
              >
                {product.variants.map((v) => (
                  <MenuItem key={v.id} value={v.id}>
                    {v.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div className="grid grid-cols-2">
              <div>
                <Typography variant="body2" className="opacity-30 text-xs">
                  {selectedVariant.sku}
                </Typography>
                <Typography className="font-bold">
                  <Price
                    priceWithTax={selectedVariant.priceWithTax}
                    currencyCode={selectedVariant.currencyCode}
                  />
                </Typography>
              </div>
              <div className="flex gap-2">
                <TextField
                  type="number"
                  name="quantity"
                  defaultValue={1}
                  className="w-28"
                  size="small"
                />
                <Button
                  color="primary"
                  variant="contained"
                  className="whitespace-nowrap"
                  type="submit"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </Form>

          <div className="h-4" />

          <Typography>{product.description}</Typography>
        </section>
      </div>
    </div>
  );
}
