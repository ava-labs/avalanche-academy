import get from 'axios';
import { readFileSync } from 'fs';
import { load } from 'cheerio';
import { sync as globSync } from 'glob';

const baseUrl = 'https://academy.avax.network';

interface LinkCheckResult {
  file: string;
  link: string;
  line: number;
  isValid: boolean;
}

function isValidURLOrPath(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    if (url.startsWith("{") && url.endsWith("}")) { // is a a JSX component
      return false;
    }
    else if (url.indexOf('.') > -1) { // is a url or misconfigured path
      return true;
    }
    // where all our content lives
    return url.startsWith("/guide/") || url.startsWith("/common/") || url.startsWith("/course/") || url.startsWith("/common-images/")|| url.startsWith("/course-banner/") || url.startsWith("/course-images/") || url.startsWith("/guide-images/");
  }
}

async function checkLink(url: string): Promise<boolean> {
  try {
    const response = await get(url);
    return response.status === 200;
  } catch {
    return false;
  }  
}

function extractLinksWithLineNumbers(mdxContent: string): { link: string; line: number }[] {
  const lines = mdxContent.split('\n');
  const links: { link: string; line: number }[] = [];

  lines.forEach((line, index) => {
    const $ = load(`<div>${line}</div>`);
    $('a').each((i, elem) => {
      const href = $(elem).attr('href');
      if (href && isValidURLOrPath(href)) {
        links.push({ link: href, line: index + 1 });
      }
    });

    const markdownLinkRegex = /\[.*?\]\((.*?)\)/g;
    let match;
    while ((match = markdownLinkRegex.exec(line)) !== null) {
      const link = match[1];
      if (isValidURLOrPath(link)) {
        links.push({ link, line: index + 1 });
      }
    }
  });

  return links;
}

async function checkAllMdxFiles(): Promise<void> {
  const files = globSync('content/**/*.mdx');
  console.log(`Found ${files.length} MDX files.`);

  const results: LinkCheckResult[] = [];

  for (const file of files) {
    console.log(`Processing file: ${file}`);

    const content = readFileSync(file, 'utf-8');
    const links = extractLinksWithLineNumbers(content);

    const cache: { [link: string]: boolean } = {};
    let isValid: boolean;

    for (const { link, line } of links) {
      console.log(`Checking link: ${link} in file: ${file} (line ${line})`);

      if (cache[link]) {
        isValid = cache[link];
      } else {
        isValid = await checkLink(link); // check the link
        if (!isValid) {
          isValid = await checkLink(baseUrl + link); // if link failed check first time, try adding the base url (for internal relative links)
        }
        cache[link] = isValid;
      }
      results.push({ file, link, line, isValid });

      if (!isValid) {
        console.error(`\x1b[31mBroken link found\x1b[0m in ${file} (line ${line}): \x1b[33m${link}\x1b[0m`);
      }
    }
  }


  const brokenLinks = results.filter(result => !result.isValid);
  if (brokenLinks.length > 0) {
    console.error(`\n\x1b[31mSummary of broken links:\x1b[0m`);
    brokenLinks.forEach(result => {
      console.error(`File: \x1b[36m${result.file}\x1b[0m, Line: \x1b[33m${result.line}\x1b[0m, Link: \x1b[31m${result.link}\x1b[0m`);
    });
    process.exit(1);
  } else {
    console.log(`\x1b[32mAll links are valid.\x1b[0m`);
  }
}

checkAllMdxFiles().catch(error => {
  console.error('\x1b[31mError checking links:\x1b[0m', error);
  process.exit(1);
});

