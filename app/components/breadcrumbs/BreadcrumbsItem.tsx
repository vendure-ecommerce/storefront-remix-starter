

import { Button } from "~/components/ui-custom/MyButton";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import Link from "next/link";

interface BreadcrumbItemProps {
  className?: string;
  title: string;
  imageSrc: string;
  link: string;
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  className,
  title,
  imageSrc,
  link,
}) => {
  return (
    <Button
      className={`inline-flex h-9 items-center gap-2 py-1.5 pl-1 pr-4${className ? ` ${className}` : ""}`}
      variant={"outline"}
      asChild
    >
      <Link href={link}>
        <Avatar className='h-6 w-6 border'>
          <AvatarImage src={imageSrc} alt={title} width={80} height={80} />
          <AvatarFallback>{title.charAt(0)}</AvatarFallback>
        </Avatar>
        {title}
      </Link>
    </Button>
  );
};

export default BreadcrumbItem;
