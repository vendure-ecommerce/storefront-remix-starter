import { Badge } from '~/components/ui-custom/MyBadge';

interface ProductTagProps {
  className?: string;
  children: React.ReactNode;
  truncate?: boolean;
}

const ProductTag: React.FC<ProductTagProps> = ({
  className,
  children,
  truncate,
}) => {
  return (
    <Badge
      className={`rounded-full mr-2 mb-2 ${className ? ` ${className}` : ''}`}
      variant={'outline'}
      truncate={truncate}
    >
      {children}
    </Badge>
  );
};

export default ProductTag;
