

import NavbarSearch from "./navbar-middle/NavbarSearch";
import Logo from "../Logo";
import AccountButton from "../button/AccountButton";

const NavbarMobile = () => {
  return (
    <header className={`sticky top-0 z-50 col-span-2 border-b bg-white`}>
      <div className='mx-auto flex max-w-screen-2xl flex-col gap-3 px-6 py-3'>
        <div className='flex items-center justify-between gap-x-3'>
          <Logo />
          <AccountButton />
        </div>
        <div className=''>
          <NavbarSearch />
        </div>
      </div>
    </header>
  );
};

export default NavbarMobile;
