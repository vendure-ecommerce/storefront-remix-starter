import { Link } from '@remix-run/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui-custom/MyCard';
import { htmlDecode } from '~/utils/html-decode';

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
  style: any;
}

const HeroCard: React.FC<HeroCardProps> = ({
  className,
  title = 'Címsor',
  subTitle = 'Alcím',
  description = 'Leírás',
  imageSrc = '/category.png',
  link = '#',
  showTitle = true,
  showSubTitle = false,
  showDescription = true,
  showImage = true,
  style = {},
}) => {
  const decoded = htmlDecode(description);

  return (
    <Link
      prefetch="intent"
      className={`h-full${className ? ` ${className}` : ''}`}
      preventScrollReset
      to={link}
      style={style}
    >
      <Card className="group/hero-card relative flex h-full min-h-[11rem] items-center gap-4 overflow-hidden rounded-lg border shadow-none hover:border-primary/30 transition">
        {showImage && (
          <div className="relative h-full w-full bg-muted">
            <img
              className="object-cover object-right group-hover/hero-card:scale-105 transition"
              src={imageSrc + '?w=1200&h=1200&fit=fill'}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="eager"
              alt="Háttérkép"
            />
          </div>
        )}
        {/* bottom-4 ?? */}
        <div className="absolute inset-x-4 bottom-2 rounded-md bg-white/80 backdrop-blur-lg">
          <CardHeader className="py-2">
            {showTitle && <CardTitle className="text-lg">{title}</CardTitle>}
            {showSubTitle && <CardDescription>{subTitle}</CardDescription>}
          </CardHeader>
          {showDescription && (
            <CardContent className="pb-3" style={{ overflow: 'hidden' }}>
              <div
                className="text-sm text-color-tertiary line-clamp-2 overflow-hidden max-w-fit"
                dangerouslySetInnerHTML={{ __html: decoded }}
              />
            </CardContent>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default HeroCard;
