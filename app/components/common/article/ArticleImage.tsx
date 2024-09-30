interface ArticleImageProps {
  className?: string;
  src: string;
}

const ArticleImage: React.FC<ArticleImageProps> = ({
  className = "w-full",
  src,
}) => {
  return (
    <div className='rounded-lg bg-muted overflow-hidden'>
      <img
        className={`aspect-square object-contain object-center group-hover/card:scale-110 transition${className ? ` ${className}` : ""}`}
        src={src}
        width={800}
        height={800}
        alt='Kép'
        loading='lazy'
      />
    </div>
  );
};

export default ArticleImage;
