import { ActionFunctionArgs, json } from '@remix-run/server-runtime';
import { SortOrder } from '~/generated/graphql';
import {
  addProductToProductHistory,
  getProductHistory,
  getProductHistoryList,
  updateProductHistory,
} from '~/providers/product-histroy/product-history';

export async function action({ request, params }: ActionFunctionArgs) {
  const body = await request.formData();
  const variantId = body.get('variantId') as string;
  const customerId = body.get('customerId') as string;

  const productHistory = await getProductHistory({
    productVariantId: variantId,
    customerId: customerId,
  });

  if (!productHistory.productHistory) {
    addProductToProductHistory({
      productVariantId: variantId,
      customerId: customerId,
    });
  } else {
    updateProductHistory({
      id: productHistory.productHistory.id,
      updatedAt: new Date(),
    });
  }

  const valami = await getProductHistoryList({
    skip: 0,
    take: 10,
    sort: { updatedAt: SortOrder.Asc },
    filter: {
      customerId: customerId,
    },
  });

  return json({ hello: 'world' });
}
