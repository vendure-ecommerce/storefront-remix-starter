import { FacetFilterTracker } from '~/components/facet-filter/facet-filter-tracker';
import { ComponentProps } from 'react';

export function NoResultsHint({
  facetFilterTracker,
  ...props
}: { facetFilterTracker?: FacetFilterTracker } & ComponentProps<'div'>) {
  return (
    <div {...props}>
      <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-gray-900">
        No results!
      </h2>
      {facetFilterTracker?.facetsWithValues.some((f) =>
        f.values.some((v) => v.selected),
      ) && (
        <h3 className="text-lg sm:text-2xl font-light tracking-tight text-gray-900">
          Try changing your filter settings.
        </h3>
      )}
    </div>
  );
}
