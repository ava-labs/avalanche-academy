import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import { guide } from '@/utils/source';
import { createMetadata } from '@/utils/metadata';
import { buttonVariants } from '@/components/ui/button';
import { ArrowUpRightIcon } from 'lucide-react';
//import { Control } from '@/app/(home)/blog/[slug]/page.client';

interface Param {
    slug: string;
}

export const dynamicParams = false;

export default function Page({
    params,
}: {
    params: Param;
}): React.ReactElement {
    const page = guide.getPage([params.slug]);

    if (!page) notFound();

    const path = `content/guide/${page.file.path}`;

    return (
        <>
            <div
                className="container rounded-xl border mt-5 py-12 md:px-8"
                style={{
                    backgroundColor: 'black',
                    backgroundImage: [
                        'linear-gradient(140deg, #3752AC 0%, transparent 50%)',
                        'linear-gradient(to left top, #E84142 0%, transparent 50%)',
                        'radial-gradient(circle at 100% 100%, #3752AC, #E84142 17%, transparent 20%)',
                    ].join(', '),
                    backgroundBlendMode: 'difference, difference, normal',
                }}
            >
                <h1 className="mb-2 text-3xl font-bold text-white">
                    {page.data.title}
                </h1>
                <p className="mb-4 text-white/80">{page.data.description}</p>
                <Link
                    href="/guide"
                    className={buttonVariants({ size: 'sm', variant: 'secondary' })}
                >
                    Back
                </Link>
            </div>
            <article className="container grid grid-cols-1 px-0 py-8 lg:grid-cols-[2fr_1fr] lg:px-4">
                <div className="prose p-4">
                    <InlineTOC items={page.data.exports.toc} />
                    <page.data.exports.default />
                </div>
                <div className="flex flex-col gap-4 border-l p-4 text-sm">
                    <div>
                        <p className="mb-1 text-muted-foreground">Written by</p>
                        <div className="col-span-2 flex flex-col gap-2">
                            {page.data.authors.map(author => (
                                <Link
                                    key={author}
                                    href={`https://github.com/${author}`}
                                    className="text-foreground transition-colors flex flex-row items-center gap-2 group"
                                >
                                    <img
                                        src={`https://github.com/${author}.png?size=16`}
                                        className="w-4 h-4 rounded-full border border-background group-hover:border-muted-foreground transition-colors"
                                    />
                                    <span className="flex-grow truncate">{author}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="mb-1 text-sm text-muted-foreground">At</p>
                        <p className="font-medium">
                            {new Date(page.data.date ?? page.file.name).toDateString()}
                        </p>
                    </div>

                    <div>
                        <p className="mb-2 text-muted-foreground">Topics</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs">
                            {page.data.topics.map(item => (
                                <span key={item}
                                    className="relative z-10 rounded-full bg-accent px-3 py-1.5 font-medium text-muted-foreground"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <a
                        href={`https://github.com/ava-labs/avalanche-academy/blob/dev/${path}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowUpRightIcon className="size-5" /> Edit on Github 
                    </a>

                    {/*<Control url={page.url} />*/}
                </div>
            </article>
        </>
    );
}

export function generateMetadata({ params }: { params: Param }): Metadata {
  const page = guide.getPage([params.slug]);

  if (!page) notFound();

  const description =
    page.data.description ?? 'Learn how to build on Avalanche blockchain with Academy';

  const imageParams = new URLSearchParams();
  imageParams.set('title', page.data.title);
  imageParams.set('description', description);

  const image = {
    alt: 'Banner',
    url: `/api/og-guide/${params.slug[0]}?${imageParams.toString()}`,
    width: 1200,
    height: 630,
  };

  return createMetadata({
    title: page.data.title,
    description,
    openGraph: {
      url: `/docs/${page.slugs.join('/')}`,
      images: image,
    },
    twitter: {
      images: image,
    },
  });
}


export function generateStaticParams(): Param[] {
    return guide.getPages().map<Param>((page) => ({
        slug: page.slugs[0],
    }));
}