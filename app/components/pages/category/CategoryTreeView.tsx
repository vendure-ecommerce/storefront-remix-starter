import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui-custom/MyCollapsible";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface TreeItem {
  id: string;
  title: string;
  imageSrc: string;
  children?: TreeItem[];
}

const CategoryTreeViewItem = ({
  title,
  imageSrc,
  isLast,
  isOpen,
}: TreeItem & { isLast?: boolean; isOpen: boolean }) => (
  <div
    className={`group/item flex h-14 grow items-center gap-4 px-${isLast ? 4 : 2}`}
  >
    <ChevronDown
      className={`${isLast ? "invisible flex-none" : "visible flex-none"} ${isOpen ? "rotate-180" : ""}`}
    />
    <Avatar
      className={`flex-none border h-${isLast ? 8 : 10} w-${isLast ? 8 : 10}`}
    >
      <AvatarImage src={imageSrc} alt='Kategóriakép' />
      <AvatarFallback>{title.charAt(0)}</AvatarFallback>
    </Avatar>
    <span
      className={`line-clamp-2 grow text-left text-sm group-hover/item:underline`}
    >
      {title}
    </span>
  </div>
);

const TreeView = () => {
  const calculateTreeDepth = (items: TreeItem[]): number => {
    let maxDepth = 0;

    for (const item of items) {
      if (item.children) {
        const depth = calculateTreeDepth(item.children) + 1;
        if (depth > maxDepth) {
          maxDepth = depth;
        }
      }
    }

    return maxDepth;
  };

  // const maxDepth = calculateTreeDepth(dummy.categoryTreeOptions);
  const maxDepth = 1;
  const [openCollapsibles, setOpenCollapsibles] = useState<string[]>([]);

  const handleCollapsibleToggle = (id: string) => {
    if (openCollapsibles.includes(id)) {
      setOpenCollapsibles(openCollapsibles.filter((item) => item !== id));
    } else {
      setOpenCollapsibles([...openCollapsibles, id]);
    }
  };

  const renderTreeItems = (
    items: TreeItem[],
    level = 0,
    targetLevel = maxDepth
  ) => {
    return items.map((item) => {
      const shouldApplySpecialFormatting = level === targetLevel;
      const isOpen = openCollapsibles.includes(item.id);

      return (
        <div key={item.id}>
          {item.children ? (
            <Collapsible
              open={isOpen}
              onOpenChange={() => handleCollapsibleToggle(item.id)}
            >
              <CollapsibleTrigger className={`w-full pl-${level * 4}`}>
                <CategoryTreeViewItem
                  {...item}
                  isLast={shouldApplySpecialFormatting}
                  isOpen={isOpen}
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                {renderTreeItems(item.children, level + 1, targetLevel)}
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <button className={`w-full pl-${level * 1}`}>
              <CategoryTreeViewItem
                {...item}
                isLast={shouldApplySpecialFormatting}
                isOpen={false}
              />
            </button>
          )}
        </div>
      );
    });
  };

  return <>{/* renderTreeItems(dummy.categoryTreeOptions) */}</>;
};

export default TreeView;
