interface ProductGalleryProps {
  className?: string;
  images: { id: string; preview: string }[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ className, images }) => {
  return (
    <div
      className={`grid grid-cols-4 lg:grid-cols-2 gap-4${className ? ` ${className}` : ""}`}
    >
      {images.map((image, index) => (
        <div
          className='flex items-center rounded-lg bg-primary/5 p-2'
          key={index}
        >
          <img
            className={`aspect-square object-contain object-center`}
            src={image.preview}
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
