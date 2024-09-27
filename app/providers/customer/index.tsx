import { json, LoaderFunctionArgs } from "@remix-run/server-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import { getActiveCustomerDetails } from "./customer";
import { useLoaderData } from "@remix-run/react";

const CustomerContext = createContext<{
  activeCustomer: {
    __typename?: "Customer";
    id: string;
    title?: string | null;
    firstName: string;
    lastName: string;
    phoneNumber?: string | null;
    emailAddress: string;
  } | null | undefined;
  setActiveCustomer: (customer: any) => void;
}>({
  activeCustomer: undefined,
  setActiveCustomer: () => {},
});

export const useCustomer = () => {
  if (!CustomerContext) {
    throw new Error("useCustomer must be used within an CustomerProvider");
  }

  return useContext(CustomerContext);
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { activeCustomer } = await getActiveCustomerDetails({ request });
  
  return json({ activeCustomer });
};

export const CustomerProvider = ({ children }: any) => {
  const { activeCustomer } = useLoaderData<typeof loader>();

  const [stActiveCustomer, setActiveCustomer] = useState<any>(
    activeCustomer?.__typename ? activeCustomer : undefined
  );

  return (
    <CustomerContext.Provider value={{
      activeCustomer: stActiveCustomer,
      setActiveCustomer,
    }}>
      {children}
    </CustomerContext.Provider>
  );
};