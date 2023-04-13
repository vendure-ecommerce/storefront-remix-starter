// Copied from https://www.vendure.io/docs/typescript-api/orders/order-state/
type OrderState = | 'Created'
    | 'Draft'
    | 'AddingItems'
    | 'ArrangingPayment'
    | 'PaymentAuthorized'
    | 'PaymentSettled'
    | 'PartiallyShipped'
    | 'Shipped'
    | 'PartiallyDelivered'
    | 'Delivered'
    | 'Modifying'
    | 'ArrangingAdditionalPayment'
    | 'Cancelled'
// | keyof CustomOrderStates

// References - with dark mode support
// <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Blue</span>
// <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">Gray</span>
// <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Green</span>
// <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Yellow</span>
// <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">Indigo</span>
// <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Purple</span>
// <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300">Pink</span>

// Lookup can be replaced once theres i18n support, for now simply pick with a fallback
const map = new Map<string, string>([
    ['Draft', 'Draft'],
    ['AddingItems', 'Adding items'],
    ['ArrangingPayment', 'Awaiting payment'],
    ['PaymentAuthorized', 'Payment authorized'],
    ['PaymentSettled', 'Payment settled'],
    ['PartiallyShipped', 'Partially shipped'],
    ['Shipped', 'Shipped'],
    ['PartiallyDelivered', 'Partially delivered'],
    ['Delivered', 'Delivered'],
    ['Modifying', 'Modifying'],
    ['ArrangingAdditionalPayment', 'Awaiting payment'],
    ['Cancelled', 'Cancelled'],
    ['Unknown', 'Unknown'],
]);

export function OrderStateBadge({ state }: { state?: string }) {
    
    let label = map.get(state ?? "Unknown") ?? "Unknown";
    let colorClasses = '';
    switch (state as OrderState) {
        default:
        case "Draft":
        case "AddingItems":
            colorClasses = "bg-gray-100 text-gray-800";
            break;
        case "PaymentAuthorized":
        case "PaymentSettled":
        case "Shipped":
            colorClasses = "bg-blue-100 text-blue-800";
            break;
        case "Delivered":
            colorClasses = "bg-green-100 text-green-800";
            break;
        case "PartiallyShipped":
        case "PartiallyDelivered":
        case "Modifying":
        case "ArrangingPayment":
        case "ArrangingAdditionalPayment":
            colorClasses = "bg-yellow-100 text-yellow-800";
            break;
        case "Cancelled":
            colorClasses = "bg-red-100 text-red-800";
            break;
    }

    return (
        <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded uppercase whitespace-nowrap ${colorClasses}`}>{label}</span>
    );

}
