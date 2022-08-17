const isProd = process.env.NODE_ENV === 'production'

// const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,
  mode: "production",
  performance: {
    hints: 'warning',
  },
  // assetPrefix: isHeroku ? "" : isProd ? 'https://static.teklifimgelsin.info/' : '',
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return '16-08-2022'

  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  webpack: (config, {isServer}) => {
    console.log(isServer)
    if (!isServer && isProd) {

      // config.optimization.splitChunks.cacheGroups.rcComponents = {
      //   test: /[\\/]node_modules[\\/](rc-field-form|rc-motion|async-validator)[\\/]/,
      //   name: "rcComponents",
      //   priority: 0,
      //   reuseExistingChunk: true,
      // }

      // config.optimization.splitChunks.cacheGroups.tempRC = {
      //   test: /[\\/]node_modules[\\/](async-validator)[\\/]/,
      //   name: "tempRC",
      //   priority: 50,
      //   reuseExistingChunk: true,
      // }
      //
      // config.optimization.splitChunks.cacheGroups.utilityVendor = {
      //   test: /[\\/]node_modules[\\/](lodash|moment|moment-timezone)[\\/]/,
      //   name: "utilityVendor"
      // }
      //
      // config.optimization.splitChunks.cacheGroups.devOverlay = {
      //   test: /[\\/]node_modules[\\/]next[\\/]dist[\\/]compiled[\\/]@next[\\/](react-dev-overlay)[\\/]/,
      //   name: "devOverlay",
      //   chunks: "all",
      //   priority: -20
      // }
      //
      // config.optimization.splitChunks.cacheGroups.queueAnimAndTween = {
      //   test: /[\\/]node_modules[\\/](rc-queue-anim|tween-functions)[\\/]/,
      //   name: "queueAnimAndTween",
      // }
    }
    return config;
  },
}
/** @type {import('next').NextConfig} */
module.exports = (_phase, { defaultConfig }) => {
  const plugins = [withBundleAnalyzer]
  return plugins.reduce((acc, plugin) => plugin(acc), { ...defaultConfig, ...nextConfig })
}