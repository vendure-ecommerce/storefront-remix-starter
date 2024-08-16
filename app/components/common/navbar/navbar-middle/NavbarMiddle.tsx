

import Logo from "../../Logo";
import AccountButton from "../../button/AccountButton";
import CartButton from "../../button/CartButton";
import CompareProductsButton from "../../button/CompareProductsButton";
import FavoriteProductsButton from "../../button/FavoriteProductsButton";
import NavbarSearch from "./NavbarSearch";

const NavbarMiddle = () => {
  return (
    <div className='flex h-[4.5rem] items-center gap-x-[4.5rem] gap-y-3'>
      <div className='flex w-auto flex-none xl:w-80'>
        <Logo />
      </div>
      <div className='flex-grow'>
        <NavbarSearch />
      </div>
      <div className='flex w-auto justify-end gap-2 xl:w-80'>
        <AccountButton />
        <div className='flex gap-2'>
          <FavoriteProductsButton />
          <CompareProductsButton />
          <CartButton />
        </div>
      </div>
    </div>
  );
};

export default NavbarMiddle;
