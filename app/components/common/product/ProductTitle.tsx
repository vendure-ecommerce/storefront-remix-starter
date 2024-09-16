

interface ProductTitleProps {
  className?: string;
  title: string;
}

const ProductTitle: React.FC<ProductTitleProps> = ({ className, title }) => {
  return <>{title}</>;
};

export default ProductTitle;
