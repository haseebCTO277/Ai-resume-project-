const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "images.unsplash.com",
      "logos-world.net",
      "cdn.rareblocks.xyz",
      "cdn.prod.website-files.com",
    ],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.js\.map$/,
      use: 'null-loader',
    });
    return config;
  },
};

module.exports = nextConfig;
