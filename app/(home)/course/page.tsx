import { cva } from 'class-variance-authority';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils/cn';

export default function DocsPage(): React.ReactElement {
  return (
    <main className="container flex flex-col items-center py-16 text-center">
      <div className="absolute inset-0 z-[-1] overflow-hidden duration-1000 animate-in fade-in [perspective:2000px]">
        <div
          className="absolute bottom-[20%] left-1/2 size-[1200px] origin-bottom bg-primary/30 opacity-30"
          style={{
            transform: 'rotateX(75deg) translate(-50%, 400px)',
            backgroundImage:
              'radial-gradient(50% 50% at center,transparent,hsl(var(--background))), repeating-linear-gradient(to right,hsl(var(--primary)),hsl(var(--primary)) 1px,transparent 2px,transparent 100px), repeating-linear-gradient(to bottom,hsl(var(--primary)),hsl(var(--primary)) 2px,transparent 3px,transparent 100px)',
          }}
        />
      </div>
      <div className="absolute inset-0 z-[-1] select-none overflow-hidden opacity-30">
      </div>
      <h1 className="mb-4 text-4xl font-semibold md:text-5xl">
        Start Learning
      </h1>
      <p className="text-muted-foreground">
        Check out our Courses
      </p>
      <div className="mt-4 grid gap-4">
        <a
          href="/"
          className={cn(buttonVariants({ size: 'lg' }))}
        >
          Home
        </a>
      </div>
    </main>
  );
}
