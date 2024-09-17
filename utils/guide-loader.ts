import { createMDXSource, defaultSchemas } from 'fumadocs-mdx';
import { z } from 'zod';
import type { InferMetaType, InferPageType } from 'fumadocs-core/source';
import { loader } from 'fumadocs-core/source';
import { map } from '.map';

const loaderOutput = loader({
  baseUrl: '/guide',
  rootDir: 'guide',
  source: createMDXSource(map, {
    schema: {
      frontmatter: defaultSchemas.frontmatter.extend({
        authors: z.array(z.string()),
        topics: z.array(z.string()),
        date: z.string().date().or(z.date()).optional(),
        comments: z.boolean().default(false),
      }),
    },
  }),
});

export type Page = InferPageType<typeof loaderOutput>;
export type Meta = InferMetaType<typeof loaderOutput>;
export const { getPage: getGuidePage, getPages: getGuidePages, pageTree: guidePageTree } = loaderOutput;