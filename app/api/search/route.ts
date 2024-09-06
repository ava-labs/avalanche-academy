import { getCoursePages } from '@/utils/course-loader';
import { getGuidePages } from '@/utils/guide-loader';
import { createSearchAPI } from 'fumadocs-core/search/server';

export const { GET } = createSearchAPI('advanced', {
  indexes: [
    ...getCoursePages().map((page) => ({
      title: page.data.title,
      structuredData: page.data.exports.structuredData,
      id: page.url,
      url: page.url,
    })),
    ...getGuidePages().map((page) => ({
      title: page.data.title,
      structuredData: page.data.exports.structuredData,
      id: page.url,
      url: page.url,
    })),
  ],
});
