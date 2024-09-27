

import AccountDropdown from "./navbar-middle/AccountDropdown";
import NavbarSearchField from "./navbar-middle/NavbarSearchField";
import Logo from "../Logo";

const NavbarCheckoutMobile = () => {
  return (
    <header className={`sticky top-0 z-50 col-span-2 bg-white`}>
      <div className='mx-auto flex max-w-screen-2xl flex-col gap-3 p-3'>
        <div className='flex items-center justify-between gap-x-3'>
          <Logo />
          <AccountDropdown />
        </div>
        <div className=''>
          <NavbarSearchField />
        </div>
      </div>
    </header>
  );
};

export default NavbarCheckoutMobile;
