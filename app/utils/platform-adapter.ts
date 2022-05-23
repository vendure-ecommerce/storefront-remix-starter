export const IS_CF_PAGES = typeof process === 'undefined';

export const json = IS_CF_PAGES
    ? require('@remix-run/cloudflare').json
    : require('@remix-run/cloudflare').json;

export const redirect = IS_CF_PAGES
    ? require('@remix-run/cloudflare').redirect
    : require('@remix-run/cloudflare').redirect;
