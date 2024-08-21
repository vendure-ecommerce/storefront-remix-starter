import { PhotoIcon } from "@heroicons/react/24/solid";
import { FetcherWithComponents, json, MetaFunction, ShouldRevalidateFunction, useLoaderData, useOutletContext } from "@remix-run/react";
import { DataFunctionArgs } from "@remix-run/server-runtime";
import { useTranslation } from "react-i18next";
import { APP_META_TITLE } from "~/constants";
import { ErrorResult } from "~/generated/graphql";
import { getProductBySlug } from "~/providers/products/products";
import { getSessionStorage } from "~/sessions";
import { CartLoaderData } from "../api/active-order";
import { useState } from "react";
import FilterSidebar from "~/components/filter/sidebar/FilterSidebar";
import Section from "~/components/common/section/Section";
import ProductImage from "~/components/common/product/ProductImage";
import ProductGallery from "~/components/common/product/ProductGallery";
import ManufacturerAvatar from "~/components/avatar/ManufacturerAvatar";
import ProductNumber from "~/components/common/product/ProductNumber";
import ProductAvailability from "~/components/common/product/ProductAvailability";
import PageTitle from "~/components/pages/PageTitle";
import ProductTitle from "~/components/common/product/ProductTitle";
import ProductRating from "~/components/common/product/ProductRating";
import ProductPriceCrossed from "~/components/common/product/ProductPriceCrossed";
import ProductPriceNormal from "~/components/common/product/ProductPriceNormal";
import ProductPriceNet from "~/components/common/product/ProductPriceNet";
import SectionHeader from "~/components/common/section/SectionHeader";
import { Avatar } from "@radix-ui/react-avatar";
import SectionTitle from "~/components/common/section/SectionTitle";
import { Badge } from "~/components/ui/badge";
import SectionDescription from "~/components/common/section/SectionDescription";
import HorizontalProductCard from "~/components/cards/product/HorizontalProductCard";
import { Button } from "~/components/ui/button";
import { ChevronRight } from "lucide-react";
import SectionContent from "~/components/common/section/SectionContent";
import Summary from "~/components/common/summary/Summary";
import SummaryItem from "~/components/common/summary/SummaryItem";
import SummaryProductTotal from "~/components/common/summary/SummaryProductTotal";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { useCollections } from "~/providers/collections";

export const meta: MetaFunction = ({ data }) => {
  return [
    {
      title: data?.product?.name
        ? `${data.product.name} - ${APP_META_TITLE}`
        : APP_META_TITLE,
    },
  ];
};

export async function loader({ params, request }: DataFunctionArgs) {
  const { product } = await getProductBySlug(params.slug!, { request });
  if (!product) {
    throw new Response('Not Found', {
      status: 404,
    });
  }
  const sessionStorage = await getSessionStorage();
  const session = await sessionStorage.getSession(
    request?.headers.get('Cookie'),
  );
  const error = session.get('activeOrderError');
  return json(
    { product: product!, error },
    {
      headers: {
        'Set-Cookie': await sessionStorage.commitSession(session),
      },
    },
  );
}

export const shouldRevalidate: ShouldRevalidateFunction = () => true;

