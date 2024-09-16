

import { Label } from "~/components/ui/label";
import { Check } from "lucide-react";
import { useState } from "react";
import Chip from "./Chip";

interface SelectChipProps {
  label: string;
}

const SelectChip: React.FC<SelectChipProps> = ({ label }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <Label
      className='flex cursor-pointer items-center gap-4'
      onClick={handleClick}
    >
      <Chip
        className={`px-3 text-sm hover:bg-primary/5 transition ${isSelected ? "bg-brand hover:bg-brand pl-2 pr-3 text-brand-foreground" : ""}`}
      >
        {isSelected && <Check className='h-4 w-4'></Check>}
        {label}
      </Chip>
    </Label>
  );
};

export default SelectChip;
