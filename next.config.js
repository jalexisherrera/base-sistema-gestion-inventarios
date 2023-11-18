/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      's.gravatar.com',
      'lh3.googleusercontent.com',
      `${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com`,
    ],
  },
};
module.exports = nextConfig
