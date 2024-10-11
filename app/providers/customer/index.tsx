import { json, LoaderFunctionArgs } from '@remix-run/server-runtime';
import { createContext, useContext, useEffect, useState } from 'react';
import { getActiveCustomer } from './customer';
import { useFetcher, useLoaderData } from '@remix-run/react';

interface ActiveCustomer {
  __typename?: 'Customer';
  id: string;
  title?: string | null;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber?: string | null;
}

const CustomerContext = createContext<{
  activeCustomer: ActiveCustomer | undefined | null;
  setActiveCustomer: (customer: any) => void;
}>({
  activeCustomer: undefined,
  setActiveCustomer: () => {},
});

export const useCustomer = () => {
  if (!CustomerContext) {
    throw new Error('useCustomer must be used within an CustomerProvider');
  }

  return useContext(CustomerContext);
};

export const CustomerProvider = ({ children }: any) => {
  const fetcher = useFetcher();

  const [stActiveCustomer, setActiveCustomer] = useState<any>();

  useEffect(() => {
    fetcher.submit(new FormData(), {
      method: 'GET',
      action: '/api/user/get-active-customer',
    });
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      setActiveCustomer(fetcher.data);
    }
  }, [fetcher]);

  return (
    <CustomerContext.Provider
      value={{
        activeCustomer: stActiveCustomer,
        setActiveCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
