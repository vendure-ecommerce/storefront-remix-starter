

import { FC } from "react";
import StarRating from "../review/StarRating";

interface ProductReviewProps {
  rating: number;
  totalReviews: number;
}

const ProductReview: FC<ProductReviewProps> = ({ rating, totalReviews }) => {
  return (
    <div className='flex flex-wrap items-center gap-1'>
      <StarRating rating={rating}></StarRating>
      <div className='text-sm font-semibold text-color-star-rating'>
        {rating}
      </div>
      <div className='text-sm text-color-tertiary'>
        ({totalReviews} értékelés)
      </div>
    </div>
  );
};

export default ProductReview;
