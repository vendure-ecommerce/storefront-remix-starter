import { formatNumberWithSeparator } from '~/utils';

interface ProductPriceNormalProps {
  className?: string;
  priceNormal: number;
}

const ProductPriceNormal: React.FC<ProductPriceNormalProps> = ({
  className,
  priceNormal,
}) => {
  const formattedPrice = formatNumberWithSeparator(priceNormal);

  return (
    <div
      className={`text-color-primary font-bold${
        className ? ` ${className}` : ''
      }`}
    >
      {formattedPrice} Ft
    </div>
  );
};

export default ProductPriceNormal;
