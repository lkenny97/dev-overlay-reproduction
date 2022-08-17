const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: true,
})

const nextConfig = {
  reactStrictMode: true,
  mode: "production",
  performance: {
    hints: 'warning',
  },

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

}
/** @type {import('next').NextConfig} */
module.exports = (_phase, { defaultConfig }) => {
  const plugins = [withBundleAnalyzer]
  return plugins.reduce((acc, plugin) => plugin(acc), { ...defaultConfig, ...nextConfig })
}