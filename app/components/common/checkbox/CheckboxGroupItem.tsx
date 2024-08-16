

import { Checkbox } from "~/components/ui-custom/MyCheckbox";
import { Label } from "~/components/ui/label";

interface CheckboxGroupItemProps {
  id: string;
  className?: string;
  label: string;
  showLabel?: boolean;
  imageSrc?: string;
  showImage?: boolean;
}

const CheckboxGroupItem: React.FC<CheckboxGroupItemProps> = ({
  id,
  className,
  label,
  showLabel = true,
  imageSrc,
  showImage = true,
}) => {
  return (
    <Label
      className={`flex h-14 w-full cursor-pointer items-center gap-4 rounded-md transition hover:bg-primary/5 px-3${className ? ` ${className}` : ""}`}
      htmlFor={id}
    >
      {showImage && imageSrc && (
        <img
          className='h-10 w-10 rounded-full border'
          src='/category.png'
          width={60}
          height={60}
          alt='Kategóriakép'
        />
      )}
      <span className={!showLabel ? "sr-only" : ""}>{label}</span>
      <Checkbox className='ml-auto' id={id} />
    </Label>
  );
};

export default CheckboxGroupItem;
