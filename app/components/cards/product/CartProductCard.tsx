

import ProductAmountStepper from "~/components/common/product/ProductAmountStepper";
import ProductAvailability from "~/components/common/product/ProductAvailability";
import ProductImage from "~/components/common/product/ProductImage";
import ProductPriceCrossed from "~/components/common/product/ProductPriceCrossed";
import ProductPriceNet from "~/components/common/product/ProductPriceNet";
import ProductPriceNormal from "~/components/common/product/ProductPriceNormal";
import ProductTitle from "~/components/common/product/ProductTitle";
import { Button } from "~/components/ui-custom/MyButton";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui-custom/MyCard";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  title: string;
  link: string;
  number: string;
  priceNormal: number;
  priceNet: number;
  priceCrossed: number;
  imageSrc: string;
  rating: number;
  reviews: number;
  manufacturer: {
    title: string;
    imageSrc: string;
    link: string;
  }[];
}

const CartProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  link,
  priceNormal,
  priceNet,
  priceCrossed,
  imageSrc,
}) => {
  const [amount, setAmount] = useState(1); // Kezdeti érték beállítása 1-re

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
    // Itt hozzáadhatod a további logikát, pl. frissítheted az állapotot egy globális állapotkezelőben
  };

  const handleRemove = () => {
    // Itt implementálhatod a logikát, ami akkor hajtódik végre, amikor a termék eltávolításra kerül
    console.log("A termék eltávolításra került");
    // Például eltávolíthatod a terméket a kosárból, frissítheted az állapotot, stb.
  };

  return (
    <Card
      className='group/card relative flex flex-col gap-2 border-none shadow-none'
      id={id}
    >
      <CardHeader className='relative flex flex-row items-start gap-4 p-0'>
        <Link href={link}>
          <ProductImage
            className='!w-14 border rounded-lg bg-white'
            src={imageSrc}
          />
        </Link>
        <div className='flex flex-col gap-1'>
          <ProductAvailability />
          <Link href={link}>
            <CardTitle className='text-sm'>
              <ProductTitle title={title} />
            </CardTitle>
          </Link>
        </div>
      </CardHeader>
      {/* <CardContent className='flex flex-grow flex-col gap-4 p-0'></CardContent> */}
      <CardFooter className='flex justify-between gap-4 p-0'>
        <ProductAmountStepper
          className='w-36 self-end'
          stepperButtonSize='h-7 w-7'
          iconSize='h-4 w-4'
          inputSize='h-8'
          amount={amount}
          onAmountChange={handleAmountChange}
          onRemove={handleRemove}
        />
        <div className='flex flex-none flex-col'>
          <ProductPriceCrossed
            className='text-xs text-right'
            priceCrossed={priceCrossed}
          />
          <ProductPriceNormal
            className='text-lg leading-none text-right'
            priceNormal={priceNormal}
          />
          <ProductPriceNet priceNet={priceNet} className='text-xs text-right' />
        </div>
      </CardFooter>
      <Button
        className='absolute -top-1 right-1.5 w-7 h-7 p-0 opacity-20 group-hover/card:opacity-100 transition'
        variant={"ghost"}
      >
        <Trash className='h-3.5 w-3.5' />
        <span className='sr-only'>Törlés</span>
      </Button>
    </Card>
  );
};

export default CartProductCard;