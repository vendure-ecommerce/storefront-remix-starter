

import { Checkbox } from "~/components/ui-custom/MyCheckbox";
import { Label } from "~/components/ui/label";
import StarRating from "../review/StarRating";

interface CheckboxGroupRatingItemProps {
  id: string;
  label: string;
  showLabel?: boolean;
  rating: number;
}

const CheckboxGroupRatingItem: React.FC<CheckboxGroupRatingItemProps> = ({
  id,
  label,
  showLabel = true,
  rating,
}) => {
  return (
    <Label
      className='flex h-14 w-full cursor-pointer items-center rounded-md hover:bg-primary/5 transition gap-4 px-3'
      htmlFor={id}
    >
      <StarRating rating={rating}></StarRating>
      <span className={!showLabel ? "sr-only" : ""}>{label}</span>
      <Checkbox className='ml-auto' id={id} />
    </Label>
  );
};

export default CheckboxGroupRatingItem;
