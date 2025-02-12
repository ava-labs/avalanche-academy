import { permanentRedirect } from 'next/navigation';
import { Metadata } from 'next';

type RedirectMap = {
  [key: string]: string;
};

const staticRedirects: RedirectMap = {
  '/course/subnet-architecture': '/academy/multi-chain-architecture',
  '/course/teleporter': '/academy/interchain-messaging',
  '/start': '/',
  '/guide/install-avalanche-cli': '/guides/install-avalanche-cli',
  '/guide/deploy-a-dapp-on-c-chain-with-foundry': '/guides/deploy-a-dapp-on-c-chain-with-foundry',
  '/guide/what-is-a-blockchain': '/guides/what-is-a-blockchain',
  '/guide/etna-upgrade-motivation': '/guides/etna-upgrade-motivation',
  '/guide/use-privy-on-l1': '/guides/use-privy-on-l1',
  '/guide/etna-changes': '/guides/etna-changes',
  '/guide/l1-economics': '/guides/l1-economics',
  '/guide/telegram-miniapps-thirdweb': '/guides/telegram-miniapps-thirdweb',
  '/guide/subnet-vs-l1-validators': '/guides/subnet-vs-l1-validators',
  '/guide/l1-validator-fee': '/guides/l1-validator-fee',
};

function getDestinationUrl(currentPath: string): string {
  if (currentPath in staticRedirects) {
    return `https://build.avax.network${staticRedirects[currentPath]}`;
  }
  
  if (currentPath.startsWith('/course/')) {
    const newPath = currentPath.replace('/course/', '/academy/');
    return `https://build.avax.network${newPath}`;
  }

  const cleanPath = currentPath.startsWith('/') ? currentPath.slice(1) : currentPath;
  return `https://build.avax.network/${cleanPath}`;
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
