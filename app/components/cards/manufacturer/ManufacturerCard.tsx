/* TODO
Itt van jól megcsinálva a kondicionálás
*/

import { Link } from '@remix-run/react';
import AvatarGroup from '~/components/avatar/AvatarGroup';
import ManufacturerImage from '~/components/common/manufacturer/ManufacturerImage';
import ManufacturerTitle from '~/components/common/manufacturer/ManufacturerTitle';
import ProductCount from '~/components/common/product/ProductCount';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/components/ui-custom/MyCard';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

interface SampleProduct {
  title: string;
  imageSrc: string;
  link: string;
}
interface ManufacturerCardProps {
  className?: string;
  id: string;
  title: string;
  link: string;
  imageSrc?: string;
  productCount?: number;
  sampleProducts?: SampleProduct[];
  showAvatarGroup?: boolean;
  showProductCount?: boolean;
}

const ManufacturerCard: React.FC<ManufacturerCardProps> = ({
  className,
  id,
  title,
  link,
  imageSrc,
  productCount,
  sampleProducts,
  showAvatarGroup = true,
  showProductCount = true,
}) => {
  return (
    <Link className="flex grow" to={link} prefetch="intent">
      <Card
        className={`group/card flex grow flex-col ${
          showAvatarGroup && showProductCount ? 'gap-4' : 'gap-0'
        } shadow-none transition hover:border-primary/30 ${
          className ? ` ${className}` : ''
        }`}
        key={id}
      >
        <CardHeader className="relative p-0">
          {imageSrc && <ManufacturerImage src={imageSrc} />}
        </CardHeader>
        <CardContent
          className={`flex grow flex-col p-4 ${
            showAvatarGroup && showProductCount
              ? 'justify-between gap-2 pt-0'
              : 'justify-center gap-0'
          }`}
        >
          {sampleProducts && showAvatarGroup && (
            <AvatarGroup className="flex justify-center -space-x-2">
              {sampleProducts.slice(0, 3).map((product, index) => (
                <Avatar className="ring-1 ring-border" key={index}>
                  <AvatarImage src={product.imageSrc} alt={product.title} />
                  <AvatarFallback>{product.title.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
          )}
          <div className="flex flex-col gap-1">
            <CardTitle className="line-clamp-2 text-center text-sm">
              <ManufacturerTitle title={title} />
            </CardTitle>
          </div>
          {productCount && showProductCount && (
            <ProductCount productCount={21} />
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ManufacturerCard;
