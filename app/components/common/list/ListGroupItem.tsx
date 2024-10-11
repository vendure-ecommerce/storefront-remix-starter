import { fakerHU as faker } from '@faker-js/faker';
import { Link, useFetcher } from '@remix-run/react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
  submitFetcher?: () => void;
  isChevronOpen?: boolean;
}

export const ListGroupItemWithChildren: React.FC<
  ListGroupItemProps & {
    id: string;
    indent: number;
  }
> = (params) => {
  const fetcher = useFetcher<{
    result: { items: any[] };
  }>();
  const [stChildren, setChildren] = useState<any[]>([]);
  const isFetched = useRef<boolean>(false);

  const [stIsOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isFetched.current && fetcher.data) {
      isFetched.current = true;
      setChildren(fetcher.data?.result?.items);
      setIsOpen(true);
    }
  }, [fetcher]);

  return (
    <div className={`pl-[${params.indent}rem] select-none`}>
      <ListGroupItem
        {...params}
        isChevronOpen={stIsOpen}
        submitFetcher={() => {
          if (!isFetched.current) {
            fetcher.submit(
              { id: params.id },
              { action: '/api/collection-children', method: 'get' },
            );
          } else {
            setIsOpen((prev) => !prev);
          }
        }}
      />
      {stIsOpen &&
        stChildren?.map((item) => (
          <ListGroupItemWithChildren
            key={item.id}
            indent={3}
            id={item.id}
            title={item.name}
            isLinkActive={params.isLinkActive}
            link={`/collections/${item.slug}`}
            onClick={params.onClick}
            imageClassName={params.imageClassName}
            imageSrc={item.featuredAsset?.preview}
            showImage={params.showImage}
            showTitle={params.showTitle}
            showTrailingIcon={params.showTrailingIcon}
            className={params.className}
          />
        ))}
    </div>
  );
};

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
  submitFetcher,
  isChevronOpen = false,
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

      {showBadge && <Badge className="ml-auto">{badge}</Badge>}
    </>
  );

  return (
    <div
      className={`mx-3 flex items-center ${className ? ` ${className}` : ''}`}
    >
      {isLinkActive ? (
        <Link
          onClick={onClick}
          prefetch="intent"
          preventScrollReset
          to={link}
          className={`flex h-14 w-full items-center rounded-md hover:bg-primary/5 transition gap-4`}
        >
          {content}
        </Link>
      ) : (
        <div
          onClick={onClick}
          className={`flex h-14 w-full cursor-pointer items-center rounded-md hover:bg-primary/5 transition gap-4`}
        >
          {content}
        </div>
      )}
      {showTrailingIcon && (
        <div
          className="ml-auto hover:bg-primary/5 transition rounded-md cursor-pointer"
          onClick={(e) => {
            submitFetcher && submitFetcher();
          }}
        >
          {isChevronOpen ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </div>
      )}
    </div>
  );
};

export default ListGroupItem;
