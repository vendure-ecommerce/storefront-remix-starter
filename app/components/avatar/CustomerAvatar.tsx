import { Link } from '@remix-run/react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

interface CustomerAvatarProps {
  className?: string;
  customer: {
    title: string;
    imageSrc: string;
    link: string;
  };
  showTitle?: boolean;
}

const CustomerAvatar: React.FC<CustomerAvatarProps> = ({
  className,
  customer,
  showTitle = true,
}) => {
  const { title, imageSrc, link } = customer;

  return (
    <Link
      className={`flex items-center gap-2${className ? ` ${className}` : ''}`}
      preventScrollReset
      to={link}
      prefetch="intent"
    >
      <Avatar className="ring-[1px] ring-border">
        <AvatarImage src={imageSrc} alt={title} width={80} height={80} />
        <AvatarFallback>{title.charAt(0)}</AvatarFallback>
      </Avatar>
      {showTitle && (
        <div
          className={`line-clamp-2 font-semibold tracking-tight text-sm${
            className ? ` ${className}` : ''
          }`}
        >
          {title}
        </div>
      )}
    </Link>
  );
};

export default CustomerAvatar;
