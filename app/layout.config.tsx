import { type BaseLayoutProps, type DocsLayoutProps } from 'fumadocs-ui/layout';
import { utils } from '@/utils/source';
import { RootToggle } from 'fumadocs-ui/components/layout/root-toggle';
import { Title } from '@/app/layout.client';

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
            icon: 'Book',
            url: '/course/avalanche-fundamentals',
          },
          {
            title: 'Multi-Chain Architecture',
            description: '',
            icon: 'Book',
            url: '/course/multi-chain-architecture',
          },
          {
            title: 'Customizing EVM',
            description: '',
            icon: 'Book',
            url: '/course/customizing-evm',
          },
          {
            title: 'Teleporter',
            description: '',
            icon: 'Book',
            url: '/course/teleporter',
          },
        ]}
      />
    ),
  }
};
