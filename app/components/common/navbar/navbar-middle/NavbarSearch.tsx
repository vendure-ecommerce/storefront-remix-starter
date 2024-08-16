

import AutoSuggestion from "~/components/autosuggestion/AutoSuggestion";
import { Button } from "~/components/ui-custom/MyButton";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "~/components/ui-custom/MySearchDialog";
import { Search } from "lucide-react";
import NavbarSearchField from "./NavbarSearchField";

const NavbarSearch: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className='h-[3.25rem] w-full justify-start gap-4 hover:scale-100'
          variant={"outline"}
        >
          <Search className='h-6 w-6' />
          <span className='text-color-tertiary'>Keresés</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='h-10/12 overflow-hidden pt-20 xl:pt-10'>
        <div className='mx-auto grid max-w-screen-2xl grid-rows-[auto,_1fr] gap-8'>
          <NavbarSearchField />
          <AutoSuggestion />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NavbarSearch;
