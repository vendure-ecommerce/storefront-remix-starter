interface ReviewImageProps {
  className?: string;
  src: string;
}

const ReviewImage: React.FC<ReviewImageProps> = ({
  className = "w-full",
  src,
}) => {
  return (
    <div className='rounded-lg bg-muted'>
      <img
        className={`aspect-square object-contain object-center${className ? ` ${className}` : ""}`}
        src={src}
        width={800}
        height={800}
        alt='Kép'
        loading='lazy'
      />
    </div>
  );
};

export default ReviewImage;
