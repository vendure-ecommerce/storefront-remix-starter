

import Logo from "../Logo";

const NavbarCheckoutDesktop = () => {
  return (
    <header className={`sticky top-0 z-50 col-span-2 bg-white border-b`}>
      <div className='mx-auto flex h-[4.5rem] max-w-screen-2xl items-center px-6 py-[0.625rem]'>
        <Logo />
      </div>
    </header>
  );
};

export default NavbarCheckoutDesktop;
