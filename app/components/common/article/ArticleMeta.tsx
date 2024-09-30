

interface ArticleMetaProps {
  className?: string;
  date: string;
}

const ArticleMeta: React.FC<ArticleMetaProps> = ({ className, date }) => {
  return (
    <div
      className={`text-sm text-color-tertiary ${className ? ` ${className}` : ""}`}
    >
      {date}
    </div>
  );
};

export default ArticleMeta;
