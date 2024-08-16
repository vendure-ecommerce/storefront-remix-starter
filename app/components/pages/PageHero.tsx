import { useState } from 'react';
import { Button } from '~/components/ui-custom/MyButton';
import { Card } from '~/components/ui-custom/MyCard';

interface PageHeroProps {
  title?: string;
  description?: string;
  imageSrc?: string;
  showTitle?: boolean;
  showDescription?: boolean;
  showImage?: boolean;
}

const PageHero: React.FC<PageHeroProps> = ({
  title = 'Címsor',
  description = '',
  imageSrc = '/category.png',
  showTitle = true,
  showDescription = true,
  showImage = true,
}) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleFullText = () => {
    setShowFullText(!showFullText);
  };

  const truncatedText = showFullText
    ? description
    : `${description.slice(0, 150)}...`;

  return (
    <Card className="flex flex-col gap-4 border-none bg-transparent shadow-none md:flex-row md:items-center lg:flex-col lg:gap-0 xl:flex-row">
      {showImage && (
        <div className="flex-none self-start overflow-hidden rounded-lg bg-white">
          <img
            className="aspect-square object-contain object-center"
            src={imageSrc}
            width={280}
            height={280}
            alt="alt"
            loading="eager"
          />
        </div>
      )}
      {showTitle && showDescription && (
        <div
          className={`flex flex-col gap-4 px-0 ${
            showImage ? 'md:px-16 md:py-5 lg:px-0 xl:px-16 xl:py-5' : ''
          }`}
        >
          {showTitle && (
            <h1 className="text-5xl font-bold leading-tight">{title}</h1>
          )}
          {showDescription && (
            <div>
              <p className="text-base">{truncatedText}</p>
              {description.length > 150 && (
                <Button
                  variant={'link'}
                  className="p-0 font-bold"
                  onClick={toggleFullText}
                >
                  {showFullText ? 'Kevesebb' : 'Bővebben'}
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default PageHero;
