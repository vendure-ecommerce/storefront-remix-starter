

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ListingOrderProps {}
const ListingOrder: React.FC<ListingOrderProps> = ({}) => {
  return (
    <Select>
      <SelectTrigger className='w-auto min-w-[220px] rounded-full'>
        <SelectValue placeholder='Alapértelmezett' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='default'>Alapértelmezett</SelectItem>
        <SelectItem value='price-from-expensive'>Drágák elöl</SelectItem>
        <SelectItem value='price-from-cheap'>Olcsók elöl</SelectItem>
        <SelectItem value='name-a-z'>Név szerint A - Z</SelectItem>
        <SelectItem value='name-z-a'>Név szerint Z - A</SelectItem>
        <SelectItem value='most-special'>Legnagyobb kedvezmény</SelectItem>
        <SelectItem value='best-rating'>Legjobbra értékelt</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ListingOrder;
