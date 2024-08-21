import { Input } from '~/components/ui-custom/MyInput';
import { Label } from '~/components/ui/label';
import { Search } from 'lucide-react';

interface INavbarSearchFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NavbarSearchField: React.FC<INavbarSearchFieldProps> = ({ onChange }) => {
  return (
    <search className="sticky top-0 mx-auto w-full ">
      {' '}
      {/* xl:w-[calc(100%_-_49rem)] '> */}
      <Label className="sr-only" htmlFor="main-serach">
        Keresés
      </Label>
      <div className="relative flex-grow">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-6 w-6" />
        </div>
        <Input
          className="h-[3.25rem] rounded-full pl-[3rem]"
          id="main-serach"
          type="text"
          placeholder="Termékek keresése"
          name="Termékek keresése"
          onChange={onChange}
        />
      </div>
    </search>
  );
};

export default NavbarSearchField;
