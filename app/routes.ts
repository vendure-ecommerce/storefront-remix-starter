import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';

export default [
  index('routes/_index.tsx'),

  route('api/active-order', 'routes/api.active-order.tsx'),
  route('api/logout', 'routes/api.logout.ts'),

  route('search', 'routes/search.tsx'),
  route('sign-in', 'routes/sign-in.tsx'),
  route('verify', 'routes/verify.tsx'),
  route('verify-email-address-change', 'routes/verify-email-address-change.tsx'),

  ...prefix('sign-up', [index('routes/sign-up.index.tsx'), route('success', 'routes/sign-up.success.tsx')]),

  route('collections/:slug', 'routes/collections.$slug.tsx'),
  route('products/:slug', 'routes/products.$slug.tsx'),

  route('checkout', 'routes/checkout.tsx', [
    index('routes/checkout._index.tsx'),
    route('payment', 'routes/checkout.payment.tsx'),
    route('confirmation/:orderCode', 'routes/checkout.confirmation.$orderCode.tsx'),
  ]),

  route('account', 'routes/account.tsx', [
    index('routes/account._index.tsx'),
    route('history', 'routes/account.history.tsx'),
    route('password', 'routes/account.password.tsx'),
    route('addresses', 'routes/account.addresses.tsx'),
    route('addresses/new', 'routes/account.addresses.new.tsx'),
    route('addresses/:addressId', 'routes/account.addresses.$addressId.tsx'),
  ]),
] satisfies RouteConfig;
