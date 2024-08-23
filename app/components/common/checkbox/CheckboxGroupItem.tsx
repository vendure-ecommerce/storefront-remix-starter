import { Checkbox } from '~/components/ui-custom/MyCheckbox';
import { Label } from '~/components/ui/label';

interface CheckboxGroupItemProps {
  id: string;
  checked?: boolean;
  className?: string;
  label: string;
  showLabel?: boolean;
  imageSrc?: string;
  showImage?: boolean;
  onClick?: (id: string) => void;
}

const CheckboxGroupItem: React.FC<CheckboxGroupItemProps> = ({
  id,
  checked,
  className,
  label,
  showLabel = true,
  imageSrc,
  showImage = true,
  onClick,
}) => {
  return (
    <Label
      className={`flex h-14 w-full cursor-pointer items-center gap-4 rounded-md transition hover:bg-primary/5 px-3${
        className ? ` ${className}` : ''
      }`}
      htmlFor={id}
    >
      {showImage && imageSrc && (
        <img
          className="h-10 w-10 rounded-full border"
          src="/category.png"
          width={60}
          height={60}
          alt="Kategóriakép"
        />
      )}
      <span className={!showLabel ? 'sr-only' : ''}>{label}</span>
      <Checkbox
        id={id}
        className="ml-auto"
        checked={checked}
        onClick={() => onClick?.(id)}
      />
    </Label>
  );
};

export default CheckboxGroupItem;
