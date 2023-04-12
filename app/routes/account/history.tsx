import { useLoaderData } from "@remix-run/react";
import { DataFunctionArgs, json, redirect } from "@remix-run/server-runtime";
import OrderHistoryItem from "~/components/account/OrderHistoryItem";
import { getActiveCustomerOrderList } from "~/providers/customer/customer";



export async function loader({ request }: DataFunctionArgs) {
    const res = await getActiveCustomerOrderList({ request });
    if (!res.activeCustomer) {
        return redirect('/sign-in');
    }
    return json({ orderList: res.activeCustomer.orders });
}


export default function AccountHistory() {
    const { orderList } = useLoaderData<typeof loader>();

    return (
        <div className="pt-10">

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