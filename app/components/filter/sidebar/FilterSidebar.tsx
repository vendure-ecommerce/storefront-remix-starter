

import CategoryTreeView from "~/components/pages/category/CategoryTreeView";
import { ScrollArea } from "~/components/ui-custom/MyScrollArea";
import Filters from "./Filters";
import Sidebar from "~/components/common/Sidebar";

const FilterSidebar = () => {
  return (
    <Sidebar>
      <ScrollArea className='h-full w-full overscroll-contain'>
        <div className='flex flex-col gap-8 px-3 pb-9 pt-9'>
          <h2 className='sr-only'>Termékszűrő</h2>
          <CategoryTreeView />
          <Filters />
        </div>
      </ScrollArea>
    </Sidebar>
  );
};

export default FilterSidebar;
