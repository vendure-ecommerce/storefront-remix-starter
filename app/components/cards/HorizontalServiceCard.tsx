

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui-custom/MyCard";
import AddToCartHandler from "~/components/common/product/AddToCartHandler";
import ProductTitle from "~/components/common/product/ProductTitle";
import ProductImage from "~/components/common/product/ProductImage";
import ProductNumber from "~/components/common/product/ProductNumber";
import ProductPriceCrossed from "~/components/common/product/ProductPriceCrossed";
import ProductPriceNormal from "~/components/common/product/ProductPriceNormal";
import ProductPriceNet from "~/components/common/product/ProductPriceNet";
import ProductTag from "~/components/common/product/ProductTag";
import { Badge } from "~/components/ui-custom/MyBadge";

interface ServiceCardProps {
  title: string;
  number: string;
  priceNormal: number;
  priceNet: number;
  priceCrossed: number;
  imageSrc: string;
  showAddToCartHandler?: boolean;
}

const HorizontalServiceCard: React.FC<ServiceCardProps> = ({
  title,
  number,
  priceNormal,
  priceNet,
  priceCrossed,
  imageSrc,
  showAddToCartHandler = true,
}) => {
  return (
    <>
      <Card
        className={`relative flex justify-between gap-8 border p-4 shadow-none hover:border-primary/30 transition`}
      >
        <CardHeader className='relative flex flex-row items-center gap-8 p-0'>
          <ProductImage className='!h-16 !w-36' src={imageSrc} />
          <div className='flex h-full flex-col gap-1'>
            <CardTitle className='text-sm'>
              <ProductTitle title={title} />
            </CardTitle>
            <ProductNumber number={number} />
            <div className='mt-auto'>
              <ProductTag>Címke</ProductTag>
            </div>
          </div>
        </CardHeader>
        <CardFooter className='flex flex-none flex-col items-end justify-between gap-4 p-0'>
          <div className='flex flex-none flex-col'>
            <ProductPriceCrossed
              className='text-right text-xs'
              priceCrossed={priceCrossed}
            />
            <ProductPriceNormal
              className='text-right text-lg leading-none'
              priceNormal={priceNormal}
            />
            <ProductPriceNet
              priceNet={priceNet}
              className='text-right text-xs'
            />
          </div>
          {showAddToCartHandler ? (
            <AddToCartHandler
              className='w-40'
              addToCartButtonText='Kiválaszt'
              addToCartButtonSize='h-10 text-sm w-full'
              stepperButtonSize='h-9 w-9'
              iconSize='h-4 w-4'
              inputSize='h-10'
            />
          ) : (
            <Badge className={`rounded-full`} variant={"inCartAmount"}>
              1 db
            </Badge>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default HorizontalServiceCard;
