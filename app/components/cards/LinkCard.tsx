

import { Card } from "~/components/ui-custom/MyCard";
import Link from "next/link";

interface LinkCardProps {
  title?: string;
  link?: string;
}

const LinkCard: React.FC<LinkCardProps> = ({
  title = "Címsor",
  link = "#",
}) => {
  return (
    <Link href={link}>
      <Card className='group/card flex h-full items-center justify-center gap-4 border p-6 text-center shadow-none hover:border-primary/30 transition'>
        <div className='text-color-tertiary group-hover/card:text-color-primary transition'>
          {title}
        </div>
      </Card>
    </Link>
  );
};

export default LinkCard;
