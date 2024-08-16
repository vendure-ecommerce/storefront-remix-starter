

import { Badge } from "~/components/ui-custom/MyBadge";

interface ArticleCategoryProps {
  className?: string;
  children: React.ReactNode;
}

const ArticleCategory: React.FC<ArticleCategoryProps> = ({
  className,
  children,
}) => {
  return (
    <Badge
      className={`rounded-full${className ? ` ${className}` : ""}`}
      variant={"outline"}
    >
      {children}
    </Badge>
  );
};

export default ArticleCategory;
