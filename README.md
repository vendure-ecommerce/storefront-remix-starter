### Production: 
[![Deploy VHDPlus Storefront](https://github.com/VHDPlus/shop-storefront/actions/workflows/deploy-prod.yml/badge.svg)](https://github.com/VHDPlus/shop-storefront/actions/workflows/deploy-prod.yml)
### Dev Preview:
[Cloudflare Pages](https://shop-storefront.pages.dev/)

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

## License

MIT
