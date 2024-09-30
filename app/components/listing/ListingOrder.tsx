

import { useSearchParams, useSubmit } from "@remix-run/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { sortOrders } from "~/routes/collections/$slug";
import { useCollections } from "~/providers/collections";

const getSortOrderText: (value: string | null) => string = (value) => {
  return sortOrders.find((order) => order.value === value)?.label || sortOrders[0].label;
};

interface ListingOrderProps {}
const ListingOrder: React.FC<ListingOrderProps> = ({}) => {
  const { searchParams } = useCollections();
  const submit = useSubmit();

  const onValueChange = (value: string) => {
    const formData = new FormData();
    formData.set("order", value);

    for (const [key, value] of searchParams) {
      if (key !== "order") {
        formData.append(key, value);
      }
    }
  
    submit(formData, { method: "get", preventScrollReset: true });
  };

  return (
    <Select
      value={searchParams.get('order') || sortOrders[0].value}
      onValueChange={onValueChange}
    >
      <SelectTrigger className='w-auto min-w-[220px] rounded-full'>
        <SelectValue>
          {getSortOrderText(searchParams.get('order'))}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {sortOrders.map((order) => (
          <SelectItem key={order.value} value={order.value}>{order.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ListingOrder;
