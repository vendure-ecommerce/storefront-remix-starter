import {
  useLoaderData,
  useSearchParams,
  useSubmit,
  V2_MetaFunction,
} from '@remix-run/react';
import { DataFunctionArgs } from '@remix-run/server-runtime';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '~/components/breadcrumbs/Breadcrumbs';
import NanoCard from '~/components/cards/NanoCard';
import ProductCard from '~/components/cards/product/ProductCard';
import UserCard from '~/components/cards/user/UserCard';
import Section from '~/components/common/section/Section';
import SectionContent from '~/components/common/section/SectionContent';
import SectionHeader from '~/components/common/section/SectionHeader';
import SectionTitle from '~/components/common/section/SectionTitle';
import { FacetFilterTracker } from '~/components/facet-filter/facet-filter-tracker';
import HorizontalFilterBar from '~/components/filter/horizontal/HorizontalFilterBar';
import FilterSidebar from '~/components/filter/sidebar/FilterSidebar';
import ListingFooter from '~/components/listing/ListingFooter';
import ListingHeader from '~/components/listing/ListingHeader';
import ListingTabs from '~/components/listing/ListingTabs';
import PageHero from '~/components/pages/PageHero';
import {
  allowedPaginationLimits,
  APP_META_TITLE,
  paginationLimitMinimumDefault,
} from '~/constants';
import { useCollections } from '~/providers/collections';
import { TArrayElement } from '~/types/types';
import { userCardDummies } from '~/utils/_fakes';
import { filteredSearchLoaderFromPagination } from '~/utils/filtered-search-loader';
import { sdk } from '../../graphqlWrapper';

export const sortOrders = [
  { label: 'Alapértelmezett', value: 'default' },
  { label: 'Drágák elöl', value: 'price-from-expensive' },
  { label: 'Olcsók elöl', value: 'price-from-cheap' },
  { label: 'Név szerint A - Z', value: 'name-a-z' },
  { label: 'Név szerint Z - A', value: 'name-z-a' },
  // { label: 'Legnagyobb kedvezmény', value: 'most-special' },
  // { label: 'Legjobbra értékelt', value: 'best-rating' },
];

export const meta: V2_MetaFunction = ({ data }: any) => {
  return [
    {
      title: data?.collection
        ? `${data.collection?.name} - ${APP_META_TITLE}`
        : APP_META_TITLE,
    },
  ];
};

const { validator, filteredSearchLoader } = filteredSearchLoaderFromPagination(
  allowedPaginationLimits,
  paginationLimitMinimumDefault,
);

export async function loader({ params, request, context }: DataFunctionArgs) {
  const {
    result,
    resultWithoutFacetValueFilters,
    facetValueIds,
    appliedPaginationLimit,
    appliedPaginationPage,
    term,
  } = await filteredSearchLoader({
    params,
    request,
    context,
  });
  const collection = (await sdk.collection({ slug: params.slug })).collection;
  if (!collection?.id || !collection?.name) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  return {
    term,
    collection,
    result,
    resultWithoutFacetValueFilters,
    facetValueIds,
    appliedPaginationLimit,
    appliedPaginationPage,
  };
}

const NoResults = () => (
  <div className="flex justify-center items-center min-h-[800px]">
    <p className="text-2xl font-bold">Nincs találat</p>
  </div>
);

