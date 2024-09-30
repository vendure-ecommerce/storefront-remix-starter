

interface NavbarTopMenuListProps {
  children: React.ReactNode;
}

const NavbarTopMenuList: React.FC<NavbarTopMenuListProps> = ({ children }) => {
  return <menu className='flex gap-4'>{children}</menu>;
};

export default NavbarTopMenuList;
