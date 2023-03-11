import {
  HashtagIcon,
  MapPinIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { Form, Outlet, useLoaderData, useMatches } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { TabProps } from '~/components/tabs/Tab';
import { TabsContainer } from '~/components/tabs/TabsContainer';
import { getActiveCustomerDetails } from '~/providers/customer/customer';

export async function loader({ request }: DataFunctionArgs) {
  const { activeCustomer } = await getActiveCustomerDetails({ request });
  if (!activeCustomer) {
    return redirect('/sign-in');
  }
  return json({ activeCustomer });
}

export default function AccountDashboard() {
  const { activeCustomer } = useLoaderData<typeof loader>();
  const { firstName, lastName } = activeCustomer!;

  const tabs: TabProps[] = [
    {
      Icon: UserCircleIcon,
      text: 'Account Details',
      to: './',
    },
    {
      Icon: ShoppingBagIcon,
      text: 'Purchase History',
      to: './history',
    },
    {
      Icon: MapPinIcon,
      text: 'Addresses',
      to: './addresses',
    },
    {
      Icon: HashtagIcon,
      text: 'Password',
      to: './password',
    },
  ];

  return (
    <div className="max-w-6xl xl:mx-auto px-4">
      <h2 className="text-3xl sm:text-5xl font-light text-gray-900 my-8">
        My Account
      </h2>
      <p className="text-gray-700 text-lg -mt-4">
        Welcome back, {firstName} {lastName}
      </p>
      <Form method="post" action="/api/logout">
        <button
          type="submit"
          className="underline text-primary-600 hover:text-primary-800"
        >
          Sign out
        </button>
      </Form>
      <TabsContainer tabs={tabs}>
        <Outlet></Outlet>
      </TabsContainer>
    </div>
  );
}
