export const json = process.env.CF_PAGES
    ? require('@remix-run/cloudflare').json
    : require('@remix-run/server-runtime').json;

export const redirect = process.env.CF_PAGES
    ? require('@remix-run/cloudflare').redirect
    : require('@remix-run/server-runtime').redirect;
