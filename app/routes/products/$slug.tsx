import { PhotoIcon } from '@heroicons/react/24/solid';
import { Collapsible } from '@radix-ui/react-collapsible';
import {
  FetcherWithComponents,
  json,
  MetaFunction,
  ShouldRevalidateFunction,
  useLoaderData,
  useOutletContext,
} from '@remix-run/react';
import { DataFunctionArgs } from '@remix-run/server-runtime';
import { ChevronDown, ChevronRight, Heart, Scale } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ManufacturerAvatar from '~/components/avatar/ManufacturerAvatar';
import ManufacturerCard from '~/components/cards/manufacturer/ManufacturerCard';
import NanoCard from '~/components/cards/NanoCard';
import ConnectedProductCard from '~/components/cards/product/ConnectedProductCard';
import HorizontalProductCard from '~/components/cards/product/HorizontalProductCard';
import ProductCard from '~/components/cards/product/ProductCard';
import StickyProductCard from '~/components/cards/product/StickyProductCard';
import UserCard from '~/components/cards/user/UserCard';
import SelectChip from '~/components/common/chips/SelectChip';
import AddToCartHandler from '~/components/common/product/AddToCartHandler';
import ProductAttributesTable from '~/components/common/product/ProductAttributesTable';
import ProductAvailability from '~/components/common/product/ProductAvailability';
import ProductDescription from '~/components/common/product/ProductDescription';
import ProductGallery from '~/components/common/product/ProductGallery';
import ProductImage from '~/components/common/product/ProductImage';
import ProductNumber from '~/components/common/product/ProductNumber';
import ProductPriceCrossed from '~/components/common/product/ProductPriceCrossed';
import ProductPriceNet from '~/components/common/product/ProductPriceNet';
import ProductPriceNormal from '~/components/common/product/ProductPriceNormal';
import ProductRating from '~/components/common/product/ProductRating';
import ProductReviews from '~/components/common/product/ProductReviews';
import ProductTitle from '~/components/common/product/ProductTitle';
import DeliveryInformation from '~/components/common/section/DeliveryInformation';
import Section from '~/components/common/section/Section';
import SectionContent from '~/components/common/section/SectionContent';
import SectionDescription from '~/components/common/section/SectionDescription';
import SectionHeader from '~/components/common/section/SectionHeader';
import SectionTitle from '~/components/common/section/SectionTitle';
import Usp from '~/components/common/section/Usp';
import Summary from '~/components/common/summary/Summary';
import SummaryItem from '~/components/common/summary/SummaryItem';
import SummaryProductTotal from '~/components/common/summary/SummaryProductTotal';
import PageTitle from '~/components/pages/PageTitle';
import { Button } from '~/components/ui-custom/MyButton';
import { Badge } from '~/components/ui/badge';
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible';
import { APP_META_TITLE, userCardDummies } from '~/constants';
import { ErrorCode, ErrorResult } from '~/generated/graphql';
import { getProductBySlug } from '~/providers/products/products';
import { getSessionStorage } from '~/sessions';
import { isArrayValid } from '~/utils';
import { CartLoaderData } from '../api/active-order';
import Breadcrumbs from '~/components/breadcrumbs/Breadcrumbs';
import { useActiveOrder } from '~/utils/use-active-order';

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

  const category = product.facetValues.find(
    (fv) => fv.facet.name === 'Category',
  );

  const brand = product.facetValues.find((fv) => fv.facet.code === 'brand');

  const productOptions: any[] = [];
  const manufacturerOptions: any[] = [];
  const subcategories: any[] = [];

  const attributes = product.facetValues.filter(
    (f) => f.facet.code !== 'category' && f.facet.code !== 'brand',
  );

  const [showStickyCard, setShowStickyCard] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCard(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Find the collection where the breadcrumb is the most length
  const collection = product.collections
    .sort((a, b) => b.breadcrumbs.length - a.breadcrumbs.length)[0];

  return (
    <>
      <div className="mx-auto w-full px-6 lg:max-w-screen-2xl space-y-6">
        <div className="mb-16"></div>

        <Breadcrumbs
          page="collections"
          items={collection.breadcrumbs.filter(
            (b) => b.slug !== '__root_collection__',
          )}
        />

        <Section className="mx-auto grid max-w-screen-sm grid-cols-1 gap-16 lg:max-w-full lg:grid-cols-2 lg:gap-20 pb-12">
          <div className="flex flex-auto flex-col gap-4 self-start lg:sticky lg:top-[14rem] lg:flex-row mt-0">
            <ProductImage
              className="rounded-lg bg-primary/5"
              src={product.featuredAsset?.preview || product.assets[0]?.preview}
            />
            <ProductGallery
              images={product.assets.filter(
                (asset) => asset.id !== product.featuredAsset?.id,
              )}
            />
          </div>

          <div className="flex flex-col gap-16">
            <div className="flex w-full flex-col gap-8">
              <div className="flex items-center justify-between gap-4">
                {category && !brand && (
                  <ManufacturerAvatar
                    manufacturer={{
                      title: category.name as string,
                      link: `/collections/${category.code}`,
                      imageSrc: '',
                    }}
                  />
                )}
                {brand && (
                  <ManufacturerAvatar
                    manufacturer={{
                      title: brand.name as string,
                      link: `/collections/${brand.code}`,
                      imageSrc: '',
                    }}
                  />
                )}
                <ProductNumber number={product.variants[0].sku} />
              </div>
              <div className="flex flex-col gap-2">
                <ProductAvailability className="text-base"></ProductAvailability>
                <PageTitle className="text-3xl font-bold tracking-tight">
                  <ProductTitle title={product.name} />
                </PageTitle>
                <ProductRating rating={5} totalReviews={100} />
              </div>
              <div>
                <ProductPriceCrossed
                  priceCrossed={product.variants[0].priceWithTax}
                />
                <ProductPriceNormal
                  priceNormal={product.variants[0].priceWithTax}
                  className="text-3xl"
                />
                <ProductPriceNet priceNet={product.variants[0].priceWithTax} />
              </div>
            </div>

            <div className="space-y-4">
              {[...Array(1)].map((_, index) => (
                <Section key={index} className="gap-6 p-0">
                  <SectionHeader>
                    <div className="flex items-center gap-4">
                      {/* <Avatar className="h-14 w-14 items-center justify-center  text-xl font-bold text-primary ">
                    {index + 1}.
                  </Avatar> */}
                      <div className="text font-bold text-primary text-xl">
                        {index + 1}.
                      </div>
                      <SectionTitle
                        level="h3"
                        title="Kapcsolat"
                        className="text-xl"
                      />
                      <Badge
                        variant={'secondary'}
                        className="ml-auto h-10 px-4 text-base"
                      >
                        2 kötelező
                      </Badge>
                    </div>
                    <SectionDescription>
                      {`Kapcsolat ${index + 1} leírásas`}
                    </SectionDescription>
                  </SectionHeader>
                  {product.variants.map((variant, index) => (
                    <HorizontalProductCard
                      key={index}
                      title={variant.name}
                      number={'1'}
                      priceNormal={variant.priceWithTax}
                      priceNet={variant.priceWithTax}
                      priceCrossed={variant.priceWithTax}
                      imageSrc={product.featuredAsset?.preview ||
                        product.assets[0]?.preview} id={variant.id} lineItemId={''}                    />
                  ))}
                  <Button variant={'outline'}>
                    Továbbiak megjelenítése
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Section>
              ))}

              <Section className="hidden">
                <SectionHeader className="">
                  <SectionTitle level="h3" title="Összesítő táblázat" srOnly />
                </SectionHeader>
                <SectionContent className="grid grid-cols-1 gap-4">
                  <Summary>
                    {[...Array(5)].map((_, index) => (
                      <SummaryItem key={index} />
                    ))}
                    <SummaryProductTotal className="text-2xl font-bold" />
                  </Summary>
                </SectionContent>
              </Section>
            </div>

            <div className="flex items-start gap-8">
              <div className="flex flex-1 flex-col gap-4">
                <AddToCartHandler
                  id="product-page-amount"
                  productId={product.id}
                  className="w-full"
                  addToCartButtonSize="h-16 text-xl w-full"
                  stepperButtonSize="h-[3.75rem] w-[3.75rem]"
                  iconSize="h-6 w-6"
                  inputSize="h-16"
                />
                <div className="flex gap-4">
                  <Button className="flex-1" variant={'outline'}>
                    <Scale className="mr-2 h-4 w-4" /> Összevetés
                  </Button>
                  <Button className="flex-1" variant={'outline'}>
                    <Heart className="mr-2 h-4 w-4" /> Mentés a kedvencekhez
                  </Button>
                </div>
              </div>
            </div>

            <DeliveryInformation />

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

            <Section>
              <SectionHeader>
                <SectionTitle
                  level="h2"
                  title="Kapcsolódó termékek"
                  className="text-xl"
                />
              </SectionHeader>
              <SectionContent
                className="flex flex-wrap gap-6"
                layoutType="default"
              >
                {[...Array(1)].map((_, index) => (
                  <ConnectedProductCard key={index} />
                ))}
              </SectionContent>
            </Section>

            <div className="flex flex-col gap-8">
              {product.description && (
                <ProductDescription description={product.description} />
              )}
              {isArrayValid(attributes) && (
                <ProductAttributesTable attributes={attributes} />
              )}
              <ProductReviews reviews={[]} />
            </div>
          </div>
        </Section>

        <div className="pb-12">
          <Usp />
        </div>

        <Section>
          <div className="absolute top-0" id="alsolike">
            {/* Anchor */}
          </div>
          <SectionHeader>
            <SectionTitle
              className="text-5xl"
              level="h2"
              title="Hasonló termékek"
            />
            <SectionDescription>Leírás</SectionDescription>
          </SectionHeader>
          <SectionContent layoutType="carousel">
            {productOptions &&
              productOptions.map((option, index) => (
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
          </SectionContent>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle
              className="text-5xl"
              level="h2"
              title="Mások a következőket is megnézték"
            />
            <SectionDescription>Leírás</SectionDescription>
          </SectionHeader>
          <SectionContent layoutType="carousel">
            {productOptions &&
              productOptions.map((option, index) => (
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
          </SectionContent>
        </Section>

        <Section className="hidden">
          <SectionTitle className="text-5xl" level="h2" title="Kiegészítők" />

          <div className="flex flex-wrap items-center gap-4">
            {[...Array(9)].map((_, index) => (
              <SelectChip key={index} label={'option.label'}></SelectChip>
            ))}
            <Button variant={'outline'} size={'xs'}>
              Minden szűrő
            </Button>
          </div>

          <div className="flex flex-col gap-8">
            <Collapsible defaultOpen>
              <CollapsibleTrigger className='w-full group-[[data-state="open"]]/collapse:bg-primary/50'>
                <div className="flex h-14 flex-grow justify-between gap-4">
                  <div className="flex flex-1 items-center gap-4">
                    <h3 className="line-clamp-1 text-left text-xl font-semibold">
                      Motorolaj
                    </h3>
                    <Badge variant={'default'}>2 db</Badge>
                  </div>
                  <div className="flex flex-none items-center gap-4">
                    <ChevronDown className="h-6 w-6" />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-16 pt-16">
                  <SectionContent layoutType="grid">
                    {productOptions &&
                      productOptions
                        .slice(0, 3)
                        .map((option, index) => (
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
                  </SectionContent>
                  <div className="flex justify-center">
                    <Button>
                      Továbbiak megjelenítése
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="group/collapse">
              <CollapsibleTrigger className='w-full group-[[data-state="open"]]/collapse:bg-primary/50'>
                <div className="flex h-14 flex-grow justify-between gap-4">
                  <div className="flex flex-1 items-center gap-4">
                    <h3 className="line-clamp-1 text-left text-xl font-semibold">
                      Fűnyírókés
                    </h3>
                    <Badge variant={'default'}>2 db</Badge>
                  </div>
                  <div className="flex flex-none items-center gap-4">
                    <ChevronDown className="h-6 w-6" />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-16 pt-16">
                  <SectionContent layoutType="grid">
                    {productOptions &&
                      productOptions
                        .slice(0, 3)
                        .map((option, index) => (
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
                  </SectionContent>
                  <div className="flex justify-center">
                    <Button>
                      Továbbiak megjelenítése
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="group/collapse">
              <CollapsibleTrigger className='w-full group-[[data-state="open"]]/collapse:bg-primary/50'>
                <div className="flex h-14 flex-grow justify-between gap-4">
                  <div className="flex flex-1 items-center gap-4">
                    <h3 className="line-clamp-1 text-left text-xl font-semibold">
                      Gyújtógyertya
                    </h3>
                    <Badge variant={'default'}>2 db</Badge>
                  </div>
                  <div className="flex flex-none items-center gap-4">
                    <ChevronDown className="h-6 w-6" />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-16 pt-16">
                  <SectionContent layoutType="grid">
                    {productOptions &&
                      productOptions
                        .slice(0, 3)
                        .map((option, index) => (
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
                  </SectionContent>
                  <div className="flex justify-center">
                    <Button>
                      Továbbiak megjelenítése
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle
              className="text-5xl"
              level="h2"
              title="További evőeszközök"
            />
            <SectionDescription>Leírás</SectionDescription>
          </SectionHeader>
          <SectionContent layoutType="carousel">
            {productOptions &&
              productOptions.map((option, index) => (
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
          </SectionContent>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle
              className="text-5xl"
              level="h2"
              title="Más gyártók termékei"
            />
            <SectionDescription>Leírás</SectionDescription>
          </SectionHeader>
          <SectionContent
            carouselItemClassName="flex grow basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-[14.285%]"
            layoutType="carousel"
          >
            {manufacturerOptions &&
              manufacturerOptions.map((option, index) => (
                <ManufacturerCard
                  key={index}
                  id={option.id}
                  link={option.link}
                  title={option.title}
                  imageSrc={option.imageSrc}
                  productCount={option.productCount}
                  sampleProducts={option.sampleProducts}
                  showAvatarGroup={false}
                  showProductCount={false}
                />
              ))}
          </SectionContent>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle
              className="text-4xl"
              level="h2"
              title="Kapcsolódó kategóriák"
            />
            <SectionDescription>Leírás</SectionDescription>
          </SectionHeader>
          <SectionContent className="flex flex-wrap gap-6" layoutType="grid">
            {subcategories &&
              subcategories.map((subcategory, index) => (
                <NanoCard
                  key={index}
                  title={subcategory.title}
                  link={subcategory.link ? subcategory.link : '#'}
                  imageSrc={subcategory.imageSrc}
                />
              ))}
          </SectionContent>
        </Section>

        <StickyProductCard
          productId={product.id}
          className={`transition ${
            showStickyCard ? 'z-20 opacity-100' : 'z-0 opacity-0'
          } !mt-0`}
          title={product.name}
          number={product.variants[0].sku}
          priceNormal={product.variants[0].priceWithTax}
          priceNet={product.variants[0].priceWithTax}
          priceCrossed={product.variants[0].priceWithTax}
          imageSrc={
            product.featuredAsset?.preview || product.assets[0]?.preview
          }
        />
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

export function getAddItemToOrderError(error?: ErrorResult): string | undefined {
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
