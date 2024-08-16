import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

interface AuthorAvatarProps {
  className?: string;
  author: {
    title: string;
    imageSrc: string;
    link: string;
  };
}

const AuthorAvatar: React.FC<AuthorAvatarProps> = ({ className, author }) => {
  const { title, imageSrc, link } = author;

  return (
    <a
      className={`flex items-center gap-2${className ? ` ${className}` : ''}`}
      href={link}
    >
      <Avatar className="ring-[1px] ring-border">
        <AvatarImage src={imageSrc} alt={title} width={80} height={80} />
        <AvatarFallback>{title.charAt(0)}</AvatarFallback>
      </Avatar>
      <div
        className={`line-clamp-2 font-semibold tracking-tight text-sm${
          className ? ` ${className}` : ''
        }`}
      >
        {title}
      </div>
    </a>
  );
};

export default AuthorAvatar;
