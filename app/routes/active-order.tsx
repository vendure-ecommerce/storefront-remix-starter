import { getActiveOrder, addItemToOrder, adjustOrderLine, removeOrderLine } from '~/providers/orders/order';
import { DataFunctionArgs, json } from '@remix-run/server-runtime';
import { ErrorResult, OrderDetailFragment } from '~/generated/graphql';
import { sessionStorage } from '~/sessions';

export type CartLoaderData = Awaited<ReturnType<typeof loader>>;

export async function loader({request}: DataFunctionArgs) {
    return {
        activeOrder: await getActiveOrder({request}),
    };
}

export async function action({request, params}: DataFunctionArgs) {
    const body = await request.formData();
    let activeOrder: OrderDetailFragment | undefined = undefined;
    let error: ErrorResult | undefined;
    if (body.get("action") === 'removeItem') {
        const lineId = body.get("lineId");
        const result = await removeOrderLine(lineId?.toString() ?? '', {request});
        if (result.removeOrderLine.__typename === 'Order') {
            activeOrder = result.removeOrderLine;
        } else {
            error = result.removeOrderLine;
        }
    } else if (body.get("action") === 'adjustItem') {
        const lineId = body.get("lineId");
        const quantity = body.get("quantity");
        if (lineId && quantity != null) {
            const result = await adjustOrderLine(lineId?.toString(), +quantity, {request});
            if (result.adjustOrderLine.__typename === 'Order') {
                activeOrder = result.adjustOrderLine;
            } else {
                error = result.adjustOrderLine;
            }
        }
    } else {
        const variantId = body.get("variantId")?.toString();
        const quantity = Number(body.get("quantity")?.toString() ?? 1);
        if (!variantId || !(quantity > 0)) {
            throw new Error(`Invalid input: variantId ${variantId}, quantity ${quantity}`);
        }
        const result = await addItemToOrder(variantId, quantity, {request});
        if (result.addItemToOrder.__typename === 'Order') {
            activeOrder = result.addItemToOrder;
        } else {
            error = result.addItemToOrder;
        }
    }
    let headers: ResponseInit['headers'] = {};
    if (error) {
        const session = await sessionStorage.getSession(request?.headers.get('Cookie'));
        session.flash('activeOrderError', error);
        headers = {
            "Set-Cookie": await sessionStorage.commitSession(session)
        };
    }
    return json({activeOrder: activeOrder || await getActiveOrder({request})}, {
        headers,
    });
}
