import { AcademicCapIcon, ChatBubbleLeftRightIcon, CloudArrowUpIcon, GiftIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

import COURSES from '@/content/courses';
import Link from 'next/link';


const features = [
  {
    name: 'Earn an Avalanche Academy Certificate.',
    description: 'Showcase your Avalanche Academy accomplishments on your CV and platforms like LinkedIn, X, and more.',
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
      <main className="container relative">
        <Hero />
        <Courses title="Explore our Courses" description="We offer fundamental courses specifically designed for individuals who are new to the Avalanche ecosystem, and advanced courses for those who wish to master the art of configuring, modifying, or even creating entirely new Virtual Machines from scratch." courses={COURSES.official} />

        {COURSES.ecosystem.length > 0 && <Courses title="Ecosystem Courses" description="Check out the courses provided by our ecosystem partners." courses={COURSES.ecosystem} />}

      </main>
    </>
  );
}

function Hero(): React.ReactElement {

  return (
<>  </>
  );
}


function Courses(props: { title: string, description: string, courses: any[] }): React.ReactElement {
  return (
    <div className="py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto w-full lg:mx-0">
          <h2 className="text-center text-5xl font-bold tracking-tight sm:text-10xl">{props.title}</h2>
          <p className="mt-12 text-center text-lg leading-8 text-muted-foreground">
            {props.description}
          </p>
        </div>
        <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-gray-200 pt-7 sm:mt-12 sm:pt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {props.courses.map((course) => (
            <Link href={`/course/${course.slug}`} key={course.slug} className="flex max-w-xl flex-col items-start space-y-2">
              <img src={`/course-banner/${course.slug}.jpg`} alt="" className="w-full aspect-[3/2] object-cover rounded-lg mb-5" />
              <div className="flex flex-wrap items-center gap-4 text-xs">
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
                  <span>
                    {course.name}
                  </span>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-muted-foreground">{course.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}