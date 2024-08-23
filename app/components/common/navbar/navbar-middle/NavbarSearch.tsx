import { useFetcher } from '@remix-run/react';
import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import AutoSuggestion from '~/components/autosuggestion/AutoSuggestion';
import { Button } from '~/components/ui-custom/MyButton';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '~/components/ui-custom/MySearchDialog';
import { typingDelay } from '~/constants';
import NavbarSearchField from './NavbarSearchField';

const NavbarSearch: React.FC = () => {
  const fetcher = useFetcher<{
    result: { items: any[]; totalItems: number };
  }>();

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
        fetcher.submit({ q: stTerm }, { action: '/api/search', method: 'get' });
      }
    }, typingDelay);
    return () => {
      if (rfInputTimer.current) {
        clearTimeout(rfInputTimer.current);
      }
    };
  }, [stTerm]);

  console.log(fetcher.data);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="h-[3.25rem] w-full justify-start gap-4 hover:scale-100"
          variant={'outline'}
        >
          <Search className="h-6 w-6" />
          <span className="text-color-tertiary">Keresés</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-10/12 overflow-hidden pt-20 xl:pt-10">
        <div className="mx-auto grid max-w-screen-2xl grid-rows-[auto,_1fr] gap-8">
          <NavbarSearchField onChange={onInputChange} />
          <AutoSuggestion
            items={fetcher.data?.result?.items || []}
            totalItems={fetcher.data?.result?.totalItems || 0}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NavbarSearch;
