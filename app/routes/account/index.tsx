import { Form, useLoaderData } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { logout } from '~/providers/account/account';
import { useRootLoader } from '~/utils/use-root-loader';
import { getActiveCustomer } from '~/providers/customer/customer';

export async function loader({ request, params }: DataFunctionArgs) {
    const { activeCustomer } = await getActiveCustomer({ request });
    if (!activeCustomer) {
        return redirect('/sign-in');
    }
    return json({ activeCustomer });
}

export async function action({ request, params }: DataFunctionArgs) {
    const body = await request.formData();
    const formAction = body.get('action');
    switch (formAction) {
        case 'logout':
            const result = await logout({ request });
            return redirect('/', { headers: result._headers });
    }
    return {};
}

export default function AccountDashboard() {
    const { activeCustomer } = useLoaderData<typeof loader>();
    const { firstName, lastName } = activeCustomer!;
    return (
        <div className="max-w-6xl xl:mx-auto px-4">
            <h2 className="text-3xl sm:text-5xl font-light text-gray-900 my-8">
                My Account
            </h2>
            <p className="text-gray-700 text-lg -mt-4">
                Welcome back, {firstName} {lastName}
            </p>
            <Form method="post">
                <input type="hidden" name="action" value="logout" />
                <button
                    type="submit"
                    className="underline my-4 text-primary-600 hover:text-primary-800"
                >
                    Sign out
                </button>
            </Form>
            <div className="h-96 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center">
                <div className="text-xl text-gray-500">
                    Account dashboard not done yet.{' '}
                    <a
                        className="text-primary-600"
                        href="https://github.com/vendure-ecommerce/storefront-remix-starter"
                    >
                        Want to help?
                    </a>
                </div>
            </div>
        </div>
    );
}
