import { useLoaderData, useSubmit } from "@remix-run/react";
import { DataFunctionArgs, json, redirect } from "@remix-run/server-runtime";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from 'zod';
import { ValidatedForm } from "remix-validated-form";
import OrderHistoryItem from "~/components/account/OrderHistoryItem";
import { getActiveCustomerOrderList } from "~/providers/customer/customer";
import { Select } from "~/components/Select";
import { Button } from "~/components/Button";
import { OrderListOptions, SortOrder } from "~/generated/graphql";


const paginationLimitMinimumDefault = 1;
const allowedPaginationLimits = new Set<number>([paginationLimitMinimumDefault, 2, 3]);
const paginationLimitDerivedMax = Math.max(...Array.from(allowedPaginationLimits));
const orderPaginationLimitSchema = z
    .number({
        required_error: "Limit is required",
        invalid_type_error: "Limit must be a number",
        coerce: true,
    })
    .int()
    .min(paginationLimitMinimumDefault, { message: `Limit must be at least ${paginationLimitMinimumDefault}` })
    .max(paginationLimitDerivedMax, { message: `Maximum limit is ${paginationLimitDerivedMax}` })
    .refine(x => allowedPaginationLimits.has(x))

const orderPaginationPageSchema = z
    .number({
        required_error: "Page is required",
        invalid_type_error: "Page must be a number",
        coerce: true,
    })
    .int()
    .min(1, { message: 'Page must be at least 1' })
    .max(1000, { message: "Page can't be over 1000" })

const orderPaginationSchema = z
    .object({
        limit: orderPaginationLimitSchema,
        page: orderPaginationPageSchema,
    })

export const orderPaginationValidator = withZod(orderPaginationSchema);



export async function loader({ request }: DataFunctionArgs) {
    const url = new URL(request.url);
    // Careful params are user controllable data - never blindly trust it!
    // Use the .default fallbacks in case that params are undefined i.e. `null`
    const limit = url.searchParams.get("limit") ?? paginationLimitMinimumDefault;
    const page = url.searchParams.get("page") ?? 1;

    // Validate, if we fail we redirect to default params
    // We could provide error information but under normal usage this shouldnt happen because
    // we also validate on client side, which means we should only land here if the user
    // opens a manually modified or no longer supported url
    const zodResult = orderPaginationSchema.safeParse({ limit, page });
    if (!zodResult.success) {
        url.search = '';
        return redirect(url.href)
    }

    // From here on data is safe - Construct the options for vendure
    const orderListOptions: OrderListOptions = {
        take: zodResult.data.limit,
        skip: (zodResult.data.page - 1) * zodResult.data.limit, // Page is one-base-indexed so we gotta decrement first
        sort: { createdAt: SortOrder.Desc },
        filter: { active: { eq: false } },
    };

    const res = await getActiveCustomerOrderList(orderListOptions, { request });
    if (!res.activeCustomer) {
        return redirect('/sign-in');
    }
    return json({
        orderList: res.activeCustomer.orders,
        appliedPaginationLimit: zodResult.data.limit,
        appliedPaginationPage: zodResult.data.page,
    });
}



export default function AccountHistory() {
    const { orderList, appliedPaginationLimit, appliedPaginationPage } = useLoaderData<typeof loader>();
    const submit = useSubmit();
    const showingOrdersFrom = (appliedPaginationPage-1) * appliedPaginationLimit + 1;
    const showingOrdersTo = showingOrdersFrom + appliedPaginationLimit - 1;

    return (
        <div className="pt-10">

            {/* Pagination Helper - Bottom too? Later. */}
            <div className="flex flex-row justify-between items-center">
                {/* TODO: REDO THIS LABEL */}
                <span>Showing orders {showingOrdersFrom} to {showingOrdersTo} of {orderList.totalItems}</span>
                <ValidatedForm
                    className="flex flex-col md:flex-row gap-4"
                    validator={orderPaginationValidator}
                    method="get"
                    onChange={e => submit(e.currentTarget)}
                    preventScrollReset
                >
                    <Select
                        name="limit"
                        required
                        noPlaceholder
                        defaultValue={appliedPaginationLimit}
                    >
                        {Array.from(allowedPaginationLimits).map(x => (
                            <option key={x} value={x}>{x} per Page</option>
                        ))}
                    </Select>

                    <Button
                        type="submit"
                        value={appliedPaginationPage-1}
                        name="page"
                        disabled={appliedPaginationPage <= 1}
                    >
                        Prev.
                    </Button>

                    <Button
                        type="submit"
                        value={appliedPaginationPage+1}
                        name="page"
                        disabled={appliedPaginationPage * appliedPaginationLimit >= orderList.totalItems}
                    >
                        Next
                    </Button>
                </ValidatedForm>

            </div>

            {orderList.items.length === 0 && (
                <div className="pt-16 text-3xl text-center italic text-gray-300 select-none flex justify-center items-center">
                    {orderList.totalItems === 0 ? 'Your future orders will appear here' : 'No more orders, end reached'}
                </div>
            )}
            {orderList.items?.map(item => (
                // TODO: CHECK THIS ERROR OUT
                <OrderHistoryItem key={item.code} order={item} isInitiallyExpanded={true} />
            ))}

        </div>
    )
}