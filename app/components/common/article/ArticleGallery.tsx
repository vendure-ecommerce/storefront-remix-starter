const ArticleGallery = () => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      {[...Array(4)].map((_, index) => (
        <div className='rounded-lg bg-muted' key={index}>
          <img
            className={`aspect-square object-contain object-center`}
            src='/category.png'
            width={360}
            height={360}
            alt='alt'
          />
        </div>
      ))}
    </div>
  );
};

export default ArticleGallery;
