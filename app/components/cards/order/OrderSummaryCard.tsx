import { Button } from "~/components/ui-custom/MyButton";
import { Eye } from "lucide-react";
import HorizontalProductCard from "../product/HorizontalProductCard";
import HorizontalServiceCard from "~/components/cards/HorizontalServiceCard";

interface OrderSummaryCardProps {
  id?: string;
  title?: string;
}

const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({ id, title }) => {

  /* const product = dummy.productOptions[0];
  const service = dummy.serviceOptions[0]; */

  return (
    <div className='grid grid-cols-1 gap-8'>
      <div className='grid grid-cols-5 gap-4'>
        <div>
          <div className='font-bold'>Rendelés státusza</div>
          <div className='text-sm text-color-tertiary'>Szállítás alatt</div>
        </div>
        <div>
          <div className='font-bold'>Rendelésszám</div>
          <div className='text-sm text-color-tertiary'>218489HT83</div>
        </div>
        <div>
          <div className='font-bold'>Rögzítve</div>
          <div className='text-sm text-color-tertiary'>
            2023. november 20., 20:22
          </div>
        </div>
        <div>
          <div className='font-bold'>Végösszeg</div>
          <div className='text-sm text-color-tertiary'>1 995 000 Ft</div>
        </div>
        <div className='flex justify-end'>
          <Button asChild>
            <a href='/account/orders/order'>
              <Eye className='mr-2 h-4 w-4' />A rendelés részletei
            </a>
          </Button>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-6'>
        {[...Array(3)].map((_, index) => (
          <>
            {/* <HorizontalProductCard
              key={index}
              title={product.title}
              number={product.number}
              priceNormal={product.priceNormal}
              priceNet={product.priceNet}
              priceCrossed={product.priceCrossed}
              imageSrc={product.imageSrc}
              showAddToCartHandler={false}
            /> */}
            HorizontalProductCard
          </>
        ))}
        {[...Array(1)].map((_, index) => (
          <>
          {/*   <HorizontalServiceCard
              key={index}
              title={service.title}
              number={service.number}
              priceNormal={service.priceNormal}
              priceNet={service.priceNet}
              priceCrossed={service.priceCrossed}
              imageSrc={service.imageSrc}
              showAddToCartHandler={false}
            /> */}
            HorizontalServiceCard
          </>
        ))}
      </div>
    </div>
  );
};

export default OrderSummaryCard;
