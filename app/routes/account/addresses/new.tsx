import {
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from '@remix-run/react';
import { DataFunctionArgs, json } from '@remix-run/server-runtime';
import { useRef, useEffect } from 'react';
import { validationError } from 'remix-validated-form';
import { Button } from '~/components/Button';
import Modal from '~/components/modal/Modal';
import { HighlightedButton } from '~/components/HighlightedButton';
import useToggleState from '~/utils/use-toggle-state';
import CustomerAddressForm, {
  validator,
} from '~/components/account/CustomerAddressForm';
import { createCustomerAddress } from '~/providers/account/account';
import { getAvailableCountries } from '~/providers/checkout/checkout';

export async function loader({ request, params }: DataFunctionArgs) {
  const { availableCountries } = await getAvailableCountries({ request });

  return json({ availableCountries });
}

export async function action({ request, params }: DataFunctionArgs) {
  const body = await request.formData();

  const result = await validator.validate(body);
  if (result.error) {
    return validationError(result.error);
  }

  const { data } = result;
  await createCustomerAddress(
    {
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

export default function NewAddress() {
  const { availableCountries } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const actionData = useActionData();
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
        <Modal.Title>New address</Modal.Title>
        <Modal.Body>
          <CustomerAddressForm
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
