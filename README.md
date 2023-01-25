# Vendure Remix Storefront Starter

An e-commerce storefront for [Vendure](https://www.vendure.io) built with [Remix](https://remix.run).

👉 [remix-storefront.vendure.io](https://remix-storefront.vendure.io/)

![Screenshot](https://www.vendure.io/blog/2022/05/lightning-fast-headless-commerce-with-vendure-and-remix/lighthouse-score.webp)

## To do

- Cart ✅
- Checkout flow ✅
- Search facet filters ✅
- Login ✅
- Account creation ✅
- Customer account management

**Contributions welcome!**

## Development

1. Clone this repo
2. `npm install`
3. Create a `.env` file in the root dir with the following contents:
   ```.env
   VENDURE_API_URL=http://localhost:3001/shop-api
   # or
   # VENDURE_API_URL=https://readonlydemo.vendure.io/shop-api
   NODE_ENV=development
   ```
4. `npm run dev` - run the storefront with a local Remix server
5. `npm run dev:cf` - runs locally with the Cloudflare Pages configuration

### Vendure Server

This storefront requires a Vendure server. You can either run a local instance, or use our public demo server.

#### Code Generation

Whenever the Graphql documents (the constants using the `gql` tag) in the [./app/providers](./app/providers) dir changes,
you should run `npm run generate` to generate new sdk definitions.

For a more detailed guide on how to work with code generation, check the wiki about [querying custom fields](https://github.com/vendure-ecommerce/storefront-remix-starter/wiki/Querying-custom-fields).

#### Local

You can set up a local instance, populated with test data by following the instructions in the Vendure [Getting Started guide](https://www.vendure.io/docs/getting-started/). Note that since Remix runs on port 3000 by default, you should change the local Vendure server to run on another port, and also make sure you have enabled the `bearer` method for managing session tokens:

```ts
// vendure-config.ts
export const config: VendureConfig = {
  apiOptions: {
    port: 3001,
    // ...
  },
  authOptions: {
    tokenMethod: ['bearer', 'cookie'], // or just 'bearer'
    // ...
  },
  // ...
};
```

## Payment Gateways

Currently, both Stripe and Braintree are supported out of the box, but only one of them can be used at the same time

### Stripe integration

This repo has a built-in Stripe payment integration. To enable it, ensure that your Vendure server is set up with
the [StripePlugin](https://www.vendure.io/docs/typescript-api/payments-plugin/stripe-plugin/).

Ensure your new PaymentMethod uses the word `stripe` somewhere in its code, as that's how this integration will know
to load the Stripe payment element.

Then add your Stripe publishable key to the env file:

```
STRIPE_PUBLISHABLE_KEY=pk_test_t38hl...etc
```

**Important note**: There's a race condition between Stripe redirecting a customer to the confirmation page and the webhook receiving the confirmation in the Vendure backend. As this condition is not very distinguishable from other potential issues, it is currently addressed by implementing a very simple retry system of 5 retries every 2.5s You can tweak these settings in the [CheckoutConfirmation route](./app/routes/checkout/confirmation.%24orderCode.tsx).

### Braintree integration

This repo has built-in Braintree integration. To enable it, ensure that your Vendure server is set up with
the [BraintreePlugin](https://www.vendure.io/docs/typescript-api/payments-plugin/braintree-plugin/).

Currently, `storeCustomersInBraintree` has to be set to `true` in plugin options.

## Public demo

There is a publicly-available demo instance at https://readonlydemo.vendure.io/shop-api

## Deployment

This repo is configured to deploy to either Netlify or Cloudflare Pages.

No special setup should be needed, as the [remix.config.js](./remix.config.js) file contains a check for the `process.env.CF_PAGES` environment variable to determine whether to use the Cloudflare Pages or Netlify server configuration.

Follow the usual procedure for setting up a project in Netlify/CF Pages and point it to your clone of this repo on GitHub/Gitlab.

## License

MIT
