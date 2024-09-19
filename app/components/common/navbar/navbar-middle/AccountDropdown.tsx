

import { Button } from "~/components/ui-custom/MyButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ChevronDown, User } from "lucide-react";
import Link from "next/link";

const AccountDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='flex items-center gap-2' variant={"ghost"}>
          <User className='h-4 w-4' />
          Fiókom
          <ChevronDown className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-full'>
        <DropdownMenuLabel>Fiókom</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href='/account/dashboard'>Vezérlőpult</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href='/account/settings'>Személyes adatok</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href='/account/orders'>Rendelések</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href='/account/favorites'>Kedvencek</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href='/account/addresses/shipping'>Szállítás</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href='/account/addresses/billing'>Számlázás</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href='/account/subscriptions'>Feliratkozások</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
