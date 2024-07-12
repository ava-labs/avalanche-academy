import { createMDXSource, defaultSchemas } from 'fumadocs-mdx';
import { z } from 'zod';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { map } from '.map';
import { create } from '@/components/ui/icon';

export const { getPage, getPages, pageTree } = loader({
  baseUrl: '/course',
  rootDir: 'course',
  icon(icon) {
    if (icon && icon in icons)
      return create({ icon: icons[icon as keyof typeof icons] });
  },
  source: createMDXSource(map, {
    schema: {
      frontmatter: defaultSchemas.frontmatter.extend({
        preview: z.string().optional(),
        toc: z.boolean().default(true),
        index: z.boolean().default(false),
        updated: z.string().or(z.date()).transform((value, context) => {
            try {
              return new Date(value);
            } catch {
              context.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid date" });
              return z.NEVER;
            }
          }),
        authors: z.array(z.string()),
      }),
    },
  }),
});
