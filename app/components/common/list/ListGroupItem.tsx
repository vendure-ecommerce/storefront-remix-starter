import { fakerHU as faker } from '@faker-js/faker';
import { Link } from '@remix-run/react';
import { ChevronRight, X } from 'lucide-react';
import { Badge } from '~/components/ui-custom/MyBadge';

interface ListGroupItemProps {
  className?: string;
  title: string;
  link: string;
  badge?: number;
  showTitle?: boolean;
  imageSrc?: string;
  showImage?: boolean;
  imageClassName?: string;
  showLeadingIcon?: boolean;
  showTrailingIcon?: boolean;
  showBadge?: boolean;
  isLinkActive?: boolean;
  onClick?: () => void;
}

const ListGroupItem: React.FC<ListGroupItemProps> = ({
  className,
  title,
  showTitle = true,
  link,
  badge,
  imageSrc,
  showImage = true,
  imageClassName = '',
  showLeadingIcon = false,
  showTrailingIcon = false,
  showBadge = false,
  isLinkActive = true,
  onClick,
}) => {
  const content = (
    <>
      {showLeadingIcon && <X className="h-5 w-5" />}
      {showImage && imageSrc ? (
        <img
          className={`${imageClassName}`}
          src={imageSrc}
          width={60}
          height={60}
          alt="Kategóriakép"
        />
      ) : showImage ? (
        <img
          className={`${imageClassName}`}
          src={faker.image.url()}
          width={60}
          height={60}
          alt="Kategóriakép"
        />
      ) : null}
      <span
        className={`text-left line-clamp-2 text-sm font-medium${
          !showTitle ? 'sr-only' : ''
        }`}
      >
        {title}
      </span>
      {showTrailingIcon && (
        <div className="ml-auto">
          <ChevronRight className="h-5 w-5" />
        </div>
      )}
      {showBadge && <Badge className="ml-auto">{badge}</Badge>}
    </>
  );

  return (
    <div className={`mx-3`}>
      {isLinkActive ? (
        <Link
          onClick={onClick}
          prefetch="intent"
          preventScrollReset
          to={link}
          className={`flex h-14 w-full cursor-pointer items-center rounded-md hover:bg-primary/5 transition gap-4${
            className ? ` ${className}` : ''
          }`}
        >
          {content}
        </Link>
      ) : (
        <div
          onClick={onClick}
          className={`flex h-14 w-full cursor-pointer items-center rounded-md hover:bg-primary/5 transition gap-4${
            className ? ` ${className}` : ''
          }`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default ListGroupItem;
