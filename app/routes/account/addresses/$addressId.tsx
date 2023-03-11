import {
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
  useNavigation,
} from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { useRef, useEffect } from 'react';
import { validationError } from 'remix-validated-form';
import { Button } from '~/components/Button';
import Modal from '~/components/modal/Modal';
import { HighlightedButton } from '~/components/HighlightedButton';
import { Address } from '~/generated/graphql';
import useToggleState from '~/utils/use-toggle-state';
import CustomerAddressForm, {
  validator,
} from '~/components/account/CustomerAddressForm';
import { updateCustomerAddress } from '~/providers/account/account';
import { getAvailableCountries } from '~/providers/checkout/checkout';
import { getActiveCustomerAddresses } from '~/providers/customer/customer';

export async function loader({ request, params }: DataFunctionArgs) {
  const { activeCustomer } = await getActiveCustomerAddresses({ request });
  const address = activeCustomer?.addresses?.find(
    (address) => address.id === params.addressId,
  );

  if (!address) {
    return redirect('/account/addresses');
  }

  const { availableCountries } = await getAvailableCountries({ request });

  return json({ address, availableCountries });
}

export async function action({ request, params }: DataFunctionArgs) {
  const body = await request.formData();

  const result = await validator.validate(body);
  if (result.error) {
    return validationError(result.error);
  }

  const { data } = result;
  await updateCustomerAddress(
    {
      id: params.addressId!,
      city: data.city,
      company: data.company,
      countryCode: data.countryCode,
      fullName: data.fullName,
      phoneNumber: data.phone,
      postalCode: data.postalCode,
      province: data.province,
      streetLine1: data.streetLine1,
      streetLine2: data.streetLine2,
    },
    { request },
  );

  return json({
    saved: true,
  });
}

export default function EditAddress() {
  const { address, availableCountries } = useLoaderData<typeof loader>();
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { state, close } = useToggleState(true);
  const formRef = useRef<HTMLFormElement>(null);

  const submit = useSubmit();

  useEffect(() => {
    if (actionData?.saved) {
      close();
    }
  }, [actionData]);

  const submitForm = () => {
    submit(formRef.current);
  };

  const afterClose = () => {
    navigate(-1);
  };

  return (
    <div>
      <Modal isOpen={state} close={close} afterClose={afterClose}>
        <Modal.Title>Edit address</Modal.Title>
        <Modal.Body>
          <CustomerAddressForm
            address={address as Address}
            availableCountries={availableCountries}
            formRef={formRef}
            submit={submitForm}
          ></CustomerAddressForm>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={close}>
            Cancel
          </Button>
          <HighlightedButton
            isSubmitting={navigation.state === 'submitting'}
            type="submit"
            onClick={submitForm}
          >
            Save
          </HighlightedButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
