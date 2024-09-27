

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui-custom/MyCard";
import Link from "next/link";
import ReviewTitle from "~/components/common/review/ReviewTitle";
import TextRating from "~/components/common/review/TextRating";
import ProductImage from "~/components/common/product/ProductImage";
import StarRating from "~/components/common/review/StarRating";

interface ProductReviewCardProps {
  id: string;
  title: string;
  imageSrc: string;
  rating: number;
  textRating: string;
}

const ProductReviewCard: React.FC<ProductReviewCardProps> = ({
  id,
  title,
  imageSrc,
  rating,
  textRating,
}) => {
  return (
    <Card
      className='flex h-full flex-col gap-4 border shadow-none hover:border-primary/30 p-4'
      id={id}
    >
      <CardHeader className='relative p-0'>
        <ProductImage src={imageSrc} />
      </CardHeader>
      <CardContent className='flex flex-grow flex-col gap-2 p-0'>
        <div>
          <CardTitle className='text-center text-base'>
            <ReviewTitle title={title} />
          </CardTitle>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <StarRating rating={rating} />
          <TextRating textRating={textRating} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductReviewCard;
