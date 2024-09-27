

import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className='relative'>
      <div className='flex gap-0.5 text-color-tertiary opacity-20'>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className='h-5 w-5'
            fill='currentColor'
            strokeWidth={0}
          />
        ))}
      </div>
      <div className='absolute top-0 flex gap-0.5 text-color-star-rating'>
        {Array.from({ length: fullStars }, (_, index) => (
          <Star
            key={index}
            className='h-5 w-5'
            fill='currentColor'
            strokeWidth={0}
          />
        ))}
        {hasHalfStar && (
          <StarHalf className='h-5 w-5' fill='currentColor' strokeWidth={0} />
        )}
      </div>
    </div>
  );
};

export default StarRating;
