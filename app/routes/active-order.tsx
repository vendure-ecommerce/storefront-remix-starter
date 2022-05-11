import { activeOrder, addItemToOrder, adjustOrderLine, removeOrderLine } from '~/providers/orders/order';
import { DataFunctionArgs } from '@remix-run/server-runtime';

export type CartLoaderData = Awaited<ReturnType<typeof loader>>;

export async function loader({request}: DataFunctionArgs) {
    return {
        activeOrder: await activeOrder({request}),
    };
}

export async function action({request, params}: DataFunctionArgs) {
    const body = await request.formData();
    if (body.get("action") === 'removeItem') {
        const lineId = body.get("lineId");
        if (lineId) {
            const result = await removeOrderLine(lineId?.toString(), {request});
            return {activeOrder: result.removeOrderLine}
        }
    } else if (body.get("action") === 'adjustItem') {
        const lineId = body.get("lineId");
        const quantity = body.get("quantity");
        if (lineId && quantity != null) {
            const result = await adjustOrderLine(lineId?.toString(), +quantity, {request});
            return {activeOrder: result.adjustOrderLine}
        }
    } else {
        const variantId = body.get("variantId")?.toString();
        const quantity = Number(body.get("quantity")?.toString() ?? 1);
        if (!variantId || !(quantity > 0)) {
            return {errors: ["Oops, invalid input" + quantity + variantId]};
        }
        const result = await addItemToOrder(variantId, quantity, {request});
        return {activeOrder: result.addItemToOrder}
    }
}
