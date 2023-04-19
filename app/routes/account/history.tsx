import { useLoaderData, useTransition, useSubmit } from "@remix-run/react";
import { DataFunctionArgs, json, redirect } from "@remix-run/server-runtime";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from 'zod';
import { ValidatedForm } from "remix-validated-form";
import OrderHistoryItem from "~/components/account/OrderHistoryItem";
import { getActiveCustomerOrderList } from "~/providers/customer/customer";
import { Select } from "~/components/Select";
import { Button } from "~/components/Button";
import { OrderListOptions, SortOrder } from "~/generated/graphql";
import { ArrowPathIcon } from '@heroicons/react/24/solid';


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
    const transition = useTransition();
    const showingOrdersFrom = (appliedPaginationPage - 1) * appliedPaginationLimit + 1;
    const showingOrdersTo = showingOrdersFrom + orderList.items.length - 1;

    return (
        <div className="pt-10 relative">
            {transition.state !== "idle" && (
                <div className="absolute top-0 left-0 w-full h-full z-100 bg-white bg-opacity-75">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <ArrowPathIcon className="animate-spin h-12 w-12 text-gray-500" />
                    </div>
                </div>
            )}

            {orderList.items.length === 0 && (
                <div className="py-16 text-3xl text-center italic text-gray-300 select-none flex justify-center items-center">
                    {orderList.totalItems === 0 ? 'Your future orders will appear here' : 'No more orders, end reached'}
                </div>
            )}
            {orderList.items?.map(item => (
                // TODO: CHECK THIS ERROR OUT
                <OrderHistoryItem key={item.code} order={item} isInitiallyExpanded={true} className="mb-10" />
            ))}

            {/* Pagination */}
            <div className="flex flex-row justify-between items-center gap-4">
                <span className="self-start text-gray-500 text-sm ml-4 lg:ml-6 mt-2">Showing orders {showingOrdersFrom} to {showingOrdersTo} of {orderList.totalItems}</span>
                <ValidatedForm
                    className="flex flex-col md:flex-row justify-center items-end md:items-center gap-4 lg:gap-6"
                    validator={orderPaginationValidator}
                    method="get"
                    onChange={e => submit(e.currentTarget, { preventScrollReset: true })}
                    preventScrollReset
                >

                    <span className="flex gap-4 items-center">
                        {transition.state !== "idle" && (<ArrowPathIcon className="animate-spin h-6 w-6 text-gray-500" />)}
                        <Select
                            name="limit"
                            required
                            noPlaceholder
                            defaultValue={appliedPaginationLimit}
                        // disabled={transition.state !== "idle"}
                        // ==> Disabling this fields leads to an error showing up... 
                        >
                            {Array.from(allowedPaginationLimits).map(x => (
                                <option key={x} value={x}>{x} per Page</option>
                            ))}
                        </Select>
                    </span>

                    <div className="flex" role="group">
                        <Button
                            name="page"
                            type="submit"
                            value={appliedPaginationPage - 1}
                            disabled={appliedPaginationPage <= 1 || transition.state !== "idle"}
                            className="!text-sm rounded-r-none border-r-0"
                        >
                            Prev.
                        </Button>
                        <Button
                            name="page"
                            type="submit"
                            value={appliedPaginationPage + 1}
                            disabled={appliedPaginationPage * appliedPaginationLimit >= orderList.totalItems || transition.state !== "idle"}
                            className="!text-sm rounded-l-none"
                        >
                            Next
                        </Button>
                    </div>
                </ValidatedForm>

            </div>

        </div>
    )
}