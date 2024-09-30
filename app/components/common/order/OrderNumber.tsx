

interface OrderNumberProps {
  className?: string;
  title: string;
}

const OrderNumber: React.FC<OrderNumberProps> = ({ className, title }) => {
  return <>{title}</>;
};

export default OrderNumber;
