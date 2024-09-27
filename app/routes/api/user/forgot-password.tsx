import { ActionFunctionArgs, json, redirect } from "@remix-run/server-runtime";
import { requestPasswordReset } from "~/providers/account/account";
import { EMAIL_REGEX } from "~/utils/registration-helper";

export async function action({ params, request }: ActionFunctionArgs) {
  const body = await request.formData();
  const email = body.get('email');
  
  if (!email || typeof email !== 'string' || !email.match(EMAIL_REGEX)) {
    const formError = { form: "Invalid email address" };
    return json(formError, { status: 400 });
  }

    const result = await requestPasswordReset({ emailAddress: email }, { request });

    console.log(result);

    if (!result) {
      const formError = { form: "No response from the server" };
      return json(formError, { status: 500 });
    }

    if (result.__typename === 'Success') {
      redirect('/success');
      return json({ success: true });
    } else {
      const formError = { form: result.message || "An error occurred" };
      return json(formError, { status: 401 });
    }
}
