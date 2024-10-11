

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

const BreadcrumbDropdownItem = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className='flex h-9 items-center gap-2 rounded-full pl-1 pr-2 py-1.5'
            variant={"outline"}
          >
            <Avatar className='h-6 w-6'>
              <AvatarImage src='https://github.com/shadcn.png' alt='Kép' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            Link
            <ChevronDown className='h-4 w-4'></ChevronDown>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default BreadcrumbDropdownItem;
