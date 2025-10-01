// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',  // static HTML export
  basePath: '/website',  // repo name डालें
  assetPrefix: '/website/', // assets सही load होंगे
}

export default nextConfig
