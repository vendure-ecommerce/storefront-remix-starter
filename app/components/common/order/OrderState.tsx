

interface OrderStateProps {
  className?: string;
}

const OrderState: React.FC<OrderStateProps> = ({ className = "text-xs" }) => {
  const isAvailable = true;

  const orderStateText = isAvailable ? "Szállítás alatt" : "Beszerzés alatt";
  const textColor = isAvailable
    ? "text-color-in-stock"
    : "text-color-out-of-stock";

  return (
    <>
      <div
        className={`font-semibold tracking-wide${className ? ` ${className} ${textColor}` : ""}`}
      >
        {orderStateText}
      </div>
    </>
  );
};

export default OrderState;
