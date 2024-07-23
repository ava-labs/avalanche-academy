import Link from 'next/link';
import { guide } from '@/utils/source';
import { buttonVariants } from '@/components/ui/button';

export default function Page(): React.ReactElement {
    const guides = [...guide.getPages()].sort(
        (a, b) =>
            new Date(b.data.date ?? b.file.name).getTime() -
            new Date(a.data.date ?? a.file.name).getTime(),
    );

    return (
        <main className="py-12 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto w-full lg:mx-0">
                    <h2 className="text-center text-5xl font-bold tracking-tight sm:text-10xl">Contribute to Avalanche Academy</h2>
                    <p className="m-12 text-center text-lg leading-8 text-muted-foreground">
                        The Avalanche Academy and Documentation is open to community contributions. You can help improve the content by fixing bugs, adding new content, or improving existing content.
                    </p>
                    <p className="m-12 text-center">
                        <Link
                            href="https://github.com/ava-labs/avalanche-academy"
                            target='_blank'
                            className={buttonVariants({ size: 'lg', variant: 'default' })}
                        >
                            Open on Github
                        </Link>
                    </p>
                </div>
                <div className="flex flex-col gap-5">
                    <div
                        className="flex flex-col gap-2 bg-card p-4 rounded-lg transition-shadow shadow hover:shadow-lg dark:bg-card-dark dark:border dark:border-slate-500"
                    >
                        <h3 className="text-xl">Fix Bugs</h3>

                        <p className="text-sm text-muted-foreground">
                            Every course chapter and guide page has a link to edit the source code on GitHub. If you find a bug, you can fix it and submit a pull request. The link is located in the left sidebar.
                        </p>
                    </div>

                    <div
                        className="flex flex-col gap-2 bg-card p-4 rounded-lg transition-shadow shadow hover:shadow-lg dark:bg-card-dark dark:border dark:border-slate-500"
                    >
                        <h3 className="text-xl">Add Content</h3>

                        <p className="text-sm text-muted-foreground">
                            You can add guides or course content to the Avalanche Academy by submitting a pull request. The content should be written in MarkdownX and should be placed in the <code>content</code> directory.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            If your content contains often reoccuring steps, such as starting the Avalanche Starter Kit or creating a blockchain with Avalanche CLI, please use the snippets in the <code>content/common</code> directory.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}