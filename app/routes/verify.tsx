import { useEffect, useRef } from 'react';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { DataFunctionArgs, redirect } from '@remix-run/server-runtime';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { verifyCustomerAccount } from '~/providers/account/account';

type LoaderReturnType = {
  success: boolean;
  error?: string;
  headersJson?: string;
};

export async function loader({
  request,
}: DataFunctionArgs): Promise<LoaderReturnType> {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  if (!token) {
    return {
      success: false,
      error: 'Verification token was not provided!',
    };
  }

  const result = await verifyCustomerAccount({ request }, token);
  if (result.__typename !== 'CurrentUser') {
    return { success: false, error: result.message };
  }

  const headersJson = JSON.stringify(Object.fromEntries(result._headers));
  return { success: true, headersJson };
}

export async function action({ request }: DataFunctionArgs) {
  const body = await request.formData();
  const headersJson = body.get('headers') as string;
  const redirectTarget = body.get('redirect') as string;

  if (!headersJson) {
    return null;
  }

  const headers = new Headers();
  const headerData = JSON.parse(headersJson);
  Object.keys(headerData).forEach((key) => {
    headers.set(key, headerData[key]);
  });

  return redirect(redirectTarget, { headers });
}

export default function VerifyTokenPage() {
  const [searchParams] = useSearchParams();
  const result = useLoaderData<LoaderReturnType>();
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!result.success || !btnRef.current) {
      return;
    }

    const submitBtn = btnRef.current;
    setTimeout(() => submitBtn.click(), 5000);
  }, [result]);

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {result.success ? (
            <div className="rounded-md bg-green-100 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircleIcon
                    className="h-5 w-5 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    Your account has been verified successfully. Redirecting in
                    5s...
                  </p>
                </div>
                <form method="post">
                  <input
                    type="hidden"
                    name="redirect"
                    value={searchParams.get('redirectTo') || '/'}
                  />
                  <input
                    type="hidden"
                    name="headers"
                    value={result.headersJson}
                  />
                  <button
                    ref={btnRef}
                    type="submit"
                    style={{ display: 'none ' }}
                  />
                </form>
              </div>
            </div>
          ) : (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{result.error}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
