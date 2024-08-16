

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui-custom/MyCard";

interface HeroCardProps {
  className?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  imageSrc?: string;
  link?: string;
  showTitle?: boolean;
  showSubTitle?: boolean;
  showDescription?: boolean;
  showImage?: boolean;
}

const HeroCard: React.FC<HeroCardProps> = ({
  className,
  title = "Címsor",
  subTitle = "Alcím",
  description = "Leírás",
  imageSrc = "/category.png",
  link = "#",
  showTitle = true,
  showSubTitle = false,
  showDescription = true,
  showImage = true,
}) => {
  return (
    <a className={`h-full${className ? ` ${className}` : ""}`} href={link}>
      <Card className='group/hero-card relative flex h-full min-h-[11rem] items-center gap-4 overflow-hidden rounded-lg border shadow-none hover:border-primary/30 transition'>
        {showImage && (
          <div className='relative h-full w-full bg-muted'>
            <img
              className='object-cover object-right group-hover/hero-card:scale-105 transition'
              src={imageSrc + '?w=1200&h=1200&fit=fill'}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              loading='eager'
              alt='Háttérkép'
            />
          </div>
        )}
        <div className='absolute inset-x-4 bottom-4 rounded-md bg-white/80 backdrop-blur-lg'>
          <CardHeader className='py-2'>
            {showTitle && <CardTitle className='text-lg'>{title}</CardTitle>}
            {showSubTitle && <CardDescription>{subTitle}</CardDescription>}
          </CardHeader>
          {showDescription && (
            <CardContent className='pb-3'>
              <p className='text-sm text-color-tertiary'>{description}</p>
            </CardContent>
          )}
        </div>
      </Card>
    </a>
  );
};

export default HeroCard;
