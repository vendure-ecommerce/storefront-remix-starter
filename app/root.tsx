import { cssBundleHref } from '@remix-run/css-bundle';
import {
  isRouteErrorResponse,
  Link,
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  ShouldRevalidateFunction,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import {
  DataFunctionArgs,
  json,
  LinksFunction,
} from '@remix-run/server-runtime';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useChangeLanguage } from 'remix-i18next';
import { getI18NextServer } from '~/i18next.server';
import { activeChannel } from '~/providers/channel/channel';
import { getCollections } from '~/providers/collections/collections';
import { getActiveCustomer } from '~/providers/customer/customer';
import { useActiveOrder } from '~/utils/use-active-order';
import Footer from './components/common/footer/Footer';
import MobileMenu from './components/common/mobile/MobileMenu';
import Navbar from './components/common/navbar/Navbar';
import { CollectionsProvider } from './providers/collections';
import stylesheet from './tailwind.css';
import { IGlobalLayoutData } from './types/types';
import { cn } from './utils/cn';
import { OrderProvider } from './providers/orders';

// export const meta: MetaFunction = () => {
//   return [{ title: APP_META_TITLE }, { description: APP_META_DESCRIPTION }];
// };

export const meta: MetaFunction = () => {
  return [
    { title: 'Storefront eCommerce' },
    {
      property: 'og:title',
      content: 'Storefront eCommerce',
    },
    {
      name: 'description',
      content: 'Storefront eCommerce',
    },
  ];
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

const devMode =
  typeof process !== 'undefined' && process.env.NODE_ENV === 'development';

// The root data does not change once loaded.
export const shouldRevalidate: ShouldRevalidateFunction = ({
  nextUrl,
  currentUrl,
  formAction,
}) => {
  if (currentUrl.pathname === '/sign-in') {
    // just logged in
    return true;
  }
  if (currentUrl.pathname === '/account' && nextUrl.pathname === '/') {
    // just logged out
    return true;
  }
  if (formAction === '/checkout/payment') {
    // submitted payment for order
    return true;
  }
  return false;
};

export type RootLoaderData = {
  activeCustomer: Awaited<ReturnType<typeof getActiveCustomer>>;
  activeChannel: Awaited<ReturnType<typeof activeChannel>>;
  collections: Awaited<ReturnType<typeof getCollections>>;
  locale: string;
};

export async function loader({ request, params, context }: DataFunctionArgs) {
  const collections = await getCollections(request, { take: 20 });
  /* const topLevelCollections = collections.filter(
    (collection) => collection.parent?.name === '__root_collection__',
  ); */
  const activeCustomer = await getActiveCustomer({ request });
  const locale = await getI18NextServer().then((i18next) =>
    i18next.getLocale(request),
  );
  const loaderData: RootLoaderData = {
    activeCustomer,
    activeChannel: await activeChannel({ request }),
    collections,
    locale,
  };

  return json(loaderData, { headers: activeCustomer._headers });
}

export default function App() {
  const [open, setOpen] = useState(false);
  const loaderData = useLoaderData<RootLoaderData>();
  const { collections, locale } = loaderData;
  const { i18n } = useTranslation();
  const {
    activeOrderFetcher,
    activeOrder,
    adjustOrderLine,
    removeItem,
    refresh,
  } = useActiveOrder();

  useChangeLanguage(locale);

  const [stLayoutData, setLayoutData] = useState<IGlobalLayoutData>();
  useEffect(() => {
    // When the loader has run, this implies we should refresh the contents
    // of the activeOrder as the user may have signed in or out.
    refresh();

    setLayoutData({
      showFooterMenu: true,
      showFooterImage: true,
    });
  }, [loaderData]);

  return (
    <CollectionsProvider collections={collections || []}>
      <OrderProvider>
        <html lang={locale} dir={i18n.dir()} id="app" className="scroll-smooth">
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <link rel="icon" href="/favicon.ico" type="image/png"></link>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin={'anonymous'}
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
              rel="stylesheet"
            />

            <Meta />
            <Links />
          </head>
          <body
            className={cn(
              'flex min-h-screen flex-col bg-background font-sans antialiased',
            )}
          >
            <Navbar />
            <main className="">
              <Outlet
                context={{
                  activeOrderFetcher,
                  activeOrder,
                  adjustOrderLine,
                  removeItem,
                  setLayoutData,
                }}
              />
            </main>
            {/* <CartTray
              open={open}
              onClose={setOpen}
              activeOrder={activeOrder}
              adjustOrderLine={adjustOrderLine}
              removeItem={removeItem}
            /> */}
            <ScrollRestoration />
            <Scripts />
            <Footer
              showFooterImage={stLayoutData?.showFooterImage ?? true}
              showFooterMenu={stLayoutData?.showFooterMenu ?? true}
            />
            <MobileMenu
              showMenuButton={true}
              showOrderButton={false}
              showFilterButton={false}
              showFavoriteProductButton={false}
              showCompareProductsButton={false}
              showCartButton={true}
            />

            {devMode && <LiveReload />}
          </body>
        </html>
      </OrderProvider>
    </CollectionsProvider>
  );
}

type DefaultSparseErrorPageProps = {
  tagline: string;
  headline: string;
  description: string;
};

/**
 * You should replace this in your actual storefront to provide a better user experience.
 * You probably want to still show your footer and navigation. You will also need fallbacks
 * for your data dependant components in case your shop instance / CMS isnt responding.
 * See: https://remix.run/docs/en/main/route/error-boundary
 */
function DefaultSparseErrorPage({
  tagline,
  headline,
  description,
}: DefaultSparseErrorPageProps) {
  return (
    <html lang="en" id="app">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/favicon.ico" type="image/png"></link>
        <Meta />
        <Links />
      </head>
      <body>
        <main className="flex flex-col items-center px-4 py-16 sm:py-32 text-center">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {tagline}
          </span>
          <h1 className="mt-2 font-bold text-gray-900 tracking-tight text-4xl sm:text-5xl">
            {headline}
          </h1>
          <p className="mt-4 text-base text-gray-500 max-w-full break-words">
            {description}
          </p>
          <div className="mt-6">
            <Link
              preventScrollReset
              to="/"
              className="text-base font-medium text-primary-600 hover:text-primary-500 inline-flex gap-2"
            >
              Go back home
            </Link>
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
        {devMode && <LiveReload />}
      </body>
    </html>
  );
}

/**
 * As mentioned in the jsdoc for `DefaultSparseErrorPage` you should replace this to suit your needs.
 */
export function ErrorBoundary() {
  let tagline = 'Oopsy daisy';
  let headline = 'Unexpected error';
  let description = "We couldn't handle your request. Please try again later.";

  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    tagline = `${error.status} error`;
    headline = error.statusText;
    description = error.data;
  }

  return (
    <DefaultSparseErrorPage
      tagline={tagline}
      headline={headline}
      description={description}
    />
  );
}

/**
 * In Remix v2 there will only be a `ErrorBoundary`
 * As mentioned in the jsdoc for `DefaultSparseErrorPage` you should replace this to suit your needs.
 * Relevant for the future: https://remix.run/docs/en/main/route/error-boundary-v2
 */
export function CatchBoundary() {
  return ErrorBoundary();
}
