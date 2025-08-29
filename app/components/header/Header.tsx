import { Link, useLoaderData } from '@remix-run/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { SearchBar } from '~/components/header/SearchBar';
import { useRootLoader } from '~/utils/use-root-loader';
import { UserIcon } from '@heroicons/react/24/solid';
import { useScrollingUp } from '~/utils/use-scrolling-up';
import { classNames } from '~/utils/class-names';
import { useTranslation } from 'react-i18next';

export function Header({
  onCartIconClick,
  cartQuantity,
}: {
  onCartIconClick: () => void;
  cartQuantity: number;
}) {
  const data = useRootLoader();
  const isSignedIn = !!data.activeCustomer.activeCustomer?.id;
  const isScrollingUp = useScrollingUp();
  const { t } = useTranslation();
  
  //posibles opciones de color  #14452F #03453D  #073830ee 
  
  return (
    <header
      className={classNames(
        isScrollingUp ? 'sticky top-0 z-10 animate-dropIn' : '',
        'bg-[#073830ee]',
      )}
    >
      <div className="max-w-6xl mx-auto p-4 flex items-center space-x-4">
        <h1 className="font-serif text-[#FFFFFF] text-[24px] w-10 text_x mr-14">
          <Link to="/">
            Folklor
          </Link>
        </h1>
        <div className="flex space-x-4 hidden sm:block">
          {data.collections.map((collection) => (
            <Link
              className="text-sm md:text-base text-gray-200 hover:text-white"
              to={'/collections/' + collection.slug}
              prefetch="intent"
              key={collection.id}
            >
              {collection.name}
            </Link>
          ))}
        </div>
        <div className="flex-1 md:pr-2">
          <SearchBar></SearchBar>
        </div>
        <div className="">
          <button
            className="relative w-9 h-9 rounded text-[#FFFFFF] p-1"
            onClick={onCartIconClick}
            aria-label="Open cart tray"
          >
            <ShoppingCartIcon></ShoppingCartIcon>
            {cartQuantity ? (
              <div className="absolute rounded-full -top-2 -right-2 bg-primary-600 min-w-6 min-h-6 flex items-center justify-center text-xs p-1">
                {cartQuantity}
              </div>
            ) : (
              ''
            )}
          </button>         
        </div>
        <div>
           <Link
            to={isSignedIn ? '/account' : '/sign-in'}
            className="flex space-x-1 text-[#FFF] hover:text-red" 
          >
            <UserIcon className="w-4 h-7"></UserIcon>
            <span>
              {isSignedIn ? t('account.myAccount') : t('account.signIn')}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
