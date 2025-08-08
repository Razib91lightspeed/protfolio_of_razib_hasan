/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true // needed for static export
  },
  output: 'export', // creates static files in "out" folder
  basePath: '/protfolio_of_razib_hasan', // GitHub repo name
  assetPrefix: '/protfolio_of_razib_hasan/'
};

export default nextConfig;
