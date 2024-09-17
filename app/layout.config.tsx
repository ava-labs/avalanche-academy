import { type BaseLayoutProps, type DocsLayoutProps } from 'fumadocs-ui/layout';
import { coursePageTree } from '@/utils/course-loader';
import { RootToggle } from 'fumadocs-ui/components/layout/root-toggle';
import { Title } from '@/app/layout.client';
import { MailIcon, SquareStackIcon, ArrowLeftRight, SquareIcon, SquareCode, Triangle } from 'lucide-react';
import COURSES from '@/content/courses';

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
  tree: coursePageTree,
  sidebar: {
    defaultOpenLevel: 0,
    banner: (
      <RootToggle
        options={
          COURSES.official.map(c => {
            return {
              title: c.name,
              description: '',
              icon: c.icon,
              url: `/course/${c.slug}`
            }
          })
        }
      />
    ),
  }
};
