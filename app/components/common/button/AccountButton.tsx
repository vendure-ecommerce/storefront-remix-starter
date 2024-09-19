

import LoginForm from "~/components/form/SignUpForm";
import { Button } from "~/components/ui-custom/MyButton";
import { ScrollArea } from "~/components/ui-custom/MyScrollArea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui-custom/MySheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ChevronDown, User } from "lucide-react";
import ListGroup from "../list/ListGroup";
import ListGroupItem from "../list/ListGroupItem";

const AccountButton = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className='flex items-center gap-2' variant={"ghost"}>
            <User className='h-4 w-4' />
            Fiókom
            <ChevronDown className='h-4 w-4' />
          </Button>
        </SheetTrigger>
        <SheetContent className='overflow-hidden' side={"right"}>
          <ScrollArea className='h-full w-full'>
            <SheetHeader className='sticky top-0 z-10 bg-white px-4 py-4'>
              <SheetTitle className='flex items-center gap-2'>
                Fiókom
              </SheetTitle>
            </SheetHeader>
            <div className='flex flex-col gap-8 px-4 pb-4 pt-8'>
              {/* <ListGroup className='-ml-6 -mr-4'>
                {accountMenuOptions
                  .flatMap((option) => (option.active ? option.active : []))
                  .map((option, index) => (
                    <ListGroupItem
                      key={index}
                      className='px-3'
                      title={option.title}
                      link={option.link}
                      imageSrc={option.imageSrc}
                      imageClassName='h-6 w-6'
                      badge={option.notification}
                      showBadge={option.notification > 0}
                    />
                  ))}
              </ListGroup> */}
              <div className='rounded-lg bg-primary/5 p-4'>
                <LoginForm />
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <div className='hidden'>
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
              <a href='/account/dashboard'>Vezérlőpult</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href='/account/settings'>Személyes adatok</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href='/account/orders'>Rendelések</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href='/account/favorites'>Kedvencek</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href='/account/addresses/shipping'>Szállítás</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href='/account/addresses/billing'>Számlázás</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href='/account/subscriptions'>Feliratkozások</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default AccountButton;
