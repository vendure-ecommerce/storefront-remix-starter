import { useTranslation } from 'react-i18next';

// Copied from https://www.vendure.io/docs/typescript-api/orders/order-state/
type OrderState =
  | 'Created'
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
  | 'Cancelled';

export function OrderStateBadge({ state }: { state?: string }) {
  const { t } = useTranslation();

  let colorClasses = '';
  switch (state as OrderState) {
    default:
    case 'Draft':
    case 'AddingItems':
      colorClasses = 'bg-gray-100 text-gray-800';
      break;
    case 'PaymentAuthorized':
    case 'PaymentSettled':
    case 'Shipped':
      colorClasses = 'bg-blue-100 text-blue-800';
      break;
    case 'Delivered':
      colorClasses = 'bg-green-100 text-green-800';
      break;
    case 'PartiallyShipped':
    case 'PartiallyDelivered':
    case 'Modifying':
    case 'ArrangingPayment':
    case 'ArrangingAdditionalPayment':
      colorClasses = 'bg-yellow-100 text-yellow-800';
      break;
    case 'Cancelled':
      colorClasses = 'bg-red-100 text-red-800';
      break;
  }

  return (
    <span
      className={`text-xs font-medium px-2.5 py-0.5 rounded uppercase whitespace-nowrap ${colorClasses}`}
    >
      {t(`order.states.${state}`) ?? t(`order.states.Unknown`)}
    </span>
  );
}
