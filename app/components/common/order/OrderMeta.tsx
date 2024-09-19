

interface OrderMetaProps {
  className?: string;
  date?: string;
}

const OrderMeta: React.FC<OrderMetaProps> = ({
  className,
  date = "2023.10.20, 20:22",
}) => {
  return (
    <div
      className={`text-sm text-color-tertiary ${className ? ` ${className}` : ""}`}
    >
      Rögzítve: {date}
    </div>
  );
};

export default OrderMeta;
