const createCookieSessionStorage = process.env.CF_PAGES
    ? require('@remix-run/cloudflare').createCookieSessionStorage
    : require('@remix-run/node').createCookieSessionStorage;

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: 'vendure_remix_session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets: [process.env.ENCRYPTION_KEY ?? 'awdbhbjahdbaw'],
    },
});
