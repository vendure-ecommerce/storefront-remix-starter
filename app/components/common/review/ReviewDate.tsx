

interface ReviewDateProps {
  className?: string;
  date: string;
}

const ReviewDate: React.FC<ReviewDateProps> = ({ className, date }) => {
  return (
    <div
      className={`text-sm font-normal text-color-tertiary tracking-tight${className ? ` ${className}` : ""}`}
    >
      {date}
    </div>
  );
};

export default ReviewDate;
