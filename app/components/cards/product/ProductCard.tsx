import { Link } from '@remix-run/react';
import { useState } from 'react';
import ManufacturerAvatar from '~/components/avatar/ManufacturerAvatar';
import AddToCartHandler from '~/components/common/product/AddToCartHandler';
import FavoriteButton from '~/components/common/product/FavoriteProductButton';
import ProductBadgeAvatarGroup from '~/components/common/product/ProductBadgeAvatarGroup';
import ProductBadges from '~/components/common/product/ProductBadges';
import ProductImage from '~/components/common/product/ProductImage';
import ProductNumber from '~/components/common/product/ProductNumber';
import ProductPrice from '~/components/common/product/ProductPrice';
import ProductRating from '~/components/common/product/ProductRating';
import ProductTag from '~/components/common/product/ProductTag';
import ProductTitle from '~/components/common/product/ProductTitle';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui-custom/MyCard';

interface ProductCardProps {
  id: string;
  title: string;
  link: string;
  number: string;
  priceNormal: number;
  priceNet: number;
  priceCrossed: number;
  imageSrc: string;
  hoverImageSrc: string;
  rating: number;
  reviews: number;
  manufacturer: {
    title: string;
    imageSrc: string;
    link: string;
  }[];
  isFavorite?: boolean;
  showCardFooter?: boolean;
  showProductRating?: boolean;
  productTags?: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({
  manufacturer,
  id,
  title,
  link,
  number,
  priceNormal,
  priceNet,
  priceCrossed,
  imageSrc,
  hoverImageSrc,
  rating,
  reviews,
  isFavorite,
  showCardFooter = true,
  showProductRating = false,
  productTags = [],
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Card
      className="flex h-full flex-col gap-4 shadow-none hover:border-primary/30 transition"
      id={id}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CardHeader className="relative p-0">
        <Link to={link} prefetch="intent">
          <ProductImage src={isHovering ? hoverImageSrc : imageSrc} />
        </Link>
        <FavoriteButton isFavorite={isFavorite} />
        <ProductBadgeAvatarGroup
          isNewArrival={false}
          isFreeShipping={false}
          hasSpecialPrice={false}
        />
      </CardHeader>
      <CardContent
        className={`flex flex-grow flex-col gap-4 ${
          showCardFooter ? 'pb-0' : ''
        }`}
      >
        {manufacturer.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <ManufacturerAvatar manufacturer={manufacturer[0]} />
            <ProductNumber number={number} />
          </div>
        )}
        <div className="flex flex-col gap-1">
          {/* <ProductAvailability /> */}
          <Link to={link} prefetch="intent">
            <CardTitle className="text-base">
              <ProductTitle title={title} />
            </CardTitle>
          </Link>
          {showProductRating && (
            <ProductRating rating={rating} totalReviews={reviews} />
          )}
        </div>
        <ProductBadges
          isNewArrival={false}
          isFavorite={isFavorite}
          inCartCount={0}
          isFreeShipping={false}
          hasSpecialPrice={false}
        />
        <ProductPrice
          priceNormal={priceNormal}
          priceNet={priceNet}
          priceCrossed={priceCrossed}
        />
        <div>
          {productTags.map((tag, index) => (
            <ProductTag key={index}>{tag}</ProductTag>
          ))}
        </div>
      </CardContent>
      {showCardFooter && (
        <CardFooter className="flex flex-col gap-2 pt-0">
          <AddToCartHandler
            productId={id}
            className="w-full"
            addToCartButtonSize="h-10 text-sm w-full"
            stepperButtonSize="h-9 w-9"
            iconSize="h-4 w-4"
            inputSize="h-10"
          />
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductCard;
