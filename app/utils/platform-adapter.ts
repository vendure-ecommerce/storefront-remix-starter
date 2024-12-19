export const IS_CF_PAGES = typeof process === 'undefined';

export const IS_VERCEL = typeof process !== 'undefined' && process.env.VERCEL;

// This hack is to prevent `node` modules/packages being bundled in the
// Cloudflare Pages context, which causes an error.
export async function safeRequireNodeDependency(module: string) {
  return import(module.split('').join(''));
}
