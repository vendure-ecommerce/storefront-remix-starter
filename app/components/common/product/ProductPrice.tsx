

import ProductPriceNormal from "./ProductPriceNormal";
import ProductPriceCrossed from "./ProductPriceCrossed";
import ProductPriceNet from "./ProductPriceNet";

interface ProductPriceProps {
  className?: string;
  priceNormal: number;
  priceNet: number;
  priceCrossed: number;
}

const ProductPrice: React.FC<ProductPriceProps> = ({
  className,
  priceNormal,
  priceNet,
  priceCrossed,
}) => {
  return (
    <div className={`flex flex-col mt-auto${className ? ` ${className}` : ""}`}>
      <div className='flex flex-wrap-reverse items-baseline gap-x-2'>
        <ProductPriceNormal priceNormal={priceNormal} className='text-xl' />
        <ProductPriceCrossed priceCrossed={priceCrossed} className='text-sm' />
      </div>
      <ProductPriceNet priceNet={priceNet} className='text-sm' />
    </div>
  );
};

export default ProductPrice;
