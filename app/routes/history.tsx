// routes/history.tsx
import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import HistoryProduct from '~/components/common/section/HistoryProduct';
import { ProductHistory, SortOrder } from '~/generated/graphql';
import { getProductHistoryList } from '~/providers/product-histroy/product-history';
import { getProductBySlug } from '~/providers/products/products';
import { getSessionStorage } from '~/sessions';

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { product } = await getProductBySlug(params.slug!, { request });
  if (!product) {
    throw new Response('Not Found', {
      status: 404,
    });
  }
  const sessionStorage = await getSessionStorage();
  const session = await sessionStorage.getSession(
    request?.headers.get('Cookie'),
  );
  const error = session.get('activeOrderError');

  const productHistory = await getProductHistoryList({
    skip: 0,
    take: 10,
    sort: { updatedAt: SortOrder.Asc },
    filter: {
      customerId: '2',
    },
  });

  return json(
    {
      error,
      productHistory,
    },
    {
      headers: {
        'Set-Cookie': await sessionStorage.commitSession(session),
      },
    },
  );
}

export default function HistoryPage() {
  const { productHistory, error } = useLoaderData<typeof loader>();

  return <HistoryProduct productHistoryList={productHistory} error={error} />;
}
