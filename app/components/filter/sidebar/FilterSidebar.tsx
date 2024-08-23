import CategoryTreeView from '~/components/pages/category/CategoryTreeView';
import { ScrollArea } from '~/components/ui-custom/MyScrollArea';
import Filters from './Filters';
import Sidebar from '~/components/common/Sidebar';
import { FacetFilterTracker } from '~/components/facet-filter/facet-filter-tracker';
import { MutableRefObject } from 'react';

interface IFilterSidebarProps {
  collection: any;
  facetValuesTracker: MutableRefObject<FacetFilterTracker>;
}

const FilterSidebar = ({ collection, facetValuesTracker }: IFilterSidebarProps) => {
  return (
    <Sidebar>
      <ScrollArea className="h-full w-full overscroll-contain">
        <div className="flex flex-col gap-8 px-3 pb-9 pt-9">
          <h2 className="sr-only">Termékszűrő</h2>
          <CategoryTreeView
            items={collection.children}
          />
          <Filters
            collection={collection}
            facetValuesTracker={facetValuesTracker}
          />
        </div>
      </ScrollArea>
    </Sidebar>
  );
};

export default FilterSidebar;
