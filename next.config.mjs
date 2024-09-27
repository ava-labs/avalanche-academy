import createMDX from 'fumadocs-mdx/config';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
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
        source: '/start',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default withMDX(config);
