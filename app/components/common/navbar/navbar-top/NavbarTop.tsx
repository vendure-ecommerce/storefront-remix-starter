

import NavbarTopMenu from "./NavbarTopMenu";

const NavbarTop: React.FC = () => {
  const NavbarTopMenu1Data = {
    items: ["Link 1", "Link 2", "Link 3"],
  };

  const NavbarTopMenu2Data = {
    items: ["Link A", "Link B", "Link C"],
  };

  return (
    <div className='flex justify-between gap-4'>
      <NavbarTopMenu navbarTopMenus={[NavbarTopMenu1Data]} />
      <NavbarTopMenu navbarTopMenus={[NavbarTopMenu2Data]} />
    </div>
  );
};

export default NavbarTop;
