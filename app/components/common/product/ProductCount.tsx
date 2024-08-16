

interface ProductCountProps {
  className?: string;
  productCount?: number;
}

const ProductCount: React.FC<ProductCountProps> = ({
  className,
  productCount,
}) => {
  return (
    <div
      className={`text-center text-xs text-color-tertiary${className ? ` ${className}` : ""}`}
    >
      {productCount} db termék
    </div>
  );
};

export default ProductCount;
