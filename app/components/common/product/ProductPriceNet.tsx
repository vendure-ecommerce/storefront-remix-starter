import { formatNumberWithSeparator } from '~/utils';

interface ProductPriceNetProps {
  className?: string;
  priceNet: number;
}

const ProductPriceNet: React.FC<ProductPriceNetProps> = ({
  className,
  priceNet,
}) => {
  const formattedPrice = formatNumberWithSeparator(priceNet);

  return (
    <div className={`text-color-tertiary${className ? ` ${className}` : ''}`}>
      (nettó: {formattedPrice} Ft)
    </div>
  );
};

export default ProductPriceNet;
