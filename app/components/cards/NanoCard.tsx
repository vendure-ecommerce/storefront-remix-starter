

import { Card, CardTitle } from "~/components/ui-custom/MyCard";

interface NanoCardProps {
  className?: string;
  title?: string;
  imageSrc?: string;
  link?: string;
  showTitle?: boolean;
  showImage?: boolean;
}

const NanoCard: React.FC<NanoCardProps> = ({
  className,
  title = "Címsor",
  imageSrc = "https://sanitech.hu/image/cache/catalog/termek/pad-6261444_arcadia-rozsdamentes-acel-szervizkanal/arcadia-rozsdamentes-acel-szervizkanal-1-83x383.webp",
  link = "#",
  showTitle = true,
  showImage = true,
}) => {
  return (
    <a href={link}>
      <Card className='flex items-center border shadow-none hover:bg-primary/5 transition'>
        {showImage && (
          <div className='rounded-lg bg-muted flex-none overflow-hidden'>
            <img
              className={`aspect-square object-contain object-center ${className ? ` ${className}` : ""}`}
              src={imageSrc}
              width={60}
              height={60}
              alt='Kategóriakép'
            />
          </div>
        )}
        {showTitle && <CardTitle className='text-base px-4'>{title}</CardTitle>}
      </Card>
    </a>
  );
};

export default NanoCard;
