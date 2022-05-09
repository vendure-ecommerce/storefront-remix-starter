/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
const netlifyConfig = {
    serverBuildTarget: "netlify",
    server: "./server.js",
    ignoredRouteFiles: ["**/.*"],
}
/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
const devConfig = {
    appDirectory: "app",
    assetsBuildDirectory: "public/build",
    publicPath: "/build/",
    serverBuildDirectory: "build",
    devServerPort: 8002,
    ignoredRouteFiles: [".*"]
}

module.exports = process.env.NODE_ENV === 'development' ? devConfig : netlifyConfig;
