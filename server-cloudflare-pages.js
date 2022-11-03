import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';
import * as build from '@remix-run/dev/server-build';

const handleRequest = createPagesFunctionHandler({
    build,
    mode: process.env.NODE_ENV,
    getLoadContext: (context) => context.env,
});

export function onRequest(context) {
    return handleRequest(context).then((res) => {
        res.headers.set('x-cf-context-env', JSON.stringify(context.env));
        return res;
    });
}
