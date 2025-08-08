/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true // needed for static export
  },
  output: 'export'
};

export default nextConfig;