

interface ProductNumberProps {
  className?: string;
  number: string;
}

const ProductNumber: React.FC<ProductNumberProps> = ({ className, number }) => {
  return (
    <div
      className={`text-sm text-color-tertiary ${className ? ` ${className}` : ""}`}
    >
      {number}
    </div>
  );
};

export default ProductNumber;
