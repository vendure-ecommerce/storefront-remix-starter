import { useLoaderData } from "@remix-run/react";
import { DataFunctionArgs, json, redirect } from "@remix-run/server-runtime";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from 'zod';
import { ValidatedForm } from "remix-validated-form";
import OrderHistoryItem from "~/components/account/OrderHistoryItem";
import { getActiveCustomerOrderList } from "~/providers/customer/customer";
import { Select } from "~/components/Select";
import { useState } from "react";
import { Input } from "~/components/Input";
import { Button } from "~/components/Button";
import { OrderListOptions, SortOrder } from "~/generated/graphql";



const orderPaginationLimitSchema = z
    .number({
        required_error: "Limit is required",
        invalid_type_error: "Limit must be a number",
        coerce: true,
    })
    .min(10, { message: 'Limit must be at least 10' })
    .max(50, { message: 'Maximum limit is 50' })
    .default(10);

const orderPaginationPageSchema = z
    .number({
        required_error: "Page is required",
        invalid_type_error: "Page must be a number",
        coerce: true,
    })
    .min(1, { message: 'Page must be at least 1' })
    .max(1000, { message: "Page can't be over 1000" })
    .default(1); // One based index

const orderPaginationSchema = z
    .object({
        limit: orderPaginationLimitSchema,
        page: orderPaginationPageSchema,
    })
    .default({});

export const orderPaginationValidator = withZod(orderPaginationSchema);



export async function loader({ request }: DataFunctionArgs) {
    const url = new URL(request.url);
    // Careful params are user controllable data - never blindly trust it!
    // Use the .default fallbacks in case that params are undefined i.e. `null`
    const limit = url.searchParams.get("limit") ?? orderPaginationLimitSchema.parse(undefined);
    const page = url.searchParams.get("page") ?? orderPaginationPageSchema.parse(undefined); 

    // Validate, if we fail we redirect to default params
    // We could provide error information but under normal usage this shouldnt happen because
    // we also validate on client side, which means we should only land here if the user
    // opens a manually modified or no longer supported url
    const zodResult = orderPaginationSchema.safeParse({ limit, page });
    if (!zodResult.success) {
        url.searchParams.delete("limit");
        url.searchParams.delete("page");
        return redirect(url.toString())
    }

    // From here on data is safe - Construct the options for vendure
    const orderListOptions: OrderListOptions = {
        take: zodResult.data.limit,
        skip: (zodResult.data.page - 1) * zodResult.data.limit, // Page is one-base-indexed so we gotta decrement first
        sort: { createdAt: SortOrder.Desc }
    };

    const res = await getActiveCustomerOrderList(orderListOptions, { request });
    if (!res.activeCustomer) {
        return redirect('/sign-in');
    }
    return json({ orderList: res.activeCustomer.orders });
}



export default function AccountHistory() {
    const { orderList } = useLoaderData<typeof loader>();
    const [paginationOffset, setPaginationOffset] = useState<number>(0);
    // TODO: SET THE LIMIT ACCORDING TO CURRENT SEARCH PARAMS SO THAT THE 
    // SELECT FIELD SHOWS THE CURRENT OPTION
    const [paginationLimit, setPaginationLimit] = useState<number>(10);
    

    return (
        <div className="pt-10">

            {/* Pagination Helper - Bottom too? Later. */}
            <div className="flex flex-row justify-between items-center">
                {/* TODO: REDO THIS LABEL */}
                <span>Showing orders -- to -- of {orderList.totalItems}</span>
                <ValidatedForm id="orderPagination"
                    className="flex flex-col md:flex-row gap-4"
                    validator={orderPaginationValidator}
                    // method="post" // TODO
                    onSubmit={() => { }} // TODO
                    defaultValues={{
                        page: 1,
                    }}
                >
                    <Select
                        name="limit"
                        required
                        noPlaceholder
                        value={paginationLimit}
                        onChangeCapture={e => setPaginationLimit(parseInt(e.currentTarget.value))}
                    >
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                        <option value={50}>50 per page</option>
                    </Select>

                    {/* TODO */}
                    {/* <Button
                        disabled={paginationOffset == 0}
                        onClick={ () => alert("TODO") }
                    >
                        Previous
                    </Button>
                    <Button
                        disabled={paginationOffset + paginationLimit >= orderList.totalItems}
                        onClick={ () => alert("TODO") }
                    >
                        Next
                    </Button> */}
                </ValidatedForm>

            </div>

            {orderList.items.length === 0 && (
                // TODO: ORDERS CAN BE EMPTY DUE TO PAGINATION, WHICH MAKES THIS MESSAGE MISLEADING
                // WE CAN CALCULATE
                <div className="pt-16 text-3xl text-center italic text-gray-300 select-none flex justify-center items-center">
                    Your future orders will appear here
                </div>
            )}
            {orderList.items?.map(item => (
                // TODO: CHECK THIS ERROR OUT
                <OrderHistoryItem key={item.code} order={item} isInitiallyExpanded={true} />
            ))}

        </div>
    )
}