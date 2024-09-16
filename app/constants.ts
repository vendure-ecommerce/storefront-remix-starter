export const APP_META_TITLE = 'Vendure Remix Storefront';
export const APP_META_DESCRIPTION =
  'A headless commerce storefront starter kit built with Remix & Vendure';
export const DEMO_API_URL = 'https://vendure.hu/shop-api';
export let API_URL =
  typeof process !== 'undefined'
    ? process.env.VENDURE_API_URL ?? DEMO_API_URL
    : DEMO_API_URL;

/**
 * This function is used when running in Cloudflare Pages in order to set the API URL
 * based on an environment variable. Env vars work differently in CF Pages and are not available
 * on the `process` object (which does not exist). Instead, it needs to be accessed from the loader
 * context, and if defined we use it here to set the API_URL var which will be used by the
 * GraphQL calls.
 *
 * See https://developers.cloudflare.com/workers/platform/environment-variables/#environmental-variables-with-module-workers
 */
export function setApiUrl(apiUrl: string) {
  API_URL = apiUrl;
}

export const userCardDummies = [
  {
    title: "Craig Auer IV",
    expertEmail: "craig.auer@faker.com",
    expertPhoneNumber: "(555) 555-5555",
    imageSrc: "https://avatars.githubusercontent.com/u/64640969?v=4",
  },
  {
    title: "Gerardo Parisian",
    expertEmail: "gerardo.parisian@faker.com",
    expertPhoneNumber: "(555) 555-5555",
    imageSrc: "https://avatars.githubusercontent.com/u/64640969?v=4",
  },
  {
    title: "Cody Becker",
    expertEmail: "cody.becker@faker.com",
    expertPhoneNumber: "(555) 555-5555",
    imageSrc: "https://avatars.githubusercontent.com/u/64640969?v=4",
  }
];

export const typingDelay = 500;
export const clickingDelay = 300;

export const paginationLimitMinimumDefault = 24;
export const allowedPaginationLimits = new Set<number>([
  paginationLimitMinimumDefault,
  48,
  96,
  192,
  384,
  768,
  1536,
  3072,
  6144,
  12288,
  24576,
  49152,
  98304,
  196608,
]);
