import { ActionFunctionArgs } from '@remix-run/server-runtime';
import { customerExistsByEmail } from '~/providers/customer/customer';

export async function action({ params, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get('email') as string;

  const result = await customerExistsByEmail(email, { request });

  return result.customerExistsByEmail;
}
