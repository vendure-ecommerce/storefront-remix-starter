import {
  Form,
  Outlet,
  useActionData,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import { DataFunctionArgs, json } from '@remix-run/server-runtime';
import { useEffect, useState } from 'react';
import AddAddressCard from '~/components/account/AddAddressCard';
import EditAddressCard from '~/components/account/EditAddressCard';
import { Button } from '~/components/Button';
import { ErrorMessage } from '~/components/ErrorMessage';
import { HighlightedButton } from '~/components/HighlightedButton';
import Modal from '~/components/modal/Modal';
import { Address, ErrorCode, ErrorResult } from '~/generated/graphql';
import { deleteCustomerAddress } from '~/providers/account/account';
import { getActiveCustomerAddresses } from '~/providers/customer/customer';
import useToggleState from '~/utils/use-toggle-state';
import { isErrorResult } from '~/utils/validation-helper';

export async function loader({ request }: DataFunctionArgs) {
  const res = await getActiveCustomerAddresses({ request });
  const activeCustomerAddresses = res.activeCustomer;
  return json({ activeCustomerAddresses });
}

export async function action({ request }: DataFunctionArgs) {
  const body = await request.formData();
  const addressId = body.get('addressId') as string | null;

  if (addressId) {
    const result = await deleteCustomerAddress(addressId, { request });
    if (result.success) {
      return json(result);
    }
  }
  
  return json<ErrorResult>(
    {
      message: 'An unknown error occurred while removing your address.',
      errorCode: ErrorCode.UnknownError,
    },
    {
      status: 401,
    },
  );
}

export default function AccountAddresses() {
  const { activeCustomerAddresses } = useLoaderData<typeof loader>();
  const [selectedAddressId, setSelectedAddressId] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [removeDialogVisible, showRemoveDialog, hideRemoveDialog] =
    useToggleState(false);
  const { state } = useNavigation();
  const actionDataHook = useActionData<typeof action>();

  useEffect(() => {
    if (!actionDataHook) {
      return;
    }

    if (isErrorResult(actionDataHook)) {
      setErrorMessage(actionDataHook.message);
      return;
    }

    if (actionDataHook?.success) {
      setErrorMessage(undefined);
      hideRemoveDialog();
    }
  }, [actionDataHook]);

  const confirmRemoveAddress = (addressId: string) => {
    showRemoveDialog();
    setSelectedAddressId(addressId);
  };

  return (
    <>
      <Modal isOpen={removeDialogVisible} close={() => hideRemoveDialog()}>
        <Form method="post">
          <Modal.Title>Remove Address</Modal.Title>
          <Modal.Body>
            <div className="space-y-4 my-4">
              Do you want to remove this address?
              <input
                type="hidden"
                name="addressId"
                defaultValue={selectedAddressId}
              />
              {errorMessage && (
                <ErrorMessage
                  heading="Address could not be removed"
                  message={errorMessage}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" onClick={() => hideRemoveDialog()}>
              Cancel
            </Button>
            <HighlightedButton
              type="submit"
              isSubmitting={state === 'submitting'}
            >
              Yes
            </HighlightedButton>
          </Modal.Footer>
        </Form>
      </Modal>
      <Outlet></Outlet>
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 mt-4">
          <AddAddressCard />
          {activeCustomerAddresses?.addresses!.map((address) => {
            return (
              <EditAddressCard
                address={address as Address}
                key={address.id}
                onClickRemove={() => confirmRemoveAddress(address.id)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
