import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { DataFunctionArgs } from '@remix-run/server-runtime';
import { useEffect, useState } from 'react';
import { ErrorCode } from '~/generated/graphql';
import { verifyCustomerAccount } from '~/providers/account/account';

export async function loader({ request }: DataFunctionArgs) {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    if (!token) {
        return {
            errorCode: ErrorCode.VerificationTokenInvalidError,
            message: 'Verification token was not provided!',
        };
    }

    const result = await verifyCustomerAccount({ request }, token);
    if (result.__typename !== 'CurrentUser') {
        return { ...result };
    }

    return null;
}

export default function VerifyTokenPage() {
    const navigate = useNavigate();
    const errorData = useLoaderData();
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (errorData) {
            setError(errorData.message);
            return;
        }

        setError('');
        setTimeout(() => navigate('/'), 10000);
    }, [errorData]);

    return (
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {error ? (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <XCircleIcon
                                        className="h-5 w-5 text-red-400"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">
                                        {error}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-md bg-lime-100 p-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <CheckCircleIcon
                                        className="h-5 w-5 text-lime-500"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-lime-700">
                                        Your account has been verified
                                        successfully. Redirecting in 5s...
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
