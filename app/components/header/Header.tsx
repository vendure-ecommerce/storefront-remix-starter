import { Link, useLoaderData } from '@remix-run/react';
import { ShoppingBagIcon } from '@heroicons/react/outline';
import { SearchBar } from '~/components/header/SearchBar';
import { useRootLoader } from '~/utils/use-root-loader';
import { UserIcon } from '@heroicons/react/solid';

export function Header({
    onCartIconClick,
    cartQuantity,
}: {
    onCartIconClick: () => void;
    cartQuantity: number;
}) {
    const data = useRootLoader();
    const isSignedIn = !!data.activeCustomer.activeCustomer?.id;
    console.log(`data.activeCustomer`, data.activeCustomer);
    return (
        <header className="bg-gradient-to-r from-zinc-700 to-gray-900 shadow-lg">
            <div className="bg-zinc-100 text-gray-600 shadow-inner text-center text-sm py-2">
                <div className="max-w-6xl mx-2 md:mx-auto flex items-center justify-between">
                    <div>
                        <p className="hidden sm:block">
                            Exclusive: Get your own FREE storefront starter kit{' '}
                            <a
                                href="https://github.com/vendure-ecommerce/storefront-remix-starter"
                                target="_blank"
                                className="underline"
                            >
                                here
                            </a>
                        </p>
                    </div>
                    <div>
                        <Link
                            to={isSignedIn ? '/account' : '/sign-in'}
                            className="flex space-x-1 items-center"
                        >
                            <UserIcon className="w-4 h-4"></UserIcon>
                            <span>{isSignedIn ? 'My Account' : 'Sign In'}</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto p-4 flex items-center space-x-4">
                <h1 className="text-white w-10">
                    <Link to="/">
                        <img
                            src="/cube-logo-line-icon-nostroke-white.png"
                            alt="Vendure logo"
                        />
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
                <div className="flex-1 md:pr-8">
                    <SearchBar></SearchBar>
                </div>
                <div className="">
                    <button
                        className="relative w-9 h-9 bg-white bg-opacity-20 rounded text-white p-1"
                        onClick={onCartIconClick}
                    >
                        <ShoppingBagIcon></ShoppingBagIcon>
                        {cartQuantity ? (
                            <div className="absolute rounded-full -top-2 -right-2 bg-blue-600 w-6 h-6">
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
