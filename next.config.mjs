/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/protfolio_of_razib_hasan' : '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath + '/',
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath, // use this in components for manual URLs
  },
};

export default nextConfig;
