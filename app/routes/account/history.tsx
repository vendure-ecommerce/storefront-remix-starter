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



export async function loader({ request }: DataFunctionArgs) {
    const res = await getActiveCustomerOrderList({ request });
    if (!res.activeCustomer) {
        return redirect('/sign-in');
    }
    return json({ orderList: res.activeCustomer.orders });
}


export const orderPaginationValidator = withZod(
    z.object({
        limit: z.number({
                required_error: "Limit is required",
                invalid_type_error: "Limit must be a number",
                coerce: true,
            })
            .min(10, { message: 'Limit must be at least 10' })
            .max(50, { message: 'Maximum limit is 50' }),
        offset: z.number({
                required_error: "Offset is required",
                invalid_type_error: "Offset must be a number",
                coerce: true,
            })
            .min(0, { message: 'Offset must be at least 0' })
    }),
);


export default function AccountHistory() {
    const { orderList } = useLoaderData<typeof loader>();
    const [paginationOffset, setPaginationOffset] = useState<number>(0);
    const [paginationLimit, setPaginationLimit] = useState<number>(10);
    
    return (
        <div className="pt-10">

            {/* Pagination Helper - Bottom too? Later. */}
            <div className="flex flex-row justify-between items-center">
                <span>Showing orders {paginationOffset+1} to {paginationOffset + orderList.items.length} of {orderList.totalItems}</span>
                <ValidatedForm id="orderPagination"
                    className="flex flex-col md:flex-row gap-4"
                    validator={orderPaginationValidator}
                    // method="post" // TODO
                    onSubmit={() => { }} // TODO
                    defaultValues={{
                        offset: 0,
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
                <div className="pt-16 text-3xl text-center italic text-gray-300 select-none flex justify-center items-center">
                    Your future orders will appear here
                </div>
            )}
            {orderList.items?.map(item => (
                <OrderHistoryItem key={item.code} order={item} isInitiallyExpanded={true} />
            ))}

        </div>
    )
}