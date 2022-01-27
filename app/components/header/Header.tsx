import { Button, IconButton } from "@mui/material";
import { Menu, ShoppingCart } from "@mui/icons-material";
import { Logo } from "../Logo";

export function Header() {
  return (
    <header className="bg-gray-200 flex-center">
      <div className="max-w-5xl flex-grow grid grid-cols-3 items-center p-4">
        <div>
          <IconButton className="bg-white">
            <Menu />
          </IconButton>
        </div>
        <Logo className="justify-self-center" />
        <div className="justify-self-end">
          <Button color="inherit" className="bg-white">
            <ShoppingCart />
            $25.00
          </Button>
        </div>
      </div>
    </header>
  );
}
