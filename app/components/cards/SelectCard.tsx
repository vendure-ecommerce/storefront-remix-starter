import { Truck } from 'lucide-react';
import { useState } from 'react';
import { Card, CardDescription, CardTitle } from '../ui-custom/MyCard';
import { Avatar } from '../ui/avatar';

interface SelectCardProps {
  title?: string;
  methodId: string;
  description?: string;
  price?: string;
  isSelected?: boolean;
  onSelect: (id: string) => void;
}

const SelectCard: React.FC<SelectCardProps> = ({
  title,
  methodId,
  description,
  price,
  isSelected: initialIsSelected = false,
  onSelect,
}) => {
  const [isSelected, setIsSelected] = useState(initialIsSelected);

  const handleClick = () => {
    setIsSelected(!isSelected);
    onSelect(methodId);
  };

  return (
    <Card
      className={`flex items-center gap-4 p-4 shadow-none ${
        isSelected
          ? 'bg-primary/5'
          : 'cursor-pointer hover:border-primary/30 transition'
      }`}
      onClick={handleClick}
    >
      <Avatar className="h-14 w-14 items-center justify-center bg-primary">
        <Truck className="h-7 w-7 text-color-primary-foreground"></Truck>
      </Avatar>
      <div>
        <CardTitle className="flex gap-1.5 text-base">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </div>
      <div className="ml-auto font-bold">{price}</div>
    </Card>
  );
};

export default SelectCard;
