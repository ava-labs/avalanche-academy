import Link from 'next/link';
import { guide } from '@/utils/source';

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
                        TBD
                    </p>
                </div>
                <div className="flex flex-col gap-5">
                    <div
                        className="flex flex-col gap-2 bg-card p-4 rounded-lg transition-shadow shadow hover:shadow-lg dark:bg-card-dark dark:border dark:border-slate-500"
                    >
                        <h3 className="text-xl">Guides</h3>

                        <p className="text-sm text-muted-foreground">
                            TBD
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}