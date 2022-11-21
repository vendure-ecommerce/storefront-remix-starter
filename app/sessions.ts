import { IS_CF_PAGES } from '~/utils/platform-adapter';

function getCookieSessionStorageFactory() {
  if (IS_CF_PAGES) {
    return require('@remix-run/cloudflare').createCookieSessionStorage;
  } else {
    // This hack is to prevent the `node` package being bundled in the
    // Cloudflare Pages context, which causes an error.
    let imp = ['@remix-run', 'node'];
    return require(imp.join('/')).createCookieSessionStorage;
  }
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
