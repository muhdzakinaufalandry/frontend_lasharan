/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lasharan-bucket.s3.ap-southeast-3.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
