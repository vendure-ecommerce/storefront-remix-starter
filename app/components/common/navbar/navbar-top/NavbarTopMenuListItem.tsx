

import { Button } from "~/components/ui-custom/MyButton";
import Link from "next/link";

interface NavbarTopMenuListItemProps {
  children: React.ReactNode;
}

const NavbarTopMenuListItem: React.FC<NavbarTopMenuListItemProps> = ({
  children,
}) => {
  return (
    <li>
      <Button variant={"link"} asChild>
        <Link
          href='/'
          className='flex h-9 items-center justify-center !px-0 !text-color-tertiary hover:underline'
        >
          <data value={""}>{children}</data>
        </Link>
      </Button>
    </li>
  );
};

export default NavbarTopMenuListItem;
