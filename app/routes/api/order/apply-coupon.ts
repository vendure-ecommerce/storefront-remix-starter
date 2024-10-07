import { ActionFunctionArgs } from '@remix-run/server-runtime';
import { applyCouponCode } from '~/providers/orders/order';

export async function action({ params, request }: ActionFunctionArgs) {
  const body = await request.formData();
  const couponCode = body.get('couponCode') as string;

  const result = await applyCouponCode(couponCode, { request });

  if (result.applyCouponCode.__typename === 'Order') {
    return new Response(
      JSON.stringify({
        result,
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
