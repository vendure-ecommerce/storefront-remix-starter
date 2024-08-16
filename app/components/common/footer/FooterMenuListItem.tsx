'use client';

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
        <a
          href="/content"
          className="flex h-9 items-center justify-center !px-0 hover:underline"
        >
          <data value={''}>{children}</data>
        </a>
      </Button>
    </li>
  );
};

export default FooterMenuListItem;
