require('dotenv').config()
/** @type {import("snowpack").SnowpackUserConfig } */
let endpoint
switch (process.env.NODE_ENV) {
  case 'production':
    endpoint = process.env.SNOWPACK_PUBLIC_PROD_API_ENDPOINT
    break
  case 'staging':
    endpoint = process.env.SNOWPACK_PUBLIC_STAGING_API_ENDPOINT
    break
  default:
    endpoint = process.env.SNOWPACK_PUBLIC_DEV_API_ENDPOINT
    break
}
process.env.SNOWPACK_PUBLIC_API_ENDPOINT = endpoint

module.exports = {
  mount: {
    public: '/',
    src: '/dist',
  },
  plugins: ['@snowpack/plugin-svelte'],
  routes: [
    /* Enable an SPA Fallback in development: */
    { match: 'routes', src: '.*', dest: '/index.html' },
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    open: 'none',
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
}
