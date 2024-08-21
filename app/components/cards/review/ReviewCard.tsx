import CustomerAvatar from '~/components/avatar/CustomerAvatar';
import ReviewDate from '~/components/common/review/ReviewDate';
import ReviewDescription from '~/components/common/review/ReviewDescription';
import ReviewTitle from '~/components/common/review/ReviewTitle';
import StarRating from '~/components/common/review/StarRating';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/components/ui-custom/MyCard';

interface ReviewCardProps {
  id: string;
  // title?: string;
  // imageSrc?: string;
  date: string;
  rating: number;
  customer: {
    title: string;
    imageSrc: string;
    link: string;
  }[];
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  id,
  // title,
  // imageSrc,
  customer,
  date,
  rating,
}) => {
  return (
    <Card
      className="flex h-full gap-4 shadow-none hover:border-primary/30 transition p-4"
      id={id}
    >
      <CardHeader className="relative p-0">
        <CustomerAvatar customer={customer[0]} showTitle={false} />
      </CardHeader>
      <CardContent className="flex flex-grow flex-col gap-2 p-0">
        <div>
          <CardTitle className="text-base">
            <ReviewTitle title={customer[0].title} />
          </CardTitle>
          <ReviewDate className="text-sm" date={date} />
        </div>
        <div className="flex flex-col gap-4">
          <StarRating rating={rating} />
          <ReviewDescription />
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
