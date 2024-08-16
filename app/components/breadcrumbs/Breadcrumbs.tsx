import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import React from "react";
import BreadcrumbItem from "./BreadcrumbsItem";
import BreadcrumbItemSeparator from "./BreadcrumbsItemSeparator";

interface BreadcrumbProps {
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ className }) => {
  const dummy = {
    breadcrumbOptions: [] as any[],
  };
  const breadcrumbOptions = dummy.breadcrumbOptions;

  return (
    <div className={`${className ? `${className}` : ""}`}>
      <ScrollArea className='w-full whitespace-nowrap'>
        <div className='flex flex-nowrap items-center gap-2 pb-4'>
          {breadcrumbOptions.map((option, index) => (
            <React.Fragment key={index}>
              <div className='flex items-center gap-2'>
                <BreadcrumbItem
                  title={option.title}
                  imageSrc={option.imageSrc}
                  link={option.link}
                />
                {index < breadcrumbOptions.length - 1 && (
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
