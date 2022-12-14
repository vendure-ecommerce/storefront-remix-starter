import {
  HashtagIcon,
  MapPinIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { Form } from '@remix-run/react';
import { ReactNode } from 'react';
import { Tab } from './Tab';

export type ActiveTab = 'details' | 'history' | 'addresses' | 'password';

export function TabsContainer({
  firstName,
  lastName,
  children,
  activeTab,
}: {
  firstName: string;
  lastName: string;
  children: ReactNode | string;
  activeTab: ActiveTab;
}) {
  return (
    <>
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
        <div className="border-b border-gray-200 mt-4">
          <ul className="gap-x-4 grid grid-cols-2 sm:grid-0 sm:flex sm:flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
            <Tab
              Icon={UserCircleIcon}
              text="Account details"
              href="#"
              isActive={activeTab == 'details'}
            />

            <Tab
              Icon={ShoppingBagIcon}
              text="Purchase history"
              href="#"
              isActive={activeTab == 'history'}
            />

            <Tab
              Icon={MapPinIcon}
              text="Addresses"
              href="#"
              isActive={activeTab == 'addresses'}
            />

            <Tab
              Icon={HashtagIcon}
              text="Password change"
              href="#"
              isActive={activeTab == 'password'}
            />
          </ul>
        </div>

        {children}
      </div>
    </>
  );
}
