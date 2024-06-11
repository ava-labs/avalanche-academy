
import { CommandLineIcon } from '@heroicons/react/20/solid';
import {
    CubeTransparentIcon,
    CircleStackIcon,
    ArrowsRightLeftIcon,
    CodeBracketIcon,
  } from '@heroicons/react/24/outline';

import { CoinsIcon, Dice3, Dice3Icon } from 'lucide-react';

type Course = {
    name: string;
    description: string;
    slug: string;
    icon: any;
    featured?: boolean;
    duration?: string;
    languages: string[];
    tools: string[];
};

const officialCourses: Course[] = [
    {
        name: "Avalanche Fundamentals",
        description: "Get a high level overview of Avalanche Consensus, Subnets and VMs",
        slug: "avalanche-fundamentals",
        icon: CubeTransparentIcon,
        featured: true,
        duration: "1 hour",
        languages: [],
        tools: ["AvaCloud"]
    },
    {
        name: "Multi-Chain Architecture",
        description: "Dive deeper into the Multi-Chain Architecture and deploy your own Blockchain",
        slug: "multi-chain-architecture",
        icon: CircleStackIcon,
        featured: true,
        duration: "1.5 hours",
        languages: [],
        tools: ["Avalanche-CLI"]
    },
    {
        name:"Teleporter",
        description:"Utilize Teleporter to build cross-chain dApps in Avalanche network",
        slug:"teleporter",
        icon: ArrowsRightLeftIcon,
        featured: true,
        duration: "3 hours",
        tools: ["Avalanche-CLI", "Telepoter"],
        languages: ["Solidity"]
     },
     {
        name:"Teleporter Token Bridge",
        description:"Utilize Teleporter to bridge Tokens in the Avalanche Network",
        slug:"teleporter-token-bridge",
        icon: CoinsIcon,
        featured: true,
        duration: "2.5 hours",
        tools: ["Avalanche-CLI", "Telepoter"],
        languages: ["Solidity"]
     },
     {
        name:"Chainlink VRF with Teleporter ",
        description:"Utilize Teleporter to make Chainlink VRF available on any blockchain in the Avalanche Network",
        slug:"teleporter-chainlink-vrf",
        icon: Dice3Icon,
        featured: true,
        duration: "2.5 hours",
        tools: ["Teleporter", "Chainlink VRF"],
        languages: ["Solidity"]
     },
     {
        name:"HyperSDK",
        description:"Learn to build customized Virtual Machines using our SDK",
        slug:"hypersdk",
        icon: CodeBracketIcon,
        duration: "4 hours",
        tools: ["Avalanche-CLI"],
        languages: ["Go"]
     },
     {
        name:"Customizing the EVM",
        description:"Learn how to customize the EVM and add your own custom precompiles",
        slug:"customizing-evm",
        icon: CommandLineIcon,
        duration: "4 hours",
        featured: true,
        tools: ["Avalanche-CLI"],
        languages: ["Go"]
     }
];

const ecosystemCourses: Course[] = [
    {
        name:"Run a Gogopool Minipool",
        description:"A Minipool represents a validator that is jointly funded equally by AVAX borrowed from liquid stakers and AVAX contribution from the minipool operator. Thanks to Minipool design architecture, users can become validators on the Avalanche network with nearly half the usual AVAX requirement.",
        slug:"gogopool-minipool",
        icon:CodeBracketIcon,
        duration: "2 hours",
        tools: ["Avalanche-CLI"],
        languages: ["Go"]
   },
   {
        name:"Use Safe on an Avalanche Chain",
        description:"Secure your multi-sig wallet with Safe on a Subnet.",
        slug:"safe-on-an-avalanche-chain",
        icon:CodeBracketIcon,
        duration: "4 hours",
        tools: ["Avalanche-CLI"],
        languages: ["Go"]
   }
];

export default {
    official: officialCourses,
    official_featured: officialCourses.filter((course) => course.featured),
    ecosystem: ecosystemCourses,
};


