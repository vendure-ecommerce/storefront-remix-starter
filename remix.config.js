// const { createRoutesFromFolders } = require('@remix-run/v1-route-convention');

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
const cloudflarePagesConfig = {
  serverBuildTarget: 'cloudflare-pages',
  server: './server-cloudflare-pages.js',
  ignoredRouteFiles: ['**/.*'],
};
/**
 * @type {import('@remix-run/dev').AppConfig}
 */
const vercelConfig = {
  // serverBuildTarget: 'netlify',
  // server: './server-netlify.js',
  ignoredRouteFiles: ['**/.*'],
};
/**
 * @type {import('@remix-run/dev').AppConfig}
 */
const netlifyConfig = {
  serverBuildTarget: 'netlify',
  server: './server-netlify.js',
  ignoredRouteFiles: ['**/.*'],
};
/**
 * @type {import('@remix-run/dev').AppConfig}
 */
const devConfig = {
  appDirectory: 'app',
  serverModuleFormat: 'cjs',
  devServerPort: 8002,
  ignoredRouteFiles: ['.*'],
  future: {
    v2_dev: true,
  },
  // routes(defineRoutes) {
  //   // uses the v1 convention, works in v1.15+ and v2
  //   return createRoutesFromFolders(defineRoutes);
  // },
};

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
const buildConfig = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildDirectory: 'build',
  ignoredRouteFiles: ['.*'],
};

// function selectConfig() {
//   if (!['development', 'production'].includes(process.env.NODE_ENV))
//     throw `Unknown NODE_ENV: ${process.env.NODE_ENV}`;
//   if (process.env.NODE_ENV === 'development') return devConfig;
//   if (!process.env.CF_PAGES && !process.env.NETLIFY) return buildConfig;
//   if (process.env.CF_PAGES) return cloudflarePagesConfig;
//   if (process.env.NETLIFY) return netlifyConfig;
//   throw `Cannot select config`;
// }

function selectConfig() {
  const ENV = process.env?.NODE_ENV || process.env?.VERCEL_ENV;
  if (!['preview', 'development', 'production'].includes(ENV))
    throw new Error(`Unknown ENV: ${ENV}`);
  if (process.env.CF_PAGES) return cloudflarePagesConfig;
  if (process.env.NETLIFY) return netlifyConfig;
  if (process.env.VERCEL) return vercelConfig;
  if (ENV === 'development') return devConfig;
  if (!process.env.CF_PAGES && !process.env.NETLIFY) return buildConfig;
  throw new Error(`Cannot select config`);
}

module.exports = selectConfig();
