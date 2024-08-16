

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui-custom/MyDialog";
import SelectCard from "../cards/SelectCard";

interface SelectDialogProps {
  trigger?: string;
  title?: string;
  description?: string;
}

const SelectDialog: React.FC<SelectDialogProps> = ({
  trigger,
  title,
  description,
}) => {
  return (
    <Dialog>
      <DialogTrigger className='font-bold text-secondary-foreground underline'>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {[...Array(4)].map((_, index) => (
          <SelectCard
            key={index}
            title={`Postai kiszállítás`}
            description='Várható kézbesítés: aug. 9. - aug. 15'
            price='2 000 Ft'
          />
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default SelectDialog;
