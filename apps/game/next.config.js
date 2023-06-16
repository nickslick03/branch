module.exports = {
  reactStrictMode: false,
  transpilePackages: ['dataset'],
  basePath: '/game',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.staticflickr.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.quizlet.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
