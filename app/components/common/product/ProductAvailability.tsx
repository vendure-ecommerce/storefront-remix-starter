

interface ProductAvailabilityProps {
  className?: string;
}

const ProductAvailability: React.FC<ProductAvailabilityProps> = ({
  className = "text-xs",
}) => {
  const isAvailable = true;

  const availabilityText = isAvailable ? "Elérhető" : "Nem elérhető";
  const textColor = isAvailable
    ? "text-color-in-stock"
    : "text-color-out-of-stock";

  return (
    <>
      <div
        className={`font-semibold tracking-wide${className ? ` ${className} ${textColor}` : ""}`}
      >
        {availabilityText}
      </div>
    </>
  );
};

export default ProductAvailability;
