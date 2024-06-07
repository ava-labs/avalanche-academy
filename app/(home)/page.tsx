import { cva } from 'class-variance-authority';
import {
  FileTextIcon,
  SearchIcon,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { AcademicCapIcon, ChatBubbleLeftRightIcon, CloudArrowUpIcon, GiftIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

import COURSES from '@/content/courses';


const features = [
  {
    name: 'Earn an Avalanche Academy Certificate.',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Join the Avalanche Community.',
    description:
      'Get connected with other Avalanche builders and like-minded individuals passionate about Avalanche.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Get Rewards.',
    description: 'Top performing students can earn benefits, such as exclusive Avalanche Merchandise, complimentary event tickets, and additional privileges.',
    icon: GiftIcon,
  },
]


export default function HomePage(): React.ReactElement {
  return (
    <>
      <main className="container relative ">
        <Hero />
        <Courses title="Explore our Courses" description="We offer fundamental courses are specifically designed for individuals who are new to the Avalanche ecosystem, and advanced courses for those who wish to master the art of configuring, modifying, or even creating entirely new Virtual Machines from scratch." courses={COURSES.official}/>

        <Courses title="Ecosystem Courses" description="Check out these courses provided by our ecosystem partners." courses={COURSES.ecosystem}/>

      </main>
    </>
  );
}

function Hero(): React.ReactElement {
  return (
    <div className="overflow-hidden py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-muted-foreground">Build on Avalanche</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Create Without Limits</p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Become an expert in the Avalanche Ecosystem, Virtual Machine Development and Subnet Architecture.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-muted-foreground lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold ">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-red-600" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src="/banner.png"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
}


function Courses(props: {title: string, description: string, courses: any[]}): React.ReactElement {
  return (
    <div className="py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto w-full lg:mx-0">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">{props.title}</h2>
          <p className="mt-2 text-center text-lg leading-8 text-muted-foreground">
          {props.description}
          </p>
        </div>
        <div className="mx-auto mt-7 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-gray-200 pt-7 sm:mt-12 sm:pt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {props.courses.map((course) => (
            <article key={course.slug} className="flex max-w-xl flex-col items-start space-y-2">
              <img src={`/course-banner/${course.slug}.jpg`} alt="" className="w-full aspect-[3/2] object-cover rounded-lg mb-5" />
              <div className="flex items-center gap-x-4 text-xs">
                <span className="text-gray-500">
                  {course.duration}
                </span>
                {[...course.tools, ...course.languages].map((item) => (
                  <span key={item}  
                    className="relative z-10 rounded-full bg-accent px-3 py-1.5 font-medium text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}

              </div>
              <div className="group">
                <h3 className="mt-3 text-lg font-semibold leading-6 group-hover:text-gray-600">
                  <a href={`/course/${course.slug}`}>
                    {course.name}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-muted-foreground">{course.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}