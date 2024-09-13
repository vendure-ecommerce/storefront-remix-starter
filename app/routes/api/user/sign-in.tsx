import { redirect, json, ActionFunctionArgs } from "@remix-run/server-runtime";
import { login } from "~/providers/account/account";

export async function action({ params, request }: ActionFunctionArgs) {
  const body = await request.formData();
  const email = body.get('email');
  const password = body.get('password');

  if (typeof email === 'string' && typeof password === 'string') {
    const rememberMe = !!body.get('rememberMe');
    const redirectTo = (body.get('redirectTo') || '/') as string;
    const result = await login(email, password, rememberMe, { request });
    console.log(result);
    if (result.__typename === 'CurrentUser') {
      return redirect(redirectTo, { headers: result._headers });
    } else {
      return json(result, {
        status: 401,
      });
    }
  }
}