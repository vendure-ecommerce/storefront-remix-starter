import Logo from '../../Logo';
import AccountButton from '../../button/AccountButton';
import CartButton from '../../button/CartButton';
import CompareProductsButton from '../../button/CompareProductsButton';
import FavoriteProductsButton from '../../button/FavoriteProductsButton';
import NavbarSearch from './NavbarSearch';

const NavbarMiddle = () => {
  return (
    <div className="grid grid-cols-4 h-[4.5rem] items-center gap-y-3">
      <div className="flex w-auto flex-none xl:w-80">
        <Logo />
      </div>
      <div className="flex-grow col-span-2">
        <NavbarSearch />
      </div>
      <div className="flex w-auto justify-end justify-self-end gap-2 xl:w-80">
        <AccountButton />
        <div className="flex gap-2">
          <FavoriteProductsButton />
          <CompareProductsButton />
          <CartButton />
        </div>
      </div>
    </div>
  );
};

export default NavbarMiddle;
