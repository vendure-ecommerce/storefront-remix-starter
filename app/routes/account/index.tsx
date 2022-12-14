import {
  CheckIcon,
  PencilIcon,
  ShieldCheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { TabsContainer } from '~/components/account/TabsContainer';
import { Button } from '~/components/Button';
import { ErrorMessage } from '~/components/ErrorMessage';
import { HighlightedButton } from '~/components/HighlightedButton';
import { Input } from '~/components/Input';
import { Modal } from '~/components/Modal';
import { ErrorResult } from '~/generated/graphql';
import {
  requestUpdateCustomerEmailAddress,
  updateCustomer,
} from '~/providers/account/account';
import { getActiveCustomerDetails } from '~/providers/customer/customer';
import { replaceEmptyString } from '~/utils/validation';

export async function loader({ request }: DataFunctionArgs) {
  const { activeCustomer } = await getActiveCustomerDetails({ request });
  if (!activeCustomer) {
    return redirect('/sign-in');
  }
  return json({ activeCustomer });
}

export async function action({ request }: DataFunctionArgs) {
  const body = await request.formData();

  const email = body.get('email');
  const password = body.get('password');
  if (
    typeof email === 'string' &&
    email.length > 0 &&
    typeof password === 'string' &&
    password.length > 0
  ) {
    const updateResult = await requestUpdateCustomerEmailAddress(
      password,
      email,
      { request },
    );
    if (updateResult.__typename !== 'Success') {
      return json(updateResult, {
        status: 401,
      });
    }
  }

  const title = body.get('title');
  const firstName = body.get('firstName');
  const lastName = body.get('lastName');
  const phoneNumber = body.get('phoneNumber');
  if (
    typeof title === 'string' &&
    typeof firstName === 'string' &&
    typeof lastName === 'string' &&
    typeof phoneNumber === 'string'
  ) {
    await updateCustomer(
      { title, firstName, lastName, phoneNumber },
      { request },
    );
  } else {
    return json(
      {
        message: 'Incorrect datatype(s)',
      },
      {
        status: 400,
      },
    );
  }

  return {};
}

export default function AccountDashboard() {
  const { activeCustomer } = useLoaderData<typeof loader>();
  const { firstName, lastName, title, phoneNumber, emailAddress } =
    activeCustomer!;
  const fullName = `${title ? title + ' ' : ''}${firstName} ${lastName}`;

  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingPassword, setIsConfirmingPassword] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [actionData, setActionData] =
    useState<ReturnType<typeof useActionData<ErrorResult>>>();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const actionDataHook = useActionData<ErrorResult>();

  useEffect(() => {
    setActionData(actionDataHook);
  }, [actionDataHook]);

  useEffect(() => {
    if (!actionData || actionData.message) {
      return;
    }

    if (isEditing) {
      setIsEditing(false);
    }

    if (isConfirmingPassword) {
      setIsConfirmingPassword(false);
    }

    formRef.current?.reset();
  }, [actionData]);

  useEffect(() => {
    if (isConfirmingPassword) {
      passwordInputRef.current?.focus();
    }
  }, [isConfirmingPassword]);

  return (
    <TabsContainer
      firstName={firstName}
      lastName={lastName}
      activeTab="details"
    >
      <Form
        ref={formRef}
        method="post"
        onSubmit={(ev) => {
          // only for email input
          if (!formRef.current!.reportValidity()) {
            return;
          }

          const enteredEmail = emailInputRef.current!.value;
          if (enteredEmail !== emailAddress && !isConfirmingPassword) {
            ev.preventDefault();
            setActionData(undefined);
            setNewEmail(enteredEmail);
            setIsConfirmingPassword(true);
            return;
          }
        }}
      >
        <Modal
          open={isConfirmingPassword}
          title="Confirm E-Mail address change"
          icon={<ShieldCheckIcon className="h-10 w-10 text-primary-500" />}
          submitProps={{
            type: 'submit',
          }}
          cancelProps={{
            type: 'button',
            onClick: () => {
              passwordInputRef.current!.value = '';
              setActionData(undefined);
              setNewEmail('');
              setIsConfirmingPassword(false);
            },
          }}
        >
          <div className="space-y-4">
            <p>We will send a verification E-Mail to {newEmail}</p>

            <div className="space-y-1">
              <label htmlFor="password">
                Confirm the change by entering your password:
              </label>

              <input type="hidden" name="email" value={newEmail} />
              <Input
                ref={passwordInputRef}
                type="password"
                name="password"
                className="w-full"
              />
            </div>

            {actionData && actionData.message && (
              <ErrorMessage
                heading="We ran into a problem changing your E-Mail!"
                message={actionData.message}
              />
            )}
          </div>
        </Modal>

        <div className="min-h-[24rem] rounded-lg p-4 space-y-4">
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            {isEditing && (
              <div className="md:col-span-2 md:w-1/4">
                <h3 className="text-sm text-gray-500">Title</h3>
                <Input
                  name="title"
                  defaultValue={title ?? ''}
                  className="w-full"
                />
              </div>
            )}

            {isEditing ? (
              <>
                <div>
                  <label htmlFor="firstName" className="text-sm text-gray-500">
                    First Name
                  </label>
                  <Input
                    name="firstName"
                    defaultValue={firstName}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="text-sm text-gray-500">
                    Last Name
                  </label>
                  <Input
                    name="lastName"
                    defaultValue={lastName}
                    className="w-full"
                  />
                </div>
              </>
            ) : (
              <div className="md:col-span-2">
                <h3 className="text-sm text-gray-500">Full Name</h3>
                {replaceEmptyString(fullName)}
              </div>
            )}

            <div>
              <h3 className="text-sm text-gray-500">E-Mail</h3>
              {isEditing ? (
                <Input
                  required
                  ref={emailInputRef}
                  defaultValue={emailAddress}
                  className="w-full"
                />
              ) : (
                replaceEmptyString(emailAddress)
              )}
            </div>

            <div>
              <h3 className="text-sm text-gray-500">Phone Nr.</h3>
              {isEditing ? (
                <Input
                  name="phoneNumber"
                  defaultValue={phoneNumber ?? ''}
                  className="w-full"
                />
              ) : (
                replaceEmptyString(phoneNumber)
              )}
            </div>
          </div>

          {isEditing ? (
            <>
              {!isConfirmingPassword && actionData && actionData.message && (
                <ErrorMessage
                  heading="We ran into a problem updating your details!"
                  message={actionData.message}
                />
              )}

              <div className="flex gap-x-4">
                <HighlightedButton
                  type="submit"
                  className="w-24 flex items-center justify-around"
                >
                  <CheckIcon className="w-4 h-4" /> Save
                </HighlightedButton>

                <Button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-28 flex items-center justify-around"
                >
                  <XMarkIcon className="w-4 h-4" /> Cancel
                </Button>
              </div>
            </>
          ) : (
            <HighlightedButton
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-24 flex items-center justify-around"
            >
              <PencilIcon className="w-4 h-4" /> Edit
            </HighlightedButton>
          )}
        </div>
      </Form>
    </TabsContainer>
  );
}
