import COURSES from '@/content/courses';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import Link from 'next/link';


export default function HomePage(): React.ReactElement {
  return (
    <>
      <main className="container relative">
      <div className="py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto w-full lg:mx-0">
          <h2 className="text-center text-5xl font-bold tracking-tight sm:text-10xl">Welcome to the Avalanche Hackathon!
          </h2>
          <p className="mt-12 text-center text-lg leading-8 text-muted-foreground">
           At Avalanche, we believe in the power of technology to transform industries and solve real-world problems. This hackathon aims to harness the potential of Avalanche’s robust technology stack to address pressing issues and create scalable, practical solutions. Participants will have the freedom to explore a variety of tracks, mixing and matching technology and business use cases to develop groundbreaking applications.
          </p>
          <Accordions type='single' className='mt-8 max-w-3xl mx-auto'>
                <Accordion title="Avalanche Network: A Network of Layer 1 Blockchains">
                    <p>The Avalanche Network is a network of multiple independent L1 blockchains.</p>
                    <p>Each blockchain in the Avalanche Network can define its own custom virtual machine (VM), allowing developers to build specialized blockchains optimized for specific use cases. The EVM is a popular choice and can be configured or customized to fit the needs. Alternatively, L1 blockchains can also use a custom Virtual Machine built with HyperSDK</p>
                </Accordion>
                <Accordion title="Interoperability: Interchain Messaging & Interchain Token Transfer">
                  <p>At the core of the Avalanche Network is the ability to run multiple blockchains that communicate. Each chain's VM is optimized for specialized use cases, thereby boosting the network's overall performance. Utilizing <Link className='underline' target='_blank' href='/course/interchain-messaging'>Avalanche Interchain Messaging (ICM</Link> is an incredible easy way to build cross-L1 dApps, since developers can build on top an extensive and audited development framework.</p>
                  <p><Link className='underline' target='_blank' href='/course/interchain-token-transfer'>Avalanche Interchain Token Transfer (ICTT)</Link> allows you to transfer ERC-20 and native tokens seamlessly between different Avalanche L1s.</p>
                </Accordion>
                <Accordion title="Avalanche9000 (Etna Upgrade)">
                  The Etna upgrade will be the largest network upgrade of Avalanche to date. This upgrade will make the Avalanche Layer 1 blockchains (L1s) more independent, lower the ecomic barrier to launch them and make them more fault tolerant. Instead of using a subset of Primary Network Validators, L1s can now use a distinct set of validators. Learn more <Link className='underline' target='_blank' href='/course/avalanche-fundamentals/03-multi-chain-architecture-intro/02-subnet'>here</Link>.
                </Accordion>
            </Accordions>
        </div>
        <div className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-gray-200 pt-7 sm:mt-12 sm:pt-0 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className='flex max-w-xl flex-col'>
            <h3 className="mt-3 text-2xl font-semibold leading-6 group-hover:text-gray-600">
              Track 1: Build a Product
            </h3>
            <p className="mt-5 text-md leading-6 text-muted-foreground">
            This track is designed for builders who want to develop clear, impactful use cases leveraging the full potential of Avalanche’s technology stack. It focuses on creating practical applications that address real-world problems, demonstrating the versatility and power of Avalanche.
            </p>
            <p className="mt-5 text-md leading-6 text-muted-foreground">
            This track design ensures that the resulting projects are not only technically robust but also applicable to real-world use cases with the potential for significant impact across various industries.
            </p>
          </div>
          <div className='flex max-w-xl flex-col'>
          <h3 className="mt-3 text-2xl font-semibold leading-6 group-hover:text-gray-600">
          Track 2: Build Infrastructure
            </h3>
            <p className="mt-5 text-md leading-6 text-muted-foreground">
            This track is dedicated to participants who want to focus purely on the technical aspects of blockchain development. It aims to push the boundaries of Avalanche's technology stack, fostering innovation in areas like performance optimization, advanced cryptography, and network scalability without the need to integrate business use cases.
            </p>            
          </div>


        </div>
        
      </div>
    </div>
      </main>
    </>
  );
}