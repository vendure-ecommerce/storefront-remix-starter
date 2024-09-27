import { json, ActionFunctionArgs } from "@remix-run/server-runtime";
import { authenticateWithGoogle } from "~/providers/account/account";

export async function action({ params, request }: ActionFunctionArgs) {
  const body = await request.formData();
  const token = body.get('token');

  if (typeof token === 'string') {
    
    const result = await authenticateWithGoogle(token, { request });
    console.log(result);
    if (result.authenticate.__typename === 'CurrentUser') {
      return json({
        success: true,
        redirectTo: '/account',
        headers: result._headers // Ha szükség van rá, ez a kliensre kerülhet
      });
    } else {
      return json(result, {
        status: 401,
      });
    } 
  }
}