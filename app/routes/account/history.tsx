import OrderHistoryItem from "~/components/account/OrderHistoryItem";
import { Order } from "~/generated/graphql";

export default function AccountHistory() {

    const orders/*: Order[]*/ = [
        { code: "example01", lines: [ { code: "xyz" }, ] },
        { code: "example02", lines: [ { code: "abc" }, { code: "def" }, ] },
    ];
    
    return (
        <div className="pt-10">

        {orders.length === 0 && (
        <div className="pt-16 text-3xl text-center italic text-gray-300 select-none flex justify-center items-center">
            Your future orders will appear here
        </div>
        )}
        {orders?.map(item => (
            <OrderHistoryItem key={item.code} order={item} isInitiallyExpanded={true} />
        ))}
            
        </div>
    )
}