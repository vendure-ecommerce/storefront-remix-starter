

import NavbarCheckoutMobile from "./NavbarCheckoutMobile";
import NavbarCheckoutDesktop from "./NavbarCheckoutDesktop";
import { useViewportWidth } from "~/utils/use-viewport-width";

const NavbarCheckout: React.FC = () => {
  const width = useViewportWidth();
  const isMobile = width < 1024;

  return <>{isMobile ? <NavbarCheckoutMobile /> : <NavbarCheckoutDesktop />}</>;
};

export default NavbarCheckout;
