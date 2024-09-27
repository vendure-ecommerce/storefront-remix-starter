

interface ArticleTitleProps {
  className?: string;
  title: string;
}

const ArticleTitle: React.FC<ArticleTitleProps> = ({ className, title }) => {
  return (
    <div className={`tracking-tight${className ? ` ${className}` : ""}`}>
      {title}
    </div>
  );
};

export default ArticleTitle;
