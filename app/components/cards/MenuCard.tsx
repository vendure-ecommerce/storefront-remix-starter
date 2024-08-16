

import { Card, CardTitle } from "~/components/ui-custom/MyCard";
import Link from "next/link";
import React from "react";

interface MenuCardProps {
  className?: string;
  title?: string;
  icon?: React.ReactElement;
  link?: string;
  showTitle?: boolean;
  showIcon?: boolean;
}

interface IconWrapperProps {
  children: React.ReactElement;
}

const MenuCard: React.FC<MenuCardProps> = ({
  className,
  title = "Címsor",
  icon,
  link = "#",
  showTitle = true,
  showIcon = true,
}) => {
  const IconWrapper: React.FC<IconWrapperProps> = ({ children }) => (
    <>{React.cloneElement(children, { className: "h-14 w-14" })}</>
  );

  return (
    <Link href={link}>
      <Card className='flex flex-col items-center gap-4 border p-6 shadow-none transition hover:border-primary/30'>
        {showIcon && icon && <IconWrapper>{icon}</IconWrapper>}
        {showTitle && <CardTitle className='text-base'>{title}</CardTitle>}
      </Card>
    </Link>
  );
};

export default MenuCard;
