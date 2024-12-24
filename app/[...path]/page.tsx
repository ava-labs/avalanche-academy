import { permanentRedirect } from 'next/navigation';
import { Metadata } from 'next';

type RedirectMap = {
  [key: string]: string;
};

const staticRedirects: RedirectMap = {
  '/course/subnet-architecture': '/academy/multi-chain-architecture',
  '/course/teleporter': '/academy/interchain-messaging',
  '/start': '/',
};

function getDestinationUrl(currentPath: string): string {
  if (currentPath in staticRedirects) {
    return `https://developers.avax.network${staticRedirects[currentPath]}`;
  }
  
  if (currentPath.startsWith('/course/')) {
    const newPath = currentPath.replace('/course/', '/academy/');
    return `https://developers.avax.network${newPath}`;
  }

  const cleanPath = currentPath.startsWith('/') ? currentPath.slice(1) : currentPath;
  return `https://developers.avax.network/${cleanPath}`;
}

export async function generateMetadata({ 
  params 
}: { 
  params: { path: string[] } 
}): Promise<Metadata> {
  const currentPath = `/${params.path.join('/')}`;
  const destinationUrl = getDestinationUrl(currentPath);

  return {
    robots: {
      index: false,
      follow: true
    },
    alternates: {
      canonical: destinationUrl
    }
  };
}

export default function CatchAllRoute({
  params,
}: {
  params: { path: string[] };
}) {
  const currentPath = `/${params.path.join('/')}`;
  const destinationUrl = getDestinationUrl(currentPath);
  permanentRedirect(destinationUrl);
}