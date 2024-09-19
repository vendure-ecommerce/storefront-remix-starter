interface ProductImageProps {
  className?: string;
  src: string;
}

const ProductImage: React.FC<ProductImageProps> = ({
  className = "w-full",
  src,
}) => {
  return (
    <img
      className={`aspect-square object-contain p-2 object-center${className ? ` ${className}` : ""}`}
      src={src}
      alt='Kép'
      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      style={{
        width: "100%",
        height: "auto",
      }}
      width={500}
      height={500}
      loading='eager'
    />
  );
};

export default ProductImage;
