function getCookieSessionStorageFactory() {
    console.log(
        `getCookieSessionStorageFactory, process.env.CF_PAGES`,
        process.env.CF_PAGES,
    );
    return process.env.CF_PAGES
        ? require('@remix-run/cloudflare').createCookieSessionStorage
        : require('@remix-run/cloudflare').createCookieSessionStorage;
}

export const sessionStorage = getCookieSessionStorageFactory()({
    cookie: {
        name: 'vendure_remix_session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets: [process.env.ENCRYPTION_KEY ?? 'awdbhbjahdbaw'],
    },
});
