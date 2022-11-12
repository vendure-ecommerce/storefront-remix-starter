/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
const cloudflarePagesConfig = {
    serverBuildTarget: 'cloudflare-pages',
    server: './server-cloudflare-pages.js',
    ignoredRouteFiles: ['**/.*'],
};
/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
const netlifyConfig = {
    serverBuildTarget: 'netlify',
    server: './server-netlify.js',
    ignoredRouteFiles: ['**/.*'],
};
/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
const devConfig = {
    appDirectory: 'app',
    assetsBuildDirectory: 'public/build',
    publicPath: '/build/',
    serverBuildDirectory: 'build',
    devServerPort: 8002,
    ignoredRouteFiles: ['.*'],
};

/** @type {import('@remix-run/dev').AppConfig} */
const dockerConfig = {
    appDirectory: "app",
    assetsBuildDirectory: "public/build",
    ignoredRouteFiles: ["**/.*"],
    publicPath: "/build/",
    serverBuildPath: "build/index.js",
    serverBuildTarget: "node-cjs",
  };

module.exports =
    process.env.NODE_ENV === 'development'
        ? devConfig
        : process.env.CF_PAGES
        ? cloudflarePagesConfig
        : dockerConfig;
