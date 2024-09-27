

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui-custom/MyCard";
import OrderState from "~/components/common/order/OrderState";
import OrderMeta from "~/components/common/order/OrderMeta";
import OrderNumber from "~/components/common/order/OrderNumber";
import OrderPrice from "~/components/common/order/OrderPrice";
import ProductImage from "~/components/common/product/ProductImage";
import { Link } from "@remix-run/react";

interface OrderCardProps {
  id: string;
  title: string;
  link: string;
  date: string;
  imageSrc: string;
  connectedProducts: Array<{ id: string; imageSrc: string }>;
}

const OrderCard: React.FC<OrderCardProps> = ({
  id,
  title,
  link,
  date,
  imageSrc,
  connectedProducts,
}) => {
  const additionalCount = connectedProducts.length - 3;

  return (
    <Card
      className='flex h-full flex-col gap-4 border shadow-none hover:border-primary/30 p-4 transition'
      id={id}
    >
      <CardHeader className='relative flex gap-2 p-0'>
        <Link to={link}>
          <ProductImage src={imageSrc} />
        </Link>
        <div className='grid grid-cols-3 gap-2'>
          {connectedProducts.slice(0, 2).map((product, index) => (
            <ProductImage key={index} src={product.imageSrc} />
          ))}
          <div className='relative'>
            {connectedProducts.length > 2 ? (
              <ProductImage key={2} src={connectedProducts[2].imageSrc} />
            ) : null}
            {additionalCount > 0 && (
              <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50 text-white'>
                <span>+{additionalCount}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex flex-grow flex-col gap-4 p-0'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <OrderMeta date={date} />
        </div>
        <div className='flex flex-col gap-1'>
          <OrderState />
          <Link href={link}>
            <CardTitle className='text-base'>
              <OrderNumber title={title} />
            </CardTitle>
          </Link>
        </div>
        <OrderPrice />
      </CardContent>
    </Card>
  );
};

export default OrderCard;
