import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';
import * as build from '@remix-run/dev/server-build';

const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => context.env,
});

export function onRequest(context) {
  return handleRequest(context).then((res) => {
    // This is here to debug whether our Cloudflare Pages env var is being picked up.
    // Can be safely removed.
    res.headers.set(
      'x-cf-env-vendure-api-url',
      JSON.stringify(context.env.VENDURE_API_URL),
    );
    return res;
  });
}
