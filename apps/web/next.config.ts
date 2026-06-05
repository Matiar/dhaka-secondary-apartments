import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.amazonaws.com' },
      { protocol: 'https', hostname: 'alcove-residences.s3.ap-southeast-1.amazonaws.com' },
    ],
  },
  transpilePackages: ['react-leaflet', 'leaflet'],
};

export default nextConfig;
