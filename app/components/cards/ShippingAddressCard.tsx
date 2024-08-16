

import { Check, Truck } from "lucide-react";
import { useState } from "react";
import { Card, CardDescription, CardTitle } from "../ui-custom/MyCard";
import { Avatar } from "../ui/avatar";

interface ShippingAddressCardProps {
  title?: string;
  description?: string;
  price?: string;
  distance?: string;
  isFreeShipping?: boolean;
  isSelected?: boolean;
}

const ShippingAddressCard: React.FC<ShippingAddressCardProps> = ({
  title,
  description,
  price,
  distance,
  isFreeShipping = false,
  isSelected: initialIsSelected = false,
}) => {
  const [isSelected, setIsSelected] = useState(initialIsSelected);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <Card
      className={`flex items-center gap-4 rounded-none border-none p-4 shadow-none ${isSelected ? "bg-primary/5" : "cursor-pointer transition hover:bg-primary/5"}`}
      onClick={handleClick}
    >
      <div className='relative'>
        <Avatar className='h-14 w-14 items-center justify-center rounded-lg bg-primary'>
          <Truck className='h-7 w-7 text-color-primary-foreground'></Truck>
        </Avatar>
        {isSelected ? (
          <div className='absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-green-700'>
            <Check className='h-5 w-5 text-white' />
          </div>
        ) : null}
      </div>
      <div>
        <CardTitle className='flex gap-1.5 text-base'>{title}</CardTitle>
        <CardDescription className='text-base'>{description}</CardDescription>
      </div>
      {isFreeShipping ? (
        <div className='ml-auto self-start font-bold text-green-700'>
          Ingyenes
        </div>
      ) : (
        <div className='ml-auto self-start font-bold'>{price}</div>
      )}
      {distance ? <div className='text-sm opacity-50'>{distance}</div> : null}
    </Card>
  );
};

export default ShippingAddressCard;
