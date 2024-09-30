import { useState } from 'react';
import AddToCartHandler from '~/components/common/product/AddToCartHandler';
import ProductAmountStepper from '~/components/common/product/ProductAmountStepper';
import ProductAvailability from '~/components/common/product/ProductAvailability';
import ProductImage from '~/components/common/product/ProductImage';
import ProductNumber from '~/components/common/product/ProductNumber';
import ProductPriceCrossed from '~/components/common/product/ProductPriceCrossed';
import ProductPriceNet from '~/components/common/product/ProductPriceNet';
import ProductPriceNormal from '~/components/common/product/ProductPriceNormal';
import ProductTag from '~/components/common/product/ProductTag';
import ProductTitle from '~/components/common/product/ProductTitle';
import { Badge } from '~/components/ui-custom/MyBadge';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui-custom/MyCard';
import { useActiveOrder } from '~/utils/use-active-order';

interface ProductCardProps {
  id: string;
  lineItemId: string;
  title: string;
  number: string;
  priceNormal: number;
  priceNet: number;
  priceCrossed: number;
  imageSrc: string;
  isConnected?: boolean;
  showAddToCartHandler?: boolean;
  showProductAmountStepper?: boolean;
  children?: React.ReactNode;
  variant?: 'default' | 'sm';
}

const HorizontalProductCard: React.FC<ProductCardProps> = ({
  id,
  lineItemId,
  title,
  number,
  priceNormal,
  priceNet,
  priceCrossed,
  imageSrc,
  isConnected = false,
  showAddToCartHandler = true,
  showProductAmountStepper = false,
  children,
  variant = 'default',
}) => {
  const isSmall = variant === 'sm';
  
  const { removeItem } = useActiveOrder();

  const onTrashButtonClick = () => {
    removeItem(lineItemId);
  };

  return (
    <div
      className={`relative ${
        isConnected ? 'group/child-card' : 'group/connected-block'
      }`}
    >
      {isConnected ? (
        <div className="absolute left-8 top-0 z-[-1] h-full">
          <div className="absolute top-[calc(50%_+_0.5rem)] m-auto h-[2px] w-8 border-b-2 border-border opacity-100"></div>
        </div>
      ) : null}
      <div
        className={`${
          isConnected ? 'relative ml-8 pt-3' : 'group/parent-card'
        }`}
      >
        <Card
          className={`relative flex justify-between gap-8 border p-4 shadow-none transition hover:border-primary/30 ${
            isConnected ? 'ml-8' : ''
          }`}
        >
          <CardHeader
            className={`relative flex flex-row items-start ${
              isSmall ? 'gap-4' : 'gap-8'
            } p-0`}
          >
            <ProductImage
              className={`rounded-lg bg-white ${
                isSmall ? '!h-14 !w-14' : '!h-36 !w-36'
              }`}
              src={imageSrc}
            />
            <div className="flex h-full flex-col gap-1">
              <ProductAvailability />
              <a href="/product">
                <CardTitle className="text-base">
                  <ProductTitle title={title} />
                </CardTitle>
              </a>
              <ProductNumber number={number} />
              <div className="mt-auto">
                <ProductTag>Címke</ProductTag>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="flex flex-none flex-col items-end justify-between gap-4 p-0">
            <div className="flex flex-none flex-col">
              <ProductPriceCrossed
                className="text-right text-xs"
                priceCrossed={priceCrossed}
              />
              <ProductPriceNormal
                className="text-right text-lg leading-none"
                priceNormal={priceNormal}
              />
              <ProductPriceNet
                priceNet={priceNet}
                className="text-right text-xs"
              />
            </div>
            {showAddToCartHandler && (
              <AddToCartHandler
                id={"horizontal-product-card-" + id}
                productId={id}
                className="w-40"
                addToCartButtonText="Kiválaszt"
                addToCartButtonSize="h-10 text-sm w-full"
                stepperButtonSize="h-9 w-9"
                iconSize="h-4 w-4"
                inputSize="h-10"
              />
            )/* : showProductAmountStepper ? (
              <ProductAmountStepper
                className="w-36 self-end"
                stepperButtonSize="h-7 w-7"
                iconSize="h-4 w-4"
                inputSize="h-8"
                amount={amount}
                onAmountChange={handleAmountChange}
                onRemove={handleRemove}
              />
            ) : (
              <Badge
                className={`rounded-full`}
                variant={isSmall ? 'inCartAmountSm' : 'inCartAmount'}
              >
                1 db
              </Badge>
            )*/}
          </CardFooter>
        </Card>
      </div>
      {children && (
        <div className="group/connected-children relative">
          <div className="absolute left-8 top-0 z-[-1] h-[calc(75%_+_0.5rem)] border-l-2"></div>
          {children}
        </div>
      )}
    </div>
  );
};

export default HorizontalProductCard;
