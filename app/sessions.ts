import { IS_CF_PAGES } from '~/utils/platform-adapter';

function getCookieSessionStorageFactory() {
    console.log(`getCookieSessionStorageFactory, IS_CF_PAGES`, IS_CF_PAGES);
    return IS_CF_PAGES
        ? require('@remix-run/cloudflare').createCookieSessionStorage
        : require('@remix-run/cloudflare').createCookieSessionStorage;
}

export const sessionStorage = getCookieSessionStorageFactory()({
    cookie: {
        name: 'vendure_remix_session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets: ['awdbhbjahdbaw'],
    },
});
