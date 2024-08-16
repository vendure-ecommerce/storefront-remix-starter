'use client';

import Link from 'next/link';
import { Button } from '@/components/ui-custom/MyButton';

interface FooterMenuListItemProps {
  children: React.ReactNode;
}

const FooterMenuListItem: React.FC<FooterMenuListItemProps> = ({
  children,
}) => {
  return (
    <li>
      <Button variant={'link'} asChild>
        <Link
          href="/content"
          className="flex h-9 items-center justify-center !px-0 hover:underline"
        >
          <data value={''}>{children}</data>
        </Link>
      </Button>
    </li>
  );
};

export default FooterMenuListItem;
