import { json, LoaderFunctionArgs } from '@remix-run/server-runtime';
import {
  getActiveCustomer,
  getActiveCustomerAddresses,
} from '~/providers/customer/customer';
import { getSessionStorage } from '~/sessions';

export type ActiveCustomerData = Awaited<ReturnType<typeof loader>>;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let headers: ResponseInit['headers'] = {};
  const sessionStorage = await getSessionStorage();
  const session = await sessionStorage.getSession(
    request?.headers.get('Cookie'),
  );

  headers = {
    'Set-Cookie': await sessionStorage.commitSession(session),
  };

  const customer = await getActiveCustomer({ request });
  const res = await getActiveCustomerAddresses({ request });
  const activeCustomerAddresses = res.activeCustomer?.addresses;

  console.dir('Active customer: ' + JSON.stringify(customer));

  return {
    activeCustomerAddresses: activeCustomerAddresses,
    activeCustomer: customer,
    headers: customer._headers,
  };
};
