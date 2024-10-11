

import { X } from "lucide-react";
import Chip from "./Chip";
import { Button } from "~/components/ui-custom/MyButton";

interface RemoveChipProps {
  attribute: string;
  value: string;
  onClose?: () => void;
}

const RemoveChip: React.FC<RemoveChipProps> = ({
  attribute,
  value,
  onClose,
}) => {
  return (
    <Chip>
      {attribute}: {value}
      <Button variant={"ghost"} size={"iconXs"} onClick={onClose}>
        <div className='sr-only'>Törlés</div>
        <X className='h-4 w-4' />
      </Button>
    </Chip>
  );
};

export default RemoveChip;
