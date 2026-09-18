/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  eslint: {
    // Prevent ESLint warnings from failing the Vercel production build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Strict TypeScript validation
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
