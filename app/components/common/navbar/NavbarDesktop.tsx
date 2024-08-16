import NavbarBottom from "./navbar-bottom/NavbarBottom";
import NavbarMiddle from "./navbar-middle/NavbarMiddle";
import NavbarTop from "./navbar-top/NavbarTop";

interface NavbarDesktopProps {
  showNavbarTop?: boolean;
  showNavbarMiddle?: boolean;
  showNavbarBottom?: boolean;
}

const NavbarDesktop: React.FC<NavbarDesktopProps> = ({
  showNavbarTop = false,
  showNavbarMiddle = true,
  showNavbarBottom = true,
}) => {
  return (
    <header
      className={`sticky top-0 z-50 col-span-2 hidden border-b bg-white lg:block`}
    >
      <div className='mx-auto w-full max-w-screen-2xl px-6'>
        {showNavbarTop && <NavbarTop />}
        {showNavbarMiddle && <NavbarMiddle />}
        {showNavbarBottom && <NavbarBottom />}
      </div>
    </header>
  );
};

export default NavbarDesktop;