export default function ProductSlug() {
  const { product, error } = useLoaderData<typeof loader>();
  const { activeOrderFetcher } = useOutletContext<{
    activeOrderFetcher: FetcherWithComponents<CartLoaderData>;
  }>();
  const { activeOrder } = activeOrderFetcher.data ?? {};
  const addItemToOrderError = getAddItemToOrderError(error);
  const { t } = useTranslation();

  if (!product) {
    return <div>{t('product.notFound')}</div>;
  }

  const findVariantById = (id: string) =>
    product.variants.find((v) => v.id === id);

  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0].id,
  );
  const selectedVariant = findVariantById(selectedVariantId);
  if (!selectedVariant) {
    setSelectedVariantId(product.variants[0].id);
  }

  const qtyInCart =
    activeOrder?.lines.find((l) => l.productVariant.id === selectedVariantId)
      ?.quantity ?? 0;

  const asset = product.assets[0];
  const brandName = product.facetValues.find(
    (fv) => fv.facet.code === 'brand',
  )?.name;

  const [featuredAsset, setFeaturedAsset] = useState(
    selectedVariant?.featuredAsset,
  );

  const category = product.facetValues.find(fv => fv.facet.name === 'Category');

  return (
    <>
      <div className='mx-auto w-full px-6 lg:max-w-screen-2xl'>
        <div className="mb-16"></div>
        <Section className='mx-auto grid max-w-screen-sm grid-cols-1 gap-16 lg:max-w-full lg:grid-cols-2 lg:gap-20 px-6'>
          <div className='flex flex-auto flex-col gap-4 self-start lg:sticky lg:top-[14rem] lg:flex-row'>
            <ProductImage
              className='rounded-lg bg-primary/5'
              src={product.featuredAsset?.preview || product.assets[0].preview}
            />
            <ProductGallery
              images={product.assets.filter((asset) => asset.id !== product.featuredAsset?.id)}
            />
          </div>

          <div className='flex flex-col gap-16'>
            <div className='flex w-full flex-col gap-8'>
              {category && (
                <div className='flex items-center justify-between gap-4'>
                  <ManufacturerAvatar manufacturer={{ title: category.name as string, link: `/collections/${category.code}` , imageSrc: '' }} />
                  <ProductNumber number={product.variants[0].sku} />
                </div>
              )}
              <div className='flex flex-col gap-2'>
                <ProductAvailability className='text-base'></ProductAvailability>
                <PageTitle className='text-3xl font-bold tracking-tight'>
                  <ProductTitle title={product.name} />
                </PageTitle>
                {/* <ProductRating
                  rating={product.rating}
                  totalReviews={product.reviews}
                /> */}
              </div>
              <div>
                <ProductPriceCrossed priceCrossed={product.variants[0].priceWithTax} />
                <ProductPriceNormal
                  priceNormal={product.variants[0].priceWithTax}
                  className='text-3xl'
                />
                <ProductPriceNet priceNet={product.variants[0].priceWithTax} />
              </div>
            </div>

            <div className='hidden'>
              {[...Array(3)].map((_, index) => (
                <Section key={index} className='gap-6 p-0'>
                  <SectionHeader>
                    <div className='flex items-center gap-4'>
                      <Avatar className='h-14 w-14 items-center justify-center bg-primary text-xl font-bold text-color-primary-foreground'>
                        1
                      </Avatar>
                      <SectionTitle
                        level='h3'
                        title='Kapcsolat neve'
                        className='text-xl'
                      />
                      <Badge
                        variant={"secondary"}
                        className='ml-auto h-10 px-4 text-base'
                      >
                        2 kötelező
                      </Badge>
                    </div>
                    <SectionDescription>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Similique quisquam iusto quas voluptatibus fuga earum,
                      corporis esse? Esse quos omnis et autem nemo porro. Modi
                      molestiae minus assumenda facilis! Odio!
                    </SectionDescription>
                  </SectionHeader>
                  {[...Array(3)].map((_, index) => (
                    <HorizontalProductCard
                      key={index}
                      title={product.name}
                      number={"1"}
                      priceNormal={product.variants[0].priceWithTax}
                      priceNet={product.variants[0].priceWithTax}
                      priceCrossed={product.variants[0].priceWithTax}
                      imageSrc={product.assets[0].preview}
                    />
                  ))}
                  <Button variant={"outline"}>
                    Továbbiak megjelenítése
                    <ChevronRight className='ml-2 h-4 w-4' />
                  </Button>
                </Section>
              ))}

              <Section>
                <SectionHeader className='hidden'>
                  <SectionTitle level='h3' title='Összesítő táblázat' srOnly />
                </SectionHeader>
                <SectionContent className='grid grid-cols-1 gap-4'>
                  <Summary>
                    {[...Array(5)].map((_, index) => (
                      <SummaryItem key={index} />
                    ))}
                    <SummaryProductTotal className='text-2xl font-bold' />
                  </Summary>
                </SectionContent>
              </Section>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}

export function CatchBoundary() {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
        {t('product.notFound')}
      </h2>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start mt-4 md:mt-12">
        {/* Image gallery */}
        <div className="w-full max-w-2xl mx-auto sm:block lg:max-w-none">
          <span className="rounded-md overflow-hidden">
            <div className="w-full h-96 bg-slate-200 rounded-lg flex content-center justify-center">
              <PhotoIcon className="w-48 text-white"></PhotoIcon>
            </div>
          </span>
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <div className="">{t('product.notFoundInfo')}</div>
          <div className="flex-1 space-y-3 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getAddItemToOrderError(error?: ErrorResult): string | undefined {
  if (!error || !error.errorCode) {
    return undefined;
  }
  switch (error.errorCode) {
    case ErrorCode.OrderModificationError:
    case ErrorCode.OrderLimitError:
    case ErrorCode.NegativeQuantityError:
    case ErrorCode.InsufficientStockError:
      return error.message;
  }
}
