import { type BaseLayoutProps, type DocsLayoutProps } from 'fumadocs-ui/layout';
import { utils } from '@/utils/source';
import { RootToggle } from 'fumadocs-ui/components/layout/root-toggle';
import { Title } from '@/app/layout.client';
import { BlocksIcon, MailIcon, SproutIcon, SquareStackIcon } from 'lucide-react';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <Title />,
    // githubUrl: 'https://github.com/ava-labs/avalanche-academy',
  },
  /*
  links: [
    {
      text: 'Documentation',
      url: 'https://docs.avax.network',
    },
    {
      text: 'GitHub',
      url: 'https://github.com/ava-labs/avalanche-academy',
    },
  ],
  */
};

export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: utils.pageTree,
  sidebar: {
    defaultOpenLevel: 0,
    banner: (
      <RootToggle
        options={[
          {
            title: 'Avalanche Fundamentals',
            description: '',
            icon: <SproutIcon />,
            url: '/course/avalanche-fundamentals',
          },
          {
            title: 'Multi-Chain Architecture',
            description: '',
            icon: <SquareStackIcon />,
            url: '/course/multi-chain-architecture',
          },
          {
            title: 'Teleporter',
            description: '',
            icon: <MailIcon />,
            url: '/course/teleporter',
          },
          {
            title: 'Customizing EVM',
            description: '',
            icon: <BlocksIcon />,
            url: '/course/customizing-evm',
          },
        ]}
      />
    ),
  }
};
