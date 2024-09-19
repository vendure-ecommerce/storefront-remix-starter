

interface MobileMenuListProps {
  children: React.ReactNode;
}

const MobileMenuList: React.FC<MobileMenuListProps> = ({ children }) => {
  return <nav className='flex w-full py-4'>{children}</nav>;
};

export default MobileMenuList;
