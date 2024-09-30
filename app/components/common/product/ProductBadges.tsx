

import { FC } from "react";
import { Badge } from "~/components/ui-custom/MyBadge";

interface ProductBadgesProps {
  isNewArrival?: boolean;
  isFavorite?: boolean;
  inCartCount: number;
  isFreeShipping?: boolean;
  hasSpecialPrice?: boolean;
}

const ProductBadges: FC<ProductBadgesProps> = ({
  isNewArrival,
  isFavorite,
  inCartCount,
  isFreeShipping,
  hasSpecialPrice,
}) => {
  const showProductBadgesGroup =
    isNewArrival ||
    isFavorite ||
    inCartCount ||
    isFreeShipping ||
    hasSpecialPrice;

  return (
    <>
      {showProductBadgesGroup && (
        <div className='flex flex-wrap gap-1'>
          {isNewArrival && <Badge variant={"newArrival"}>Újdonság</Badge>}
          {isFavorite && <Badge variant={"isFavorite"}>Kedvenc</Badge>}
          {inCartCount > 0 && (
            <Badge variant={"inCart"}>Kosárban {inCartCount} db</Badge>
          )}
          {isFreeShipping && (
            <Badge variant={"freeShipping"}>Ingyenes szállítás</Badge>
          )}
          {hasSpecialPrice && (
            <Badge variant={"hasSpecialPrice"}>-100.000 Ft kedvezmény</Badge>
          )}
        </div>
      )}
    </>
  );
};

export default ProductBadges;
