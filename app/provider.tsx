'use client';

import { RootProvider } from 'fumadocs-ui/provider';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { TooltipProvider } from '@radix-ui/react-tooltip';

const SearchDialog = dynamic(() => import('@/components/search'), {
  ssr: false,
});

export function Provider({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <RootProvider
      search={{
        SearchDialog,
      }}
    >
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </RootProvider>
  );
}
