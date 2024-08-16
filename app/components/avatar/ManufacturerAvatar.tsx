import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import ManufacturerTitle from '../common/manufacturer/ManufacturerTitle';

interface ManufacturerAvatarProps {
  className?: string;
  manufacturer: {
    title: string;
    imageSrc: string;
    link: string;
  };
}

const ManufacturerAvatar: React.FC<ManufacturerAvatarProps> = ({
  className,
  manufacturer,
}) => {
  const { title, imageSrc, link } = manufacturer;

  return (
    <a
      className={`flex items-center gap-2${className ? ` ${className}` : ''}`}
      href={link}
    >
      <Avatar className="ring-[1px] ring-border">
        <AvatarImage src={imageSrc} alt={title} width={80} height={80} />
        <AvatarFallback>{title.charAt(0)}</AvatarFallback>
      </Avatar>
      <ManufacturerTitle title={title} />
    </a>
  );
};

export default ManufacturerAvatar;
