

import NavbarMobile from "./NavbarMobile";
import NavbarDesktop from "./NavbarDesktop";
import { useViewportWidth } from "~/utils/use-viewport-width";

const Navbar: React.FC = () => {
  const width = useViewportWidth();
  const isMobile = width < 1024;

  return <>{isMobile ? <NavbarMobile /> : <NavbarDesktop />}</>;
};

export default Navbar;
