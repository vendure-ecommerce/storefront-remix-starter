import { Form, useActionData, useSearchParams } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { login } from '~/providers/account/account';
import { ErrorResult } from '~/generated/graphql';
import { XCircleIcon } from '@heroicons/react/solid';

export async function action({ params, request }: DataFunctionArgs) {
    const body = await request.formData();
    const email = body.get('email');
    const password = body.get('password');
    if (typeof email === 'string' && typeof password === 'string') {
        const rememberMe = !!body.get('rememberMe');
        const redirectTo = (body.get('redirectTo') || '/account') as string;
        const result = await login(email, password, rememberMe, { request });
        if (result.login.__typename === 'CurrentUser') {
            return redirect(redirectTo, { headers: result._headers });
        } else {
            return json(result.login, {
                status: 401,
            });
        }
    }
}

export default function SignInPage() {
    const [searchParams] = useSearchParams();
    const actionData = useActionData<ErrorResult>();
    return (
        <>
            <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <a
                            href="#"
                            className="font-medium text-primary-600 hover:text-primary-500"
                        >
                            register a new account
                        </a>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <Form className="space-y-6" method="post">
                            <input
                                type="hidden"
                                name="redirectTo"
                                value={
                                    searchParams.get('redirectTo') ?? undefined
                                }
                            />
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="rememberMe"
                                        name="rememberMe"
                                        type="checkbox"
                                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                        defaultChecked
                                    />
                                    <label
                                        htmlFor="rememberMe"
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-medium text-primary-600 hover:text-primary-500"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            {actionData && (
                                <div className="rounded-md bg-red-50 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <XCircleIcon
                                                className="h-5 w-5 text-red-400"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-red-800">
                                                We ran into a problem signing
                                                you in!
                                            </h3>
                                            <p className="text-sm text-red-700 mt-2">
                                                {actionData.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                >
                                    Sign in
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}
