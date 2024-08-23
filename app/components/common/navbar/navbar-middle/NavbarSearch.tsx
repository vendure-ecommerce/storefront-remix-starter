import AutoSuggestion from "~/components/autosuggestion/AutoSuggestion";
import { Button } from "~/components/ui-custom/MyButton";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "~/components/ui-custom/MySearchDialog";
import { Search } from "lucide-react";
import NavbarSearchField from "./NavbarSearchField";
import { useFetcher, useLocation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { typingDelay } from "~/constants";


const NavbarSearch: React.FC = () => {
  const location = useLocation();
  const fetcher = useFetcher<{ result: { items: any[], totalItems: number } }>();

  const [stOpen, setOpen] = useState(false);
  const [stTerm, setTerm] = useState('');

  const rfInputTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setTerm(newTerm);
  };

  useEffect(() => {
    if (rfInputTimer.current) {
      clearTimeout(rfInputTimer.current);
    }
    rfInputTimer.current = setTimeout(() => {
      if (stTerm) {
        fetcher.submit({ q: stTerm }, { action: "/api/search", method: "get" });
      }  
    }, typingDelay);
    return () => {
      if (rfInputTimer.current) {
        clearTimeout(rfInputTimer.current);
      }
    };
  }, [stTerm]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <Dialog
      open={stOpen}
      >
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Button
          className='h-[3.25rem] w-full justify-start gap-4 hover:scale-100'
          variant={"outline"}
        >
          <Search className='h-6 w-6' />
          <span className='text-color-tertiary'>{stTerm || 'Keresés'}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='h-10/12 overflow-hidden pt-20 xl:pt-10' onEscapeKeyDown={() => setOpen(false)}>
        <div className='mx-auto grid max-w-screen-2xl grid-rows-[auto,_1fr] gap-8'>
          <NavbarSearchField value={stTerm} onChange={onInputChange} />
          <AutoSuggestion
            items={fetcher.data?.result?.items || []}
            totalItems={fetcher.data?.result?.totalItems || 0}
            onItemClick={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NavbarSearch;
