import { PencilIcon } from '@heroicons/react/24/outline';
import { useActionData, useNavigation } from '@remix-run/react';
import { DataFunctionArgs, json } from '@remix-run/server-runtime';
import { withZod } from '@remix-validated-form/with-zod';
import { useEffect, useRef, useState } from 'react';
import { ValidatedForm, validationError } from 'remix-validated-form';
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

export async function action({ request }: DataFunctionArgs) {
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
    return json(res, { status: 401 });
  }

  return json(res);
}

export default function AccountPassword() {
  const [editing, setEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const actionDataHook = useActionData<typeof action>();
  const { state } = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);

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
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                />
              </div>
            </div>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              <div>
                <Input
                  required
                  label="New Password"
                  name="newPassword"
                  type="password"
                />
              </div>
              <div>
                <Input
                  required
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                />
              </div>
            </div>
          </>
        )}
        {isSaved && (
          <SuccessMessage
            heading="Success!"
            message="Your password has been updated."
          />
        )}
        {errorMessage && (
          <ErrorMessage
            heading="Password not updated."
            message={errorMessage}
          />
        )}
        {editing ? (
          <div className="flex gap-3">
            <HighlightedButton type="submit" isSubmitting={state === 'submitting'}>
              Save Password
            </HighlightedButton>
            <Button type="reset" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <>
            <HighlightedButton type="button" onClick={() => setEditing(true)}>
              <PencilIcon className="w-4 h-4" /> Change Password
            </HighlightedButton>
          </>
        )}
      </div>
    </ValidatedForm>
  );
}
