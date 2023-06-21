import { useLoaderData, useTransition, useSubmit } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import OrderHistoryItem from '~/components/account/OrderHistoryItem';
import { getActiveCustomerOrderList } from '~/providers/customer/customer';
import { OrderListOptions, SortOrder } from '~/generated/graphql';
import { Pagination } from '~/components/Pagination';
import { ValidatedForm } from 'remix-validated-form';
import { withZod } from '@remix-validated-form/with-zod';
import {
  translatePaginationFrom,
  translatePaginationTo,
  paginationValidationSchema,
} from '~/utils/pagination';

const paginationLimitMinimumDefault = 10;
const allowedPaginationLimits = new Set<number>([
  paginationLimitMinimumDefault,
  20,
  30,
]);
const orderPaginationSchema = paginationValidationSchema(
  allowedPaginationLimits,
);

export async function loader({ request }: DataFunctionArgs) {
  const url = new URL(request.url);
  // Careful params are user controllable data - never blindly trust it!
  // Use the .default fallbacks in case that params are undefined i.e. `null`
  const limit = url.searchParams.get('limit') ?? paginationLimitMinimumDefault;
  const page = url.searchParams.get('page') ?? 1;

  // Validate, if we fail we redirect to default params
  // We could provide error information but under normal usage this shouldnt happen because
  // we also validate on client side, which means we should only land here if the user
  // opens a manually modified or no longer supported url
  const zodResult = orderPaginationSchema.safeParse({ limit, page });
  if (!zodResult.success) {
    url.search = '';
    return redirect(url.href);
  }

  // From here on data is safe - Construct the options for vendure
  const orderListOptions: OrderListOptions = {
    take: zodResult.data.limit,
    skip: (zodResult.data.page - 1) * zodResult.data.limit, // Page is one-base-indexed so we gotta decrement first
    sort: { createdAt: SortOrder.Desc },
    filter: { active: { eq: false } },
  };

  const res = await getActiveCustomerOrderList(orderListOptions, { request });
  if (!res.activeCustomer) {
    return redirect('/sign-in');
  }
  return json({
    orderList: res.activeCustomer.orders,
    appliedPaginationLimit: zodResult.data.limit,
    appliedPaginationPage: zodResult.data.page,
  });
}

export default function AccountHistory() {
  const { orderList, appliedPaginationLimit, appliedPaginationPage } =
    useLoaderData<typeof loader>();
  const submit = useSubmit();
  const transition = useTransition();
  const showingOrdersFrom = translatePaginationFrom(
    appliedPaginationPage,
    appliedPaginationLimit,
  );
  const showingOrdersTo = translatePaginationTo(
    appliedPaginationPage,
    appliedPaginationLimit,
    orderList.items.length,
  );

  return (
    <div className="pt-10 relative">
      {/* Loading-Overlay */}
      {transition.state !== 'idle' && (
        <div className="absolute top-0 left-0 w-full h-full z-100 bg-white bg-opacity-75"></div>
      )}

      {orderList.items.length === 0 && (
        <div className="py-16 text-3xl text-center italic text-gray-300 select-none flex justify-center items-center">
          {orderList.totalItems === 0
            ? 'Your future orders will appear here'
            : 'No more orders, end reached'}
        </div>
      )}
      {/* The actual orders */}
      {orderList.items?.map((item) => (
        <OrderHistoryItem
          key={item.code}
          // @ts-ignore
          order={item}
          isInitiallyExpanded={true}
          className="mb-10"
        />
      ))}

      {/* Pagination */}
      <div className="flex flex-row justify-between items-center gap-4">
        <span className="self-start text-gray-500 text-sm ml-4 lg:ml-6 mt-2">
          Showing orders {showingOrdersFrom} to {showingOrdersTo} of{' '}
          {orderList.totalItems}
        </span>

        <ValidatedForm
          validator={withZod(
            paginationValidationSchema(allowedPaginationLimits),
          )}
          method="get"
          onChange={(e) =>
            submit(e.currentTarget, { preventScrollReset: true })
          }
          preventScrollReset
        >
          <Pagination
            appliedPaginationLimit={appliedPaginationLimit}
            allowedPaginationLimits={allowedPaginationLimits}
            totalItems={orderList.totalItems}
            appliedPaginationPage={appliedPaginationPage}
          />
        </ValidatedForm>
      </div>
    </div>
  );
}
