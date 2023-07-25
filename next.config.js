/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com"],
  },
  async redirects() {
    return [
      {
        source: 'http://safefoods.com.bd/',
        destination: 'https://safefoods.com.bd/',
        permanent: true,
      },
      {
        source: 'http://www.safefoods.com.bd/',
        destination: 'https://www.safefoods.com.bd/',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
