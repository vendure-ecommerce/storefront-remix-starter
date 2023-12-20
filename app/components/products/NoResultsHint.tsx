import { FacetFilterTracker } from '~/components/facet-filter/facet-filter-tracker';
import { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

export function NoResultsHint({
  facetFilterTracker,
  ...props
}: { facetFilterTracker?: FacetFilterTracker } & ComponentProps<'div'>) {
  const { t } = useTranslation();

  return (
    <div {...props}>
      <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-gray-900">
        {t('product.noResults')}
      </h2>
      {facetFilterTracker?.facetsWithValues.some((f) =>
        f.values.some((v) => v.selected),
      ) && (
        <h3 className="text-lg sm:text-2xl font-light tracking-tight text-gray-900">
          {t('product.filterTip')}
        </h3>
      )}
    </div>
  );
}
