import { ActionFunctionArgs } from '@remix-run/server-runtime';
import { login } from '~/providers/account/account';

export async function action({ params, request }: ActionFunctionArgs) {
  const body = await request.formData();
  const email = body.get('email');
  const password = body.get('password');

  console.log('email, password');
  console.log(email, password);

  if (typeof email === 'string' && typeof password === 'string') {
    const rememberMe = !!body.get('rememberMe');
    const redirectTo = (body.get('redirectTo') || '/') as string;
    const result = await login(email, password, rememberMe, { request });

    console.log(result);

    if (result.__typename === 'CurrentUser') {
      return new Response(
        JSON.stringify({
          success: true,
          redirectTo: '/account',
        }),
        {
          status: 200,
          headers: result._headers,
        },
      );
    } else {
      return new Response(JSON.stringify(result), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }
}
