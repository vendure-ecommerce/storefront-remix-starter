interface ProductGalleryProps {
  className?: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ className }) => {
  return (
    <div
      className={`grid grid-cols-4 lg:grid-cols-2 gap-4${className ? ` ${className}` : ""}`}
    >
      {[...Array(4)].map((_, index) => (
        <div
          className='flex items-center rounded-lg bg-primary/5 p-2'
          key={index}
        >
          <img
            className={`aspect-square object-contain object-center`}
            src='https://sanitech.hu/image/cache/catalog/termek/pad-6261444_arcadia-rozsdamentes-acel-szervizkanal/arcadia-rozsdamentes-acel-szervizkanal-1-83x383.webp'
            width={360}
            height={360}
            alt='alt'
            loading='eager'
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGallery;
