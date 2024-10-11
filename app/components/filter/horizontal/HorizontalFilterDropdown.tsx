

import CheckboxGroup from "~/components/common/checkbox/CheckboxGroup";
import CheckboxGroupItem from "~/components/common/checkbox/CheckboxGroupItem";
import { Button } from "~/components/ui-custom/MyButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ChevronDown } from "lucide-react";
import FilterBlock from "../sidebar/FilterBlock";
import FilterBlockContent from "../sidebar/FilterBlockContent";

const HorizontalFilterDropdown = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='flex items-center gap-2' variant={"outline"}>
          Tulajdonság
          <ChevronDown className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <FilterBlock>
          <FilterBlockContent className='p-0'>
            <CheckboxGroup>
              <CheckboxGroupItem
                key={1}
                label={"Szöveg"}
                showLabel={true}
                id={"1"}
                imageSrc='/path/to/image.jpg'
                showImage={true}
              />
            </CheckboxGroup>
          </FilterBlockContent>
        </FilterBlock>
      </PopoverContent>
    </Popover>
  );
};

export default HorizontalFilterDropdown;
