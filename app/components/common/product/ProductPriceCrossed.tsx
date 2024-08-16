

import { formatNumberWithSeparator } from "@/helpers/numberFormatting";

interface ProductPriceCrossedProps {
  className?: string;
  priceCrossed: number;
}

const ProductPriceCrossed: React.FC<ProductPriceCrossedProps> = ({
  className,
  priceCrossed,
}) => {
  const formattedPrice = formatNumberWithSeparator(priceCrossed);

  return (
    <div
      className={`line-through text-color-tertiary${className ? ` ${className}` : ""}`}
    >
      {formattedPrice} Ft
    </div>
  );
};

export default ProductPriceCrossed;
