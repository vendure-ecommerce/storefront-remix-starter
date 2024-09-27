

import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

interface ProductBadgeAvatarGroupProps {
  isNewArrival: boolean;
  isFreeShipping: boolean;
  hasSpecialPrice: boolean;
}

const ProductBadgeAvatarGroup: FC<ProductBadgeAvatarGroupProps> = ({
  isNewArrival,
  isFreeShipping,
  hasSpecialPrice,
}) => {
  const showProductBadgeAvatarGroup =
    isNewArrival || isFreeShipping || hasSpecialPrice;

  return (
    <>
      {showProductBadgeAvatarGroup && (
        <div className='absolute left-0 top-0'>
          <div className='-space-y-2'>
            {isNewArrival && (
              <Avatar className='ring-2 ring-white'>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
            {isFreeShipping && (
              <Avatar className='ring-2 ring-white'>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
            {hasSpecialPrice && (
              <Avatar className='ring-2 ring-white'>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductBadgeAvatarGroup;
