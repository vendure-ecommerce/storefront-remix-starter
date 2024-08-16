

interface ReviewTitleProps {
  className?: string;
  title: string;
}

const ReviewTitle: React.FC<ReviewTitleProps> = ({ className, title }) => {
  return (
    <div className={`tracking-tight${className ? ` ${className}` : ""}`}>
      {title}
    </div>
  );
};

export default ReviewTitle;
