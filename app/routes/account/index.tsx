import { useEffect, useState } from "react";
import dummy from "../../_dummy/dummy_sanitech.json";
import Breadcrumbs from "~/components/breadcrumbs/Breadcrumbs";
import Sidebar from "~/components/common/Sidebar";
import ListGroup from "~/components/common/list/ListGroup";
import ListGroupItem from "~/components/common/list/ListGroupItem";
import HistoryProduct from "~/components/common/section/HistoryProduct";
import { ScrollArea } from "~/components/ui-custom/MyScrollArea";
import Billing from "./addresses/billing";
import Dashboard from "./dashboard";
import Favorites from "./favorites/page";
import Orders from "./orders/page";
import Settings from "./settings/page";
import Subscriptions  from "./subscriptions/page";
import Shipping from "./addresses/shipping/page";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/server-runtime";
import { getActiveCustomerDetails } from "~/providers/customer/customer";
import { useLoaderData } from "@remix-run/react";
import { useCustomer } from "~/providers/customer";

const pages = {
  billing: Billing,
  shipping: Shipping,
  dashboard: Dashboard,
  favorites: Favorites,
  orders: Orders,
  settings: Settings,
  subscriptions: Subscriptions,
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { activeCustomer } = await getActiveCustomerDetails({ request });

  return json({ activeCustomer });
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { activeCustomer } = useLoaderData<typeof loader>();
  const { setActiveCustomer } = useCustomer();
  const [stCurrentPage, setStCurrentPage] = useState("dashboard");

  const accountMenuOptions = dummy.accountMenuOptions;

  const onPageChange = (page: string) => {
    setStCurrentPage(page);
  };

  const CurrentChild = (pages as any)[stCurrentPage];

  useEffect(() => {
    setActiveCustomer(activeCustomer);
  }, [activeCustomer]);

  return (
    <>
      <div className='mx-auto flex w-full max-w-screen-2xl flex-col gap-20 px-6 pb-12'>
        <div className='grid grid-cols-1 gap-x-[4.5rem] lg:grid-cols-[20rem_minmax(0,_1fr)]'>
          <Sidebar>
            <ScrollArea className='h-full w-full overscroll-contain'>
              <div className='flex flex-col gap-8 pb-0 pt-9'>
                <ListGroup>
                  {accountMenuOptions
                    .flatMap((option) => (option.active ? option.active : []))
                    .map((option, index) => (
                      <ListGroupItem
                        key={index}
                        className='px-3'
                        title={option.title}
                        link={"/account"}
                        imageSrc={option.imageSrc}
                        imageClassName='h-6 w-6'
                        badge={option.notification}
                        showBadge={option.notification > 0}
                        onClick={() => {
                          if (option.link.indexOf("addresses") === -1) {
                            onPageChange(option.link.replace("/account/", ""));
                          } else {
                            onPageChange(option.link.replace("/account/addresses/", ""));
                          }
                        }}
                      />
                    ))}
                </ListGroup>
              </div>
            </ScrollArea>
          </Sidebar>
          <main className='flex flex-col gap-12 pt-12'>
            {/* <Breadcrumbs /> */}
            <div className='flex flex-auto flex-col gap-16'>
              <CurrentChild />
            </div>
          </main>
        </div>
        <HistoryProduct />
      </div>
    </>
  );
}
