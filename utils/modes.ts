/* eslint-disable import/no-relative-packages -- required */
import {
  LayoutIcon,
  LibraryIcon,
  PaperclipIcon,
  type LucideIcon,
} from 'lucide-react';

export interface Mode {
  param: string;
  name: string;
  package: string;
  description: string;
  version: string;
  icon: LucideIcon;
}

export const modes: Mode[] = [
  {
    param: 'headless',
    name: 'Core',
    package: 'fumadocs-core',
    description: 'The core library',
    version: '1.0',
    icon: LibraryIcon,
  },
  {
    param: 'ui',
    name: 'UI',
    package: 'fumadocs-ui',
    description: 'The user interface',
    version: '1.0',
    icon: LayoutIcon,
  },
  {
    param: 'mdx',
    name: 'MDX',
    package: 'fumadocs-mdx',
    description: 'Built-in source provider',
    version: '1.0',
    icon: PaperclipIcon,
  },
];
