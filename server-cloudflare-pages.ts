import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';
import * as build from '@remix-run/dev/server-build';
import { logDevReady } from '@remix-run/server-runtime';
import { setApiUrl } from '~/constants';

if (process.env.NODE_ENV === 'development') {
  logDevReady(build);
}

export const onRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => {
    if (
      'VENDURE_API_URL' in context.env &&
      typeof context.env.VENDURE_API_URL === 'string'
    ) {
      setApiUrl(context.env.VENDURE_API_URL);
    }

    return context.env;
  },
});
