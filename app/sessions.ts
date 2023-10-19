import { IS_CF_PAGES } from '~/utils/platform-adapter';
import { SessionStorage } from '@remix-run/server-runtime/dist/sessions';
import { ErrorResult } from '~/generated/graphql';

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
let sessionStorage: SessionStorage<
  { activeOrderError: ErrorResult } & Record<string, any>
>;

export function getSessionStorage() {
  if (sessionStorage) {
    return sessionStorage;
  }
  const factory = getCookieSessionStorageFactory();
  sessionStorage = factory({
    cookie: {
      name: 'vendure_remix_session',
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: ['awdbhbjahdbaw'],
    },
  });
  return sessionStorage;
}
