import { ActionFunctionArgs, redirect } from 'react-router';
import { logout } from '~/providers/account/account';

export async function action({ request }: ActionFunctionArgs) {
  const result = await logout({ request });
  return redirect('/', { headers: result._headers });
}

export async function loader() {
  return redirect('/');
}
