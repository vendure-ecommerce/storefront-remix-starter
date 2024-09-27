import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/server-runtime";
import React, { createContext, useContext, useState } from "react";
import { ErrorResult } from "~/generated/graphql";
import { getSessionStorage } from "~/sessions";

const OrderContext = createContext<{
  error?: ErrorResult;
  amountHandlers: any[];
  addAmountHandler: (handler: any) => void;
  removeAmountHandler: (handlerId: string) => void;
}>({
  error: undefined,
  amountHandlers: [],
  addAmountHandler: () => {},
  removeAmountHandler: () => {},
});

export const useOrder = () => {
  if (!OrderContext) {
    throw new Error('useOrder must be used within an OrderProvider');
  }

  return useContext(OrderContext);
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const sessionStorage = await getSessionStorage();
  const session = await sessionStorage.getSession(
    request?.headers.get('Cookie'),
  );
  const error = session.get('activeOrderError');
  return {
    error,
  };
};

interface IOrderProps {
  children: React.ReactNode;
}

export const OrderProvider: React.FC<IOrderProps> = ({ children }) => {
  const { error } = useLoaderData<typeof loader>();
  const [stAmountHandlers, setAmountHandlers] = useState<any[]>([]);

  const addAmountHandler = (handler: any) => {
    setAmountHandlers((oldState) => {
      return [...oldState, handler];
    });
  };

  const removeAmountHandler = (handlerId: string) => {
    setAmountHandlers(stAmountHandlers.filter((h) => h.id !== handlerId));
  };

  return (
    <OrderContext.Provider value={{
      error,
      amountHandlers: stAmountHandlers,
      addAmountHandler,
      removeAmountHandler,

    }}>
      {children}
    </OrderContext.Provider>
  );
};