export type StockLevel = 'IN_STOCK' | 'OUT_OF_STOCK' | 'LOW_STOCK';
import { useTranslation } from 'react-i18next';

export function StockLevelLabel({ stockLevel }: { stockLevel?: string }) {
  const { t } = useTranslation();

  let stockLevelLabel = '';
  let badgeClasses = 'bg-gray-100 text-gray-800';
  switch (stockLevel as StockLevel) {
    case 'IN_STOCK':
      stockLevelLabel = t('product.inStock');
      badgeClasses = 'bg-green-100 text-green-800';
      break;
    case 'OUT_OF_STOCK':
      stockLevelLabel = t('product.outOfStock');
      badgeClasses = 'bg-red-100 text-red-800';
      break;
    case 'LOW_STOCK':
      stockLevelLabel = t('product.lowStock');
      badgeClasses = 'bg-yellow-100 text-yellow-800';
      break;
  }

  return (
    <span
      className={
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ' +
        badgeClasses
      }
    >
      {stockLevelLabel}
    </span>
  );
}
