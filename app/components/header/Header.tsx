import { Button, IconButton } from "@mui/material";
import { Menu, ShoppingCart } from "@mui/icons-material";
import { Logo } from "../Logo";
import { Link, useLoaderData } from "remix";
import { DataFunctionArgs } from "@remix-run/server-runtime";
import { Price } from "../products/Price";

export function Header() {
  const data = useLoaderData();
  const order = data?.activeOrder?.activeOrder;
  const total = order?.subTotalWithTax ?? 0;
  const currency = order?.currencyCode ?? "USD";
  return (
    <header className="bg-gray-200 flex-center">
      <div className="max-w-5xl flex-grow grid grid-cols-3 items-center p-4">
        <div>
          <IconButton className="bg-white">
            <Menu />
          </IconButton>
        </div>
        <Link className="justify-self-center" to="/">
          <Logo />
        </Link>
        <div className="justify-self-end">
          <Button color="inherit" className="bg-white">
            <ShoppingCart />
            <Price currencyCode={currency} priceWithTax={total} />
          </Button>
        </div>
      </div>
    </header>
  );
}
