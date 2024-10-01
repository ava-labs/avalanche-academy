
import { ArrowLeftRight, Coins, MailIcon, SquareCode, SquareIcon, SquareStackIcon, Triangle } from 'lucide-react';

export type Course = {
    name: string;
    description: string;
    slug: string;
    icon: any;
    featured?: boolean;
    duration?: string;
    languages: string[];
    tools: string[];
    instructors: string[];
};

const officialCourses: Course[] = [
    {
        name: "Blockchain Fundamentals",
        description: "Gain a comprehensive understanding of fundamental blockchain concepts, including how they work, and key components",
        slug: "blockchain-fundamentals",
        icon: <SquareIcon />,
        featured: false,
        duration: "1 hour",
        languages: [],
        tools: [],
        instructors: ["Martin Eckardt", "Ash"]
    },
    {
        name: "Avalanche Fundamentals",
        description: "Get a high level overview of Avalanche Consensus, L1s and VMs",
        slug: "avalanche-fundamentals",
        icon: <Triangle />,
        featured: true,
        duration: "1 hour",
        languages: [],
        tools: ["AvaCloud"],
        instructors: ["Martin Eckardt", "Ash"]
    },
    {
        name: "Multi-Chain Architecture",
        description: "Dive deeper into the Multi-Chain Architecture and deploy your own Blockchain",
        slug: "multi-chain-architecture",
        icon: <SquareStackIcon />,
        featured: true,
        duration: "1.5 hours",
        languages: [],
        tools: ["Avalanche-CLI"],
        instructors: ["Martin Eckardt", "Ash", "Owen Wahlgren"] // + Usman
    },
    {
        name:"Avalanche Interchain Messaging",
        description:"Utilize Avalanche Interchain Messaging to build cross-chain dApps in the Avalanche network",
        slug:"interchain-messaging",
        icon: <MailIcon />,
        featured: true,
        duration: "3 hours",
        tools: ["Avalanche-CLI"],
        languages: ["Solidity"],
        instructors: ["Martin Eckardt", "Andrea Vargas", "Ash"] // + Usman
     },
     {
        name:"Interchain Token Transfer",
        description:"Deploy Avalanche Interchain Token Transfer to transfer assets between Avalanche blockchains",
        slug:"interchain-token-transfer",
        icon: <ArrowLeftRight />,
        featured: true,
        duration: "2.5 hours",
        tools: ["ICM", "Foundry"],
        languages: ["Solidity"],
        instructors: ["Martin Eckardt", "Andrea Vargas", "Ash", "Owen Wahlgren", "Sarp"]
     },
     /*{
        name:"Chainlink VRF with Interchain Messaging ",
        description:"Utilize Interchain Messaging to make Chainlink VRF available on any blockchain in the Avalanche Network",
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
        icon: Blocks,
        duration: "4 hours",
        tools: ["Avalanche-CLI"],
        languages: ["Go"]
     },*/
     {
        name:"Customizing the EVM",
        description:"Learn how to customize the EVM and add your own custom precompiles",
        slug:"customizing-evm",
        icon: <SquareCode />,
        duration: "4 hours",
        featured: true,
        tools: ["Avalanche-CLI"],
        languages: ["Go"],
        instructors: ["Martin Eckardt", "Ash"] // + Usman
     },
    {
       name:"Layer 1 Tokenomics",
       description:"Learn how to design and deploy tokenomics for your Avalanche L1",
       slug:"l1-tokenomics",
       icon: <Coins />,
       duration: "2 hours",
       featured: true,
       tools: ["Avalanche-CLI", "ICM"],
       languages: ["Solidity"],
       instructors: ["Sarp"]
   },
   {
        name:"AvaCloud APIs",
        description:"Learn how to leverage AvaCloud APIs to build web apps on Avalanche",
        slug:"avacloudapis",
        icon: <SquareCode />,
        duration: "1 hour",
        featured: true,
        tools: ["AvaCloudSDK", "AvaCloud API"],
        languages: ["Typescript"],
        instructors: ["Owen Wahlgren"]
    }
];

const ecosystemCourses: Course[] = [
    /*{
        name:"Run a Gogopool Minipool",
        description:"A Minipool represents a validator that is jointly funded equally by AVAX borrowed from liquid stakers and AVAX contribution from the minipool operator. Thanks to Minipool design architecture, users can become validators on the Avalanche network with nearly half the usual AVAX requirement.",
        slug:"gogopool-minipool",
        icon: Blocks,
        duration: "2 hours",
        tools: ["Avalanche-CLI"],
        languages: ["Go"]
   },
   {
        name:"Use Safe on an Avalanche Chain",
        description:"Secure your multi-sig wallet with Safe on a Avalanche L1.",
        slug:"safe-on-an-avalanche-chain",
        icon: Blocks,
        duration: "4 hours",
        tools: ["Avalanche-CLI"],
        languages: ["Go"]
   }*/
];

export default {
    official: officialCourses,
    official_featured: officialCourses.filter((course) => course.featured),
    ecosystem: ecosystemCourses,
};


