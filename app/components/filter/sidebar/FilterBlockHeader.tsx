

import { Badge } from "~/components/ui-custom/MyBadge";
import { ChevronDown, Filter } from "lucide-react";

interface FilterBlockHeaderProps {
  showFilterIcon?: boolean;
  showBadge?: boolean;
  badgeText?: string;
  showChevron?: boolean;
  title: string;
}

const FilterBlockHeader: React.FC<FilterBlockHeaderProps> = ({
  showFilterIcon = true,
  showBadge = true,
  badgeText = "",
  showChevron = true,
  title,
}) => {
  return (
    <div
      className={`flex h-14 flex-grow justify-between gap-4 group-[[data-state="open"]]/collapse:bg-primary/5 ${showChevron ? "mx-0 rounded-md px-3 transition hover:bg-primary/5" : "px-3"}`}
    >
      <div className='flex flex-1 items-center gap-4'>
        {showFilterIcon && <Filter className='h-4 w-4' />}
        <h3 className='line-clamp-1 text-left text-sm font-semibold'>
          {title}
        </h3>
      </div>
      <div className='flex flex-none items-center gap-4'>
        {showBadge && <Badge variant={"outline"}>{badgeText}</Badge>}
        {showChevron && (
          <ChevronDown className='h-4 w-4 group-[[data-state="open"]]/collapse:rotate-180' />
        )}
      </div>
    </div>
  );
};

export default FilterBlockHeader;
