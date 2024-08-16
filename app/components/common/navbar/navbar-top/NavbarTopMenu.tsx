

import NavbarTopMenuList from "./NavbarTopMenuList";
import NavbarTopMenuListItem from "./NavbarTopMenuListItem";

interface NavbarTopMenuProps {
  navbarTopMenus: {
    items: string[];
  }[];
}

const NavbarTopMenu: React.FC<NavbarTopMenuProps> = ({ navbarTopMenus }) => {
  return (
    <>
      {navbarTopMenus.map((navbarTopMenu, navbarTopMenuIndex) => (
        <nav key={`nav-${navbarTopMenuIndex}`}>
          <NavbarTopMenuList>
            {navbarTopMenu.items.map((item, navbarTopMenuItemIndex) => (
              <NavbarTopMenuListItem
                key={`item-${navbarTopMenuIndex}-${navbarTopMenuItemIndex}`}
              >
                {item}
              </NavbarTopMenuListItem>
            ))}
          </NavbarTopMenuList>
        </nav>
      ))}
    </>
  );
};

export default NavbarTopMenu;
