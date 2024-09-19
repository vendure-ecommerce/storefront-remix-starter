

import ProductImage from "~/components/common/product/ProductImage";
import ProductPriceCrossed from "~/components/common/product/ProductPriceCrossed";
import ProductPriceNet from "~/components/common/product/ProductPriceNet";
import ProductPriceNormal from "~/components/common/product/ProductPriceNormal";
import ProductTitle from "~/components/common/product/ProductTitle";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui-custom/MyCard";
import Link from "next/link";
import { useState } from "react";

interface HistoryProductCardProps {
  className?: string;
  id: string;
  title: string;
  link: string;
  priceNormal: number;
  priceNet: number;
  priceCrossed: number;
  imageSrc: string;
  hoverImageSrc: string;
}

const HistoryProductCard: React.FC<HistoryProductCardProps> = ({
  className,
  id,
  title,
  link,
  priceNormal,
  priceNet,
  priceCrossed,
  imageSrc,
  hoverImageSrc,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Card
      className={`flex flex-col gap-4 hover:border-primary/30 transition shadow-none${className ? ` ${className}` : ""}`}
      key={id}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CardHeader className='relative p-0'>
        <Link href={link}>
          <ProductImage src={isHovering ? hoverImageSrc : imageSrc} />
        </Link>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <Link href={link}>
            <CardTitle className='line-clamp-2 text-base'>
              <ProductTitle title={title} />
            </CardTitle>
          </Link>
        </div>
        <div className='flex flex-col'>
          <ProductPriceCrossed
            className='text-xs'
            priceCrossed={priceCrossed}
          />
          <ProductPriceNormal className='text-base' priceNormal={priceNormal} />
          <ProductPriceNet priceNet={priceNet} className='text-xs' />
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryProductCard;
