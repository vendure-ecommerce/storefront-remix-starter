

import { ChevronDown } from "lucide-react";
import ListingInfo from "./ListingInfo";
import { Progress } from "~/components/ui-custom/MyProgress";
import { Button } from "~/components/ui-custom/MyButton";
import { useCollections } from "~/providers/collections";
import { useSubmit } from "@remix-run/react";
import { allowedPaginationLimits } from "~/routes/collections/$slug";

const findNextLimit = (set: Set<number>, limit: number) => {
  for (let element of set) {
    if (element > limit) {
      return element;
    }
  }
  return limit * 2;
};

const ListingFooter = () => {
  const { collectionItems, searchParams, pagination } = useCollections();
  const submit = useSubmit();

  const onLoadMore = () => {
    const formData = new FormData();
    // Get all the params from the URL
    for (const [key, value] of searchParams) {
      if (key !== "limit") {
        formData.append(key, value);
      }
    }

    formData.set("limit", findNextLimit(allowedPaginationLimits, pagination.limit).toString());
  
    submit(formData, { method: "get", preventScrollReset: true });
  };

  return (
    <div className='flex flex-col items-center gap-8'>
      <div className='flex flex-col items-center gap-4'>
        <ListingInfo />
        <Progress
          className='h-1 w-80'
          value={
            pagination.limit > collectionItems?.totalItems
              ? 100
              : pagination.limit / collectionItems?.totalItems * 100
          }
        />
      </div>
      {collectionItems?.totalItems > pagination.limit && (
        <Button onClick={onLoadMore}>
          Továbbiak megjelenítése
          <ChevronDown className='ml-2 h-4 w-4' />
        </Button>
      )}
    </div>
  );
};

export default ListingFooter;
