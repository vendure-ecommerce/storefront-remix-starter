import {
  Outlet, useLoaderData
} from '@remix-run/react';
import { DataFunctionArgs, json } from '@remix-run/server-runtime';
import AddAddressCard from '~/components/account/AddAddressCard';
import EditAddressCard from '~/components/account/EditAddressCard';
import { Address, ErrorCode, ErrorResult } from '~/generated/graphql';
import { deleteCustomerAddress, updateCustomerAddress } from '~/providers/account/account';
import { getActiveCustomerAddresses } from '~/providers/customer/customer';

export async function loader({ request }: DataFunctionArgs) {
  const res = await getActiveCustomerAddresses({ request });
  const activeCustomerAddresses = res.activeCustomer;
  return json({ activeCustomerAddresses });
}

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get('id') as string | null;
  const _action = formData.get('_action');

  // Verify that id is set
  if (!id || id.length === 0) {
    return json<ErrorResult>(
      {
        errorCode: ErrorCode.IdentifierChangeTokenInvalidError, // TODO: I dont think this error is 100% appropriate - decide later
        message: "Parameter 'id' is missing"
      },
      {
        status: 400, // Bad request
      },
    );
  }

  if (_action === "setDefaultShipping") {
    updateCustomerAddress({ id, defaultShippingAddress: true }, { request });
    return null;
  }

  if (_action === "setDefaultBilling") {
    updateCustomerAddress({ id, defaultBillingAddress: true }, { request });
    return null;
  }

  if (_action === "deleteAddress") {
    const { success } = await deleteCustomerAddress(id, { request });
    return json(null, { status: success ? 200 : 400 });
  }

  return json<ErrorResult>(
    {
      message: 'An unknown error occurred',
      errorCode: ErrorCode.UnknownError,
    },
    {
      status: 400,
    },
  );
}

export default function AccountAddresses() {
  const { activeCustomerAddresses } = useLoaderData<typeof loader>();

  return (
    <>
      <Outlet></Outlet>
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 mt-4">
          <AddAddressCard />
          {activeCustomerAddresses?.addresses!.map((address) => {
            return (
              <EditAddressCard
                address={address as Address}
                key={address.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
