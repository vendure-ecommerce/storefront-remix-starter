'use client';

interface FooterMenuListProps {
  children: React.ReactNode;
}

const FooterMenuList: React.FC<FooterMenuListProps> = ({ children }) => {
  return (
    <nav>
      <menu>{children}</menu>
    </nav>
  );
};

export default FooterMenuList;
