

import AddToCartHandler from "~/components/common/product/AddToCartHandler";
import ProductAvailability from "~/components/common/product/ProductAvailability";
import ProductImage from "~/components/common/product/ProductImage";
import ProductPriceCrossed from "~/components/common/product/ProductPriceCrossed";
import ProductPriceNet from "~/components/common/product/ProductPriceNet";
import ProductPriceNormal from "~/components/common/product/ProductPriceNormal";
import ProductTitle from "~/components/common/product/ProductTitle";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui-custom/MyCard";
import Link from "next/link";

interface ProductCardProps {
  className?: string;
  title: string;
  number: string;
  priceNormal: number;
  priceNet: number;
  priceCrossed: number;
  imageSrc: string;
}

const StickyProductCard: React.FC<ProductCardProps> = ({
  className,
  title,
  priceNormal,
  priceNet,
  priceCrossed,
  imageSrc,
}) => {
  return (
    <div
      className={`fixed left-0 top-[8rem] w-full border-b lg:top-[8.3125rem] bg-white${className ? ` ${className}` : ""}`}
    >
      <div className='mx-auto w-full max-w-screen-2xl'>
        <Card className='flex h-[4.5rem] justify-between gap-4 border-none px-6 shadow-none'>
          <CardHeader className='relative hidden flex-row items-center gap-4 p-0 md:flex'>
            <div className='flex-none overflow-hidden rounded-full border'>
              <ProductImage className='!w-14' src={imageSrc} />
            </div>
            <div className='flex flex-col gap-1'>
              <ProductAvailability />
              <Link href='/product'>
                <CardTitle className='text-sm'>
                  <ProductTitle title={title} />
                </CardTitle>
              </Link>
            </div>
          </CardHeader>
          <CardFooter className='flex grow justify-between gap-4 p-0 md:grow-0'>
            <div className='flex flex-none flex-col'>
              <ProductPriceCrossed
                className='text-xs md:text-right'
                priceCrossed={priceCrossed}
              />
              <ProductPriceNormal
                className='text-lg leading-none md:text-right'
                priceNormal={priceNormal}
              />
              <ProductPriceNet
                priceNet={priceNet}
                className='text-xs md:text-right'
              />
            </div>
            <AddToCartHandler
              className='w-40'
              addToCartButtonSize='h-10 text-sm w-full'
              stepperButtonSize='h-9 w-9'
              iconSize='h-4 w-4'
              inputSize='h-10'
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default StickyProductCard;
