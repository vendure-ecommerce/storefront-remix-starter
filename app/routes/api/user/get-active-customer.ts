import { json, LoaderFunctionArgs } from '@remix-run/server-runtime';
import {
  getActiveCustomer,
  getActiveCustomerDetails,
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

  console.dir('Active customer: ' + JSON.stringify(customer));

  return json({ activeOrder: customer }, { headers: customer._headers });
};
