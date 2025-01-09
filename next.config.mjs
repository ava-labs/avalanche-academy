import createMDX from 'fumadocs-mdx/config';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'academy.avax.com',
          },
        ],
        destination: 'https://academy.avax.network/:path*',
        permanent: true,
      },
      {
        source: '/course/subnet-architecture',
        destination: '/course/multi-chain-architecture',
        permanent: true,
      },
      {
        source: '/course/teleporter',
        destination: '/course/interchain-messaging',
        permanent: true,
      },
      {
        source: '/course/interchain-messaging/14-access-chainlink-vrf-services',
        destination: '/course/icm-chainlink/01-access-chainlink-vrf-services',
        permanent: true,
      },
      {
        source: '/start',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default withMDX(config);
