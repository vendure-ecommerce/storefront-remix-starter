

import { useViewportWidth } from "~/utils/use-viewport-width";
import CartButton from "../button/CartButton";
import CompareProductsButton from "../button/CompareProductsButton";
import FavoriteProductButton from "../button/FavoriteProductsButton";
import FilterButton from "../button/FilterButton";
import MenuButton from "../button/MenuButton";
import OrderButton from "../button/OrderButton";
import MobileMenuList from "./MobileMenuList";
import MobileMenuListItem from "./MobileMenuListItem";

interface MobileMenuProps {
  showMenuButton?: boolean;
  showOrderButton?: boolean;
  showFilterButton?: boolean;
  showFavoriteProductButton?: boolean;
  showCompareProductsButton?: boolean;
  showCartButton?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  showMenuButton = true,
  showOrderButton = true,
  showFilterButton = true,
  showFavoriteProductButton = true,
  showCompareProductsButton = true,
  showCartButton = true,
}) => {
  const width = useViewportWidth();
  const isMobile = width < 1024;

  return (
    <>
      {isMobile ? (
        <div className='sticky bottom-0 border-t bg-white'>
          <MobileMenuList>
            <MobileMenuListItem>
              {/*showMenuButton && <MenuButton />*/}
              {showOrderButton && <OrderButton />}
              {showFilterButton && <FilterButton />}
              {showFavoriteProductButton && <FavoriteProductButton />}
              {showCompareProductsButton && <CompareProductsButton />}
              {showCartButton && <CartButton />}
            </MobileMenuListItem>
          </MobileMenuList>
        </div>
      ) : null}
    </>
  );
};

export default MobileMenu;
