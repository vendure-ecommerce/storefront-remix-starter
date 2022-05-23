# Vendure Remix Storefront Starter

A storefront for [Vendure](https://www.vendure.io) and [Remix](https://remix.run).

## To do

* Cart ✅
* Checkout flow ✅
* Search facet filters ✅
* Login ✅
* Account creation
* Customer account management

Contributions welcome!

## Development

1. `npm install`
2. `npm run dev` - runs locally
3. `npm run dev:cf` - runs locally with the Cloudflare Pages configuration

## Deployment

This repo is configured to deploy to either Netlify or Cloudflare Pages.

The [remix.config.js](./remix.config.js) file contains a check for the `process.env.CF_PAGES` environment variable to determine whether to use the Cloudflare Pages or Netlify server configuration.

## License

MIT
