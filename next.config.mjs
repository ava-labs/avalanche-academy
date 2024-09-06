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
    ]
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('.github', 'scripts')
    }
    return config
  },
};

export default withMDX(config);
