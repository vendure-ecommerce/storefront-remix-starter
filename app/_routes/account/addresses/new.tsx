import {
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from '@remix-run/react';
import { DataFunctionArgs, json } from '@remix-run/server-runtime';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { validationError } from 'remix-validated-form';
import CustomerAddressForm, {
  validator,
} from '~/components/_account/CustomerAddressForm';
import Modal from '~/components/_modal/Modal';
import { Button } from '~/components/Button';
import { HighlightedButton } from '~/components/HighlightedButton';
import { createCustomerAddress } from '~/providers/account/account';
import { getAvailableCountries } from '~/providers/checkout/checkout';
import useToggleState from '~/utils/use-toggle-state';

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
  const { t } = useTranslation();

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
        <Modal.Title>{t('address.new')}</Modal.Title>
        <Modal.Body>
          <CustomerAddressForm
            availableCountries={availableCountries}
            formRef={formRef}
            submit={submitForm}
          ></CustomerAddressForm>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={close}>
            {t('common.cancel')}
          </Button>
          <HighlightedButton
            isSubmitting={navigation.state === 'submitting'}
            type="submit"
            onClick={submitForm}
          >
            {t('common.save')}
          </HighlightedButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
