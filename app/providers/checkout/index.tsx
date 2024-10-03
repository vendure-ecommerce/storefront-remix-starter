import { useFetcher } from '@remix-run/react';
import { createContext, useContext, useState } from 'react';
import { OrderAddress } from '~/generated/graphql';

const CheckoutContext = createContext<{
  orderBillingAddress?: OrderAddress;
  setOrderBillingAddress: (address: OrderAddress) => void;

  orderShippingAddress?: OrderAddress;
  setOrderShippingAddress: (address: OrderAddress) => void;
}>({
  orderBillingAddress: undefined,
  setOrderBillingAddress: () => {},

  orderShippingAddress: undefined,
  setOrderShippingAddress: () => {},
});

export const useCheckout = () => {
  if (!CheckoutContext) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }

  return useContext(CheckoutContext);
};

export const CheckoutProvider = ({ children }: any) => {
  const fetcher = useFetcher();

  const [stOrderBillingAddress, setOrderBillingAddress] = useState<
    OrderAddress | undefined
  >();
  const [stOrderShippingAddress, setOrderShippingAddress] = useState<
    OrderAddress | undefined
  >();

  return (
    <CheckoutContext.Provider
      value={{
        orderBillingAddress: stOrderBillingAddress,
        setOrderBillingAddress,
        orderShippingAddress: stOrderShippingAddress,
        setOrderShippingAddress,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
