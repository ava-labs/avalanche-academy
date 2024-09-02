import { type BaseLayoutProps, type DocsLayoutProps } from 'fumadocs-ui/layout';
import { pageTree } from '@/utils/source';
import { RootToggle } from 'fumadocs-ui/components/layout/root-toggle';
import { Title } from '@/app/layout.client';
import { MailIcon, SquareStackIcon, ArrowLeftRight, SquareIcon, SquareCode, Triangle } from 'lucide-react';

export const baseOptions: BaseLayoutProps = {
  githubUrl: 'https://github.com/ava-labs/avalanche-academy',
  nav: {
    title: <Title />,
  },
  links: [
    {
      text: 'Courses',
      url: '/',
    },
    {
      text: 'Guides',
      url: '/guide',
    },
    {
      text: 'Documentation',
      url: 'https://docs.avax.network',
    },
    {
      text: 'Contribute',
      url: '/contribute',
    },
  ],
};

export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: pageTree,
  sidebar: {
    defaultOpenLevel: 0,
    banner: (
      <RootToggle
        options={[
          {
            title: 'Blockchain Fundamentals',
            description: '',
            icon: <SquareIcon />,
            url: '/course/blockchain-fundamentals',
          },
          {
            title: 'Avalanche Fundamentals',
            description: '',
            icon: <Triangle />,
            url: '/course/avalanche-fundamentals',
          },
          {
            title: 'Multi-Chain Architecture',
            description: '',
            icon: <SquareStackIcon />,
            url: '/course/multi-chain-architecture',
          },
          {
            title: 'Interchain Messaging',
            description: '',
            icon: <MailIcon />,
            url: '/course/interchain-messaging',
          },
          {
            title: 'Interchain Token Transfer',
            description: '',
            icon: <ArrowLeftRight />,
            url: '/course/interchain-token-transfer',
          },
          {
            title: 'Customizing EVM',
            description: '',
            icon: <SquareCode />,
            url: '/course/customizing-evm',
          },
        ]}
      />
    ),
  }
};
