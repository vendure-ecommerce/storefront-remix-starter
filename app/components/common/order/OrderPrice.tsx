

interface ProductPriceProps {
  className?: string;
  priceNormal?: number;
  priceNet?: number;
}

const ProductPrice: React.FC<ProductPriceProps> = ({
  className,
  priceNormal = "10 000",
  priceNet = "10 000",
}) => {
  return (
    <div className={`flex flex-col mt-auto${className ? ` ${className}` : ""}`}>
      <div className='flex flex-wrap-reverse items-baseline gap-x-2'>
        <div className='text-xl font-bold text-color-primary'>
          {priceNormal} Ft
        </div>
      </div>
      <div className='text-sm text-color-tertiary'>(nettó: {priceNet} Ft)</div>
    </div>
  );
};

export default ProductPrice;
