import { ArrowUpRightIcon, MessagesSquare } from 'lucide-react';
import type { Metadata } from 'next';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { getPage, getPages, type Page } from '@/utils/source';
import { createMetadata } from '@/utils/metadata';
import IndexedDBComponent from '@/components/tracker'
import { Callout } from 'fumadocs-ui/components/callout';
import Comments from '@/components/comments';
import Instructors from '@/components/instructor';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils/cn';

interface Param {
  slug: string[];
}

export const dynamicParams = false;

function formatDate(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formatter.format(date); // 1 January 2021
}

export default function Page({
  params,
}: {
  params: Param;
}): React.ReactElement {
  const page = getPage(params.slug);

  if (!page) notFound();

  const path = `content/course/${page.file.path}`;

  // Adding Date Formatting on Right Sidebar
  const updated = new Date(page.data.updated);
  const [updatedISO, updatedHuman] = [updated.toISOString(), formatDate(updated)];

  return (
    <DocsPage
      toc={page.data.exports.toc}
      lastUpdate={page.data.exports.lastModified}
      tableOfContent={{
        enabled: true,
        footer: (
          <div className="flex flex-col gap-6">
            <div className='flex flex-col gap-y-4 text-sm text-muted-foreground'>
              <div>Instructors:</div>
              <Instructors names={["Martin Eckardt", "Andrea Vargas", "Ash"]}/>
            </div>

            <Link href="https://t.me/avalancheacademy"
              target='_blank'
              className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }))}
            >
              Join Telegram Course Chat
            </Link>
            
            <div className="grid grid-cols-3 text-sm gap-y-4 text-muted-foreground">
              <div>Updated:</div>
              <time dateTime={updatedISO} title={updatedISO} className="col-span-2 text-foreground">
                {updatedHuman}
              </time>
            </div>

            <a
            href={`https://github.com/ava-labs/avalanche-academy/blob/dev/${path}`}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              Edit on Github <ArrowUpRightIcon className="size-5" />
            </a>
          </div>

        ),
      }}
    >
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
        {page.data.title}
      </h1>
      <p className="mb-8 text-lg text-muted-foreground">
        {page.data.description}
      </p>
      <DocsBody>
        <IndexedDBComponent/>
        {page.data.index ? (
          <Category page={page} />
        ) : (
          <page.data.exports.default />
        )}
        {page.data.comments && (
            <Callout title="" icon={<MessagesSquare stroke="#3752ac"/>}><Comments/></Callout>
        )}
      </DocsBody>
    </DocsPage>
  );
}

function Category({ page }: { page: Page }): React.ReactElement {
  const filtered = getPages()
    .filter(
      (item) =>
        item.file.dirname === page.file.dirname && item.file.name !== 'index',
    );

  return (
    <Cards>
      {filtered.map((item) => (
        <Card
          key={item.url}
          title={item.data.title}
          description={item.data.description ?? 'No Description'}
          href={item.url}
        />
      ))}
    </Cards>
  );
}

export function generateMetadata({ params }: { params: Param }): Metadata {
  const page = getPage(params.slug);

  if (!page) notFound();

  const description =
    page.data.description ?? 'Learn how to build on Avalanche blockchain with Academy';

  const imageParams = new URLSearchParams();
  imageParams.set('title', page.data.title);
  imageParams.set('description', description);

  const image = {
    alt: 'Banner',
    url: `/api/og/course/${params.slug[0]}?${imageParams.toString()}`,
    width: 1200,
    height: 630,
  };

  return createMetadata({
    title: page.data.title,
    description,
    openGraph: {
      url: `/course/${page.slugs.join('/')}`,
      images: image,
    },
    twitter: {
      images: image,
    },
  });
}

export function generateStaticParams(): Param[] {
  return getPages().map<Param>((page) => ({
    slug: page.slugs,
  }));
}
