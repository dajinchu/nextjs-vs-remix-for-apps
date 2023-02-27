/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    swcPlugins: [
      [
        "next-superjson-plugin",
        {
          excluded: [],
        },
      ],
    ],
  },
  images: {
    domains: ["images.dog.ceo"],
  },
  transpilePackages: ["shared"],
};

module.exports = nextConfig;
