import NavbarMobile from './NavbarMobile';
import NavbarDesktop from './NavbarDesktop';
import { useViewportWidth } from '~/utils/use-viewport-width';

export interface INavbarProps {
  children?: React.ReactNode;
}

const Navbar: React.FC<INavbarProps> = ({}) => {
  const width = useViewportWidth();
  const isMobile = width < 1024;

  return isMobile ? <NavbarMobile /> : <NavbarDesktop />;
};

export default Navbar;
