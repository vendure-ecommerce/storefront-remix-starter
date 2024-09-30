interface ArticleDescriptionProps {
  className?: string;
  description?: string;
}

const ArticleDescription: React.FC<ArticleDescriptionProps> = ({
  className,
  description,
}) => {
  return (
    <p
      className={`line-clamp-3 text-sm text-color-tertiary${className ? ` ${className}` : ""}`}
    >
      {description}
    </p>
  );
};

export default ArticleDescription;
