

import { Card, CardTitle } from "~/components/ui-custom/MyCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui-custom/MyDialog";

interface uspCardProps {
  className?: string;
  id: string;
  title: string;
  description: string;
  imageSrc: string;
}

const UspCard: React.FC<uspCardProps> = ({
  className = "aspect-square object-contain object-center",
  id,
  title,
  description,
  imageSrc,
}) => {
  return (
    <Dialog>
      <DialogTrigger className='grow'>
        <Card
          className='flex cursor-pointer flex-col items-center justify-center gap-4 border p-4 shadow-none transition hover:border-primary/30'
          id={id}
        >
          <img
            className={`object-contain object-center${className ? ` ${className}` : ""}`}
            src={imageSrc}
            width={60}
            height={60}
            alt='alt'
          />
          <CardTitle className='text-sm text-color-tertiary'>{title}</CardTitle>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default UspCard;
