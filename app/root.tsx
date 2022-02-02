import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import styles from "./styles/app.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import { Header } from "./components/header/Header";
import { DataFunctionArgs } from "@remix-run/server-runtime";
import { activeOrder } from "./providers/orders/order";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
    },
    { rel: "stylesheet", href: styles },
  ];
}

type LoaderData = Awaited<ReturnType<typeof loader>>;
export async function loader({ request }: DataFunctionArgs) {
  console.log('req', request.headers)
  return {
    activeOrder: await activeOrder({
      headers: request.headers
    }),
  };
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en" id="app">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <Header />

          <main className="max-w-5xl p-4 m-auto">
            <Outlet />
          </main>
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </body>
      </html>
    </ThemeProvider>
  );
}
