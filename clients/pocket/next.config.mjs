/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ui/styles', '@common/localization'],
  output: 'standalone',
  bundlePagesRouterDependencies: true,
  assetPrefix: process.env.ASSET_PREFIX
}

export default nextConfig
