import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  ShouldReloadFunction,
  useLoaderData,
} from '@remix-run/react';
import styles from './styles/app.css';
import { Header } from './components/header/Header';
import {
  DataFunctionArgs,
  MetaFunction,
  json,
} from '@remix-run/server-runtime';
import { getCollections } from '~/providers/collections/collections';
import { activeChannel } from '~/providers/channel/channel';
import { APP_META_DESCRIPTION, APP_META_TITLE } from '~/constants';
import { useEffect, useState } from 'react';
import { CartTray } from '~/components/cart/CartTray';
import { getActiveCustomer } from '~/providers/customer/customer';
import Footer from '~/components/footer/Footer';
import { useActiveOrder } from '~/utils/use-active-order';
import { setApiUrl } from '~/graphqlWrapper';

export const meta: MetaFunction = () => {
  return { title: APP_META_TITLE, description: APP_META_DESCRIPTION };
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

const devMode =
  typeof process !== 'undefined' && process.env.NODE_ENV === 'development';

// The root data does not change once loaded.
export const unstable_shouldReload: ShouldReloadFunction = ({
  url,
  prevUrl,
  params,
  submission,
}) => {
  if (prevUrl.pathname === '/sign-in') {
    // just logged in
    return true;
  }
  if (prevUrl.pathname === '/account' && url.pathname === '/') {
    // just logged out
    return true;
  }
  if (submission?.action === '/checkout/payment') {
    // submitted payment for order
    return true;
  }
  return false;
};

export type RootLoaderData = {
  activeCustomer: Awaited<ReturnType<typeof getActiveCustomer>>;
  activeChannel: Awaited<ReturnType<typeof activeChannel>>;
  collections: Awaited<ReturnType<typeof getCollections>>;
};

export async function loader({ request, params, context }: DataFunctionArgs) {
  if (typeof context.VENDURE_API_URL === 'string') {
    // Set the API URL for Cloudflare Pages
    setApiUrl(context.VENDURE_API_URL);
  }
  const collections = await getCollections(request);
  const topLevelCollections = collections.filter(
    (collection) => collection.parent?.name === '__root_collection__',
  );
  const activeCustomer = await getActiveCustomer({ request });
  const loaderData: RootLoaderData = {
    activeCustomer,
    activeChannel: await activeChannel({ request }),
    collections: topLevelCollections,
  };
  return json(loaderData, { headers: activeCustomer._headers });
}

export default function App() {
  const [open, setOpen] = useState(false);
  const loaderData = useLoaderData<RootLoaderData>();
  const { collections } = loaderData;
  const {
    activeOrderFetcher,
    activeOrder,
    adjustOrderLine,
    removeItem,
    refresh,
  } = useActiveOrder();

  useEffect(() => {
    // When the loader has run, this implies we should refresh the contents
    // of the activeOrder as the user may have signed in or out.
    refresh();
  }, [loaderData]);

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
        <Header
          onCartIconClick={() => setOpen(!open)}
          cartQuantity={activeOrder?.totalQuantity ?? 0}
        />
        <main className="">
          <Outlet
            context={{
              activeOrderFetcher,
              activeOrder,
              adjustOrderLine,
              removeItem,
            }}
          />
        </main>
        <CartTray
          open={open}
          onClose={setOpen}
          activeOrder={activeOrder}
          adjustOrderLine={adjustOrderLine}
          removeItem={removeItem}
        />
        <ScrollRestoration />
        <Scripts />
        <Footer collections={collections}></Footer>

        {devMode && <LiveReload />}
      </body>
    </html>
  );
}
