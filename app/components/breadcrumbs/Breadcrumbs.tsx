import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import React from "react";
import BreadcrumbItem from "./BreadcrumbsItem";
import BreadcrumbItemSeparator from "./BreadcrumbsItemSeparator";

interface BreadcrumbProps {
  className?: string;
  items: {
    id: string;
    name: string;
    slug: string;
  }[];
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ className, items }) => {

  return (
    <div className={`${className ? `${className}` : ""}`}>
      <ScrollArea className='w-full whitespace-nowrap'>
        <div className='flex flex-nowrap items-center gap-2 pb-4'>
          {items.map((option, index: number) => (
            <React.Fragment key={index}>
              <div className='flex items-center gap-2'>
                <BreadcrumbItem
                  title={option.name}
                  // imageSrc={option.imageSrc}
                  link={option.slug}
                />
                {index < items.length - 1 && (
                  <BreadcrumbItemSeparator />
                )}
              </div>
            </React.Fragment>
          ))}
          {/* <BreadcrumbDropdownItem /> */}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  );
};

export default Breadcrumbs;
