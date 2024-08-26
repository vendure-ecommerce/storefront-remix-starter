import { Badge } from '~/components/ui-custom/MyBadge';

interface ProductTagProps {
  className?: string;
  children: React.ReactNode;
}

const ProductTag: React.FC<ProductTagProps> = ({ className, children }) => {
  return (
    <Badge
      className={`rounded-full mr-2 mb-2 ${className ? ` ${className}` : ''}`}
      variant={'outline'}
    >
      {children}
    </Badge>
  );
};

export default ProductTag;
