import { Link, useLoaderData } from '@remix-run/react';
import { ExternalLinkIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import { SearchBar } from '~/components/header/SearchBar';
import { useRootLoader } from '~/utils/use-root-loader';
import { UserIcon } from '@heroicons/react/solid';
import { useScrollingUp } from '~/utils/use-scrolling-up';
import { classNames } from '~/utils/class-names';
import { ChannelSwitcher } from '../ChannelSwitch';

export function Header({
    onCartIconClick,
    cartQuantity,
    switchChannel,
}: {
    onCartIconClick: () => void;
    cartQuantity: number;
    switchChannel: (channel: string) => void;
}) {
    const data = useRootLoader();
    const isSignedIn = !!data.activeCustomer.activeCustomer?.id;
    const isScrollingUp = useScrollingUp();

    return (
        <header
            className={classNames(
                isScrollingUp ? 'sticky top-0 z-10 animate-dropIn' : '',
                'bg-gradient-to-r from-zinc-700 to-gray-900 shadow-lg transform shadow-xl',
            )}
        >
            <div className="bg-zinc-100 text-gray-600 shadow-inner text-center text-sm py-2 px-2 xl:px-0">
                <div className="max-w-7xl mx-2 md:mx-auto flex items-center justify-between">
                    <div>
                        <p className="hidden sm:block">
                            LIMITED OFFER: 10% discount on all {' '}
                            <a
                                href="https://github.com/vendure-ecommerce/storefront-remix-starter"
                                target="_blank"
                                className="underline"
                            >
                                MAX1000
                            </a>
                            {' '} Boards
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ChannelSwitcher switchChannel={switchChannel}/>
                        <Link
                            to={isSignedIn ? '/account' : '/sign-in'}
                            className="flex space-x-1"
                        >
                            <UserIcon className="w-4 h-4"></UserIcon>
                            <span>{isSignedIn ? 'My Account' : 'Sign In'}</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto p-4 flex items-center space-x-4">
                <h1 className="text-white w-10">
                    <Link to="/">
                        <img
                            src="/vhdp.svg"
                            width={40}
                            height={31}
                            alt="VHDPlus logo"
                        />
                    </Link>
                </h1>
                <h1 className='text-white font-bold text-lg'>
                    VHDPlus Shop
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
                    <a
                        className="text-sm md:text-base text-gray-200 hover:text-white"
                        href={'https://vhdplus.com'} target="blank"
                    >
                        <p className='inline-block'>Docs</p>
                        <ExternalLinkIcon className='h-4 inline-block ml-1 mb-1' />
                    </a>
                </div>
                <div className="flex-1 md:pr-3 md:pl-3">
                    <SearchBar></SearchBar>
                </div>
                <div className="">
                    <button
                        className="relative w-9 h-9 bg-white bg-opacity-20 rounded text-white p-1"
                        onClick={onCartIconClick}
                        aria-label="Open cart tray"
                    >
                        <ShoppingBagIcon></ShoppingBagIcon>
                        {cartQuantity ? (
                            <div className="absolute rounded-full -top-2 -right-2 bg-primary-600 w-6 h-6">
                                {cartQuantity}
                            </div>
                        ) : (
                            ''
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
