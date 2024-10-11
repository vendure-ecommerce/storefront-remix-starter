import { ActionFunctionArgs } from '@remix-run/server-runtime';
import { authenticateWithGoogle } from '~/providers/account/account';

export async function action({ params, request }: ActionFunctionArgs) {
  const body = await request.formData();
  const token = body.get('token');

  if (typeof token === 'string') {
    const result = await authenticateWithGoogle(token, { request });

    if (result.authenticate.__typename === 'CurrentUser') {
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
