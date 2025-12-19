import { PencilIcon } from '@heroicons/react/24/outline';
import { ActionFunctionArgs, data, useActionData, useNavigation } from 'react-router';
import { withZod } from '@rvf/zod';
import { useEffect, useRef, useState } from 'react';
import { ValidatedForm, validationError } from '@rvf/react-router';
import { z } from 'zod';
import { Button } from '~/components/Button';
import { ErrorMessage } from '~/components/ErrorMessage';
import { HighlightedButton } from '~/components/HighlightedButton';
import { Input } from '~/components/Input';
import { SuccessMessage } from '~/components/SuccessMessage';
import { updateCustomerPassword } from '~/providers/account/account';
import {
  isErrorResult,
  isValidationErrorResponseData,
} from '~/utils/validation-helper';
import { useTranslation } from 'react-i18next';

export const validator = withZod(
  z
    .object({
      currentPassword: z.string().min(1, { message: 'Password is required' }),
      newPassword: z.string().min(1, { message: 'Password is required' }),
      confirmPassword: z.string().min(1, { message: 'Password is required' }),
    })
    .refine(
      ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
      {
        path: ['confirmPassword'],
        message: 'Passwords must match',
      },
    ),
);

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();

  const result = await validator.validate(body);
  if (result.error) {
    return validationError(result.error);
  }

  const { currentPassword, newPassword } = result.data;

  const res = await updateCustomerPassword(
    { currentPassword, newPassword },
    { request },
  );

  if (res.__typename !== 'Success') {
    return data(res, { status: 401 });
  }

  return data(res);
}

export default function AccountPassword() {
  const [editing, setEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const actionDataHook = useActionData<typeof action>();
  const { state } = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (isValidationErrorResponseData(actionDataHook)) {
      // no additional handling
      return;
    }

    if (isErrorResult(actionDataHook)) {
      // set error message
      setErrorMessage(actionDataHook.message);
      setIsSaved(false);
      return;
    }

    if (actionDataHook?.success) {
      // show success message and reset form
      setErrorMessage(undefined);
      setIsSaved(true);
      setEditing(false);
      formRef.current?.reset();
    }
  }, [actionDataHook]);

  return (
    <ValidatedForm validator={validator} method="post" formRef={formRef}>
      <div className="p-4 space-y-4">
        {editing && (
          <>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              <div>
                <Input
                  required
                  label={t('account.currentPassword')}
                  name="currentPassword"
                  type="password"
                />
              </div>
            </div>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              <div>
                <Input
                  required
                  label={t('account.newPassword')}
                  name="newPassword"
                  type="password"
                />
              </div>
              <div>
                <Input
                  required
                  label={t('account.confirmPassword')}
                  name="confirmPassword"
                  type="password"
                />
              </div>
            </div>
          </>
        )}
        {isSaved && (
          <SuccessMessage
            heading={t('account.pwdSuccessHeading')}
            message={t('account.pwdSuccessMessage')}
          />
        )}
        {errorMessage && (
          <ErrorMessage
            heading={t('account.pwdErrorMessage')}
            message={errorMessage}
          />
        )}
        {editing ? (
          <div className="flex gap-3">
            <HighlightedButton
              type="submit"
              isSubmitting={state === 'submitting'}
            >
              {t('account.savePassword')}
            </HighlightedButton>
            <Button type="reset" onClick={() => setEditing(false)}>
              {t('common.cancel')}
            </Button>
          </div>
        ) : (
          <>
            <HighlightedButton type="button" onClick={() => setEditing(true)}>
              <PencilIcon className="w-4 h-4" /> {t('account.changePassword')}
            </HighlightedButton>
          </>
        )}
      </div>
    </ValidatedForm>
  );
}