export default function CollectionSlug() {
  const loaderData = useLoaderData<typeof loader>();
  const {
    collection,
    result,
    resultWithoutFacetValueFilters,
    facetValueIds,
    appliedPaginationLimit,
    appliedPaginationPage,
  } = loaderData;
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const facetValuesTracker = useRef(new FacetFilterTracker());
  facetValuesTracker.current.update(
    result,
    resultWithoutFacetValueFilters,
    facetValueIds,
  );
  const { setCollection, setCollectionItems, setSearchParams, setPagination } =
    useCollections();
  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  const { t } = useTranslation();

  const getNetPrice = (product: TArrayElement<typeof result.items>) => {
    return product.price.__typename === 'SinglePrice'
      ? product.price.value
      : product.price.__typename === 'PriceRange'
      ? product.price.min
      : -1;
  };

  const getGrossPrice = (
    product: TArrayElement<typeof result.items>,
    max = false,
  ) => {
    return product.priceWithTax.__typename === 'SinglePrice'
      ? product.priceWithTax.value
      : product.priceWithTax.__typename === 'PriceRange' && !max
      ? product.priceWithTax.min
      : product.priceWithTax.__typename === 'PriceRange' && max
      ? product.priceWithTax.max
      : -1;
  };

  const onListingTabChange = (tab: string) => {
    const formData = new FormData();
    formData.set('order', tab);

    for (const [key, value] of searchParams) {
      if (key !== 'order') {
        formData.append(key, value);
      }
    }

    submit(formData, { method: 'get', preventScrollReset: true });
  };

  useEffect(() => {
    setSearchParams(searchParams);
  }, [searchParams]);

  useEffect(() => {
    setPagination({
      limit: appliedPaginationLimit,
      page: appliedPaginationPage,
    });
    setCollectionItems(result);
    setCollection(collection);
  }, [loaderData]);

  return (
    <>
      <div className="grid grid-cols-1 gap-x-[4.5rem] lg:grid-cols-[20rem_minmax(0,_1fr)]">
        <FilterSidebar
          collection={collection}
          facetValuesTracker={facetValuesTracker}
        />
        <main className="flex max-w-full flex-col gap-16 pt-12">
          <Breadcrumbs
            page="collections"
            items={collection.breadcrumbs.filter(
              (b) => b.slug !== '__root_collection__',
            )}
          />
          <div className="flex flex-col gap-8">
            <PageHero
              title={collection.name}
              description={collection.description}
              imageSrc={collection.featuredAsset?.preview}
            />
            {collection.children && (
              <Section>
                <SectionHeader className="hidden">
                  <SectionTitle
                    level="h2"
                    title="További kategóriák"
                    className="text-2xl"
                    srOnly
                  />
                </SectionHeader>
                <SectionContent
                  className="flex flex-wrap gap-6"
                  layoutType="grid"
                >
                  {collection.children.map((subcategory, index) => (
                    <NanoCard
                      key={index}
                      title={subcategory.name}
                      link={`/collections/${subcategory.slug}`}
                      imageSrc={subcategory.featuredAsset?.preview}
                    />
                  ))}
                </SectionContent>
              </Section>
            )}
          </div>
          <Section>
            <SectionHeader>
              <SectionTitle
                level="h2"
                title="Ingyenes szaktanácsadás szakértőinktől:"
                className="text-xl"
              />
            </SectionHeader>
            <SectionContent
              className="flex flex-wrap gap-6"
              layoutType="default"
            >
              {userCardDummies.map((props, index) => (
                <UserCard key={index} {...props} />
              ))}
            </SectionContent>
          </Section>
          <HorizontalFilterBar />
          <div className="flex w-full flex-col gap-8">
            <ListingHeader
              showListingInfo={true}
              showProductCompareSwitch={false}
              showListingOrder={true}
            />
            {result.items && result.items.length > 0 && (
              <ListingTabs
                tabs={sortOrders}
                value={searchParams.get('order') ?? 'default'}
                onChange={onListingTabChange}
              >
                {result.items.length !== 0 &&
                  result.items.map((option, index) => {

                    const productFacets = result.facetValues.filter(
                      (facetValue) => {
                        return option.facetValueIds.includes(
                          facetValue.facetValue.id,
                        );
                      },
                    );
                    return (
                      <ProductCard
                        key={index}
                        id={option.productVariantId}
                        title={option.productName}
                        link={`/products/${option.slug}`}
                        number={'1'}
                        priceCrossed={getGrossPrice(option, true)}
                        priceNormal={getGrossPrice(option)}
                        priceNet={getNetPrice(option)}
                        imageSrc={option.productAsset?.preview ?? ''}
                        hoverImageSrc={option.productAsset?.preview ?? ''}
                        rating={1}
                        reviews={1}
                        manufacturer={
                          [
                            // Nincs olyan collection ami egy-egy brandet lefedne, nincs értelme renderelni így
                          ]
                        }
                        productTags={[
                          ...productFacets
                            .filter(
                              (facetValue) =>
                                facetValue.facetValue.facet.name !== 'Brand' &&
                                facetValue.facetValue.facet.name !== 'Category',
                            )
                            .map((facetValue) => {
                              return `${facetValue.facetValue.facet.name}: ${facetValue.facetValue.name}`;
                            }),
                        ]}
                      />
                    );
                  })}
                {result.items.length === 0 && <NoResults />}
              </ListingTabs>
            )}
            <Section>
              <SectionHeader className="hidden">
                <SectionTitle
                  className="text-5xl"
                  level="h2"
                  title="Arcadia evőeszköz család"
                  srOnly
                />
              </SectionHeader>
              {/* <SectionContent
                className="grid grid-cols-2 gap-item sm:grid-cols-[repeat(auto-fill,_minmax(13rem,_1fr))]"
                layoutType="grid"
              >
                {productOptions.slice(0, 8).map((option, index) => (
                  <ProductCard
                    key={index}
                    id={option.id}
                    title={option.title}
                    link={option.link}
                    number={option.number}
                    priceNormal={option.priceNormal}
                    priceNet={option.priceNet}
                    priceCrossed={option.priceCrossed}
                    imageSrc={option.imageSrc}
                    hoverImageSrc={option.hoverImageSrc}
                    rating={option.rating}
                    reviews={option.reviews}
                    manufacturer={option.manufacturer}
                  />
                ))}
              </SectionContent> */}
            </Section>
            <ListingFooter />
          </div>
        </main>
      </div>
    </>
  );
}

export function CatchBoundary() {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
        {t('product.collectionNotFound')}
      </h2>
      <div className="mt-6 grid sm:grid-cols-5 gap-x-4">
        <div className="space-y-6">
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div className="sm:col-span-5 lg:col-span-4">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <div className="h-64 bg-slate-200 rounded"></div>
            <div className="h-64 bg-slate-200 rounded"></div>
            <div className="h-64 bg-slate-200 rounded"></div>
            <div className="h-64 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
