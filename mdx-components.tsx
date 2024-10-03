import type { MDXComponents } from 'mdx/types';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Callout } from 'fumadocs-ui/components/callout';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import defaultComponents from 'fumadocs-ui/mdx';
import {
  CodeBlock,
  type CodeBlockProps,
  Pre,
} from 'fumadocs-ui/components/codeblock';
import type { ReactNode } from 'react';
import Quiz from '@/components/quizzes/quiz'
import { Popup, PopupContent, PopupTrigger } from 'fumadocs-ui/twoslash/popup';
import YouTube from '@/components/youtube';
import Gallery from '@/components/gallery';
import { cn } from './utils/cn';
import dynamic from "next/dynamic";


const Mermaid = dynamic(() => import("@/components/mermaid"), {
  ssr: false,
});

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    Popup,
    Mermaid,
    PopupContent,
    PopupTrigger,
    pre: ({ title, className, icon, allowCopy, ...props }: CodeBlockProps) => (
      <CodeBlock title={title} icon={icon} allowCopy={allowCopy}>
        <Pre className={cn('max-h-[1200px]', className)} {...props} />
      </CodeBlock>
    ),
    Tabs,
    Tab,
    Callout,
    TypeTable,
    Accordion,
    Accordions,
    YouTube,
    Gallery,
    Quiz,
    InstallTabs: ({
      items,
      children,
    }: {
      items: string[];
      children: ReactNode;
    }) => (
      <Tabs items={items} id="package-manager">
        {children}
      </Tabs>
    ),
    blockquote: (props) => <Callout>{props.children}</Callout>,
    ...components,
  };
}

