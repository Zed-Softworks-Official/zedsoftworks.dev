import { ArrowDown, ArrowUpRight, Code2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import { Reveal, TechField } from '~/app/_components/motion'
import { Projects } from '~/app/_components/projects'
import { Sponsors } from '~/app/_components/sponsors'
import { Button } from '~/components/ui/button'
import { Skeleton } from '~/components/ui/skeleton'

const githubUrl = 'https://github.com/Zed-Softworks-Official'

export default function Home() {
    return (
        <div className="min-h-screen overflow-hidden bg-background text-foreground">
            <header className="absolute inset-x-0 top-0 z-20">
                <div className="site-shell flex h-20 items-center justify-between border-border border-x border-b px-5 sm:px-8">
                    <Link
                        aria-label="Zed Softworks home"
                        className="flex items-center gap-3"
                        href="/"
                    >
                        <Image
                            alt=""
                            className="size-7"
                            height={28}
                            priority
                            src="/logo.svg"
                            width={28}
                        />
                        <span className="text-[0.68rem] tracking-[0.18em]">
                            ZED / SOFTWORKS
                        </span>
                    </Link>
                    <nav
                        aria-label="Primary navigation"
                        className="flex items-center gap-5 sm:gap-8"
                    >
                        <Link
                            className="nav-link hidden sm:inline-flex"
                            href="#projects"
                        >
                            Projects
                        </Link>
                        <Link
                            className="nav-link hidden sm:inline-flex"
                            href="#sponsors"
                        >
                            Sponsors
                        </Link>
                        <Link
                            aria-label="Zed Softworks on GitHub"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                            href={githubUrl}
                            target="_blank"
                        >
                            <Code2 className="size-4" />
                        </Link>
                    </nav>
                </div>
            </header>

            <main>
                <section className="relative min-h-192 border-border border-b sm:min-h-screen">
                    <TechField />
                    <div className="site-shell relative z-10 flex min-h-192 flex-col border-border border-x pt-20 sm:min-h-screen">
                        <div className="flex flex-1 items-center px-5 py-24 sm:px-8 lg:px-12">
                            <div className="max-w-4xl">
                                <Reveal>
                                    <p className="section-kicker">
                                        01 / INDEPENDENT SOFTWARE STUDIO
                                    </p>
                                    <h1 className="mt-8 text-balance font-medium text-[clamp(3.4rem,9vw,8.4rem)] leading-[0.83] tracking-[-0.085em]">
                                        Building tools
                                        <br />
                                        <span className="text-muted-foreground">
                                            that stay yours.
                                        </span>
                                    </h1>
                                </Reveal>
                                <Reveal delay={0.12}>
                                    <div className="mt-10 grid max-w-3xl gap-8 border-border border-t pt-7 sm:grid-cols-[1fr_auto] sm:items-end">
                                        <p className="max-w-xl text-pretty text-muted-foreground text-sm leading-7">
                                            Zed Softworks creates focused,
                                            open-source software for the systems
                                            you live with. Transparent by
                                            design. Built to be controlled,
                                            understood, and improved.
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            <Button asChild size="lg">
                                                <Link href="#projects">
                                                    Explore projects
                                                    <ArrowDown data-icon="inline-end" />
                                                </Link>
                                            </Button>
                                            <Button
                                                asChild
                                                size="lg"
                                                variant="outline"
                                            >
                                                <Link
                                                    href={githubUrl}
                                                    target="_blank"
                                                >
                                                    GitHub
                                                    <ArrowUpRight data-icon="inline-end" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                        <div className="grid h-16 grid-cols-2 border-border border-t text-[0.6rem] text-muted-foreground tracking-[0.16em] sm:grid-cols-4">
                            <div className="flex items-center px-5 sm:px-8">
                                BASE / USA
                            </div>
                            <div className="flex items-center border-border border-l px-5 sm:px-8">
                                FOCUS / OPEN SOURCE
                            </div>
                            <div className="hidden items-center border-border border-l px-8 sm:flex">
                                STATUS / BUILDING
                            </div>
                            <div className="hidden items-center justify-end border-border border-l px-8 sm:flex">
                                EST. 2023
                            </div>
                        </div>
                    </div>
                </section>

                <Projects />

                <Suspense fallback={<SponsorsSkeleton />}>
                    <Sponsors />
                </Suspense>
            </main>

            <footer>
                <div className="site-shell flex flex-col gap-8 border-border border-x px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
                    <div>
                        <Image
                            alt=""
                            className="size-8"
                            height={32}
                            src="/logo.svg"
                            width={32}
                        />
                        <p className="mt-5 text-[0.65rem] text-muted-foreground tracking-[0.14em]">
                            © {new Date().getFullYear()} ZED SOFTWORKS LLC
                        </p>
                    </div>
                    <div className="flex gap-6 text-[0.65rem] tracking-[0.14em]">
                        <Link className="nav-link" href="#projects">
                            PROJECTS
                        </Link>
                        <Link className="nav-link" href="#sponsors">
                            SPONSORS
                        </Link>
                        <Link
                            className="nav-link"
                            href={githubUrl}
                            target="_blank"
                        >
                            GITHUB
                        </Link>
                        <Link
                            className="nav-link"
                            href="https://x.com/ZedSoftworks"
                            target="_blank"
                        >
                            X
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function SponsorsSkeleton() {
    return (
        <section className="border-border border-b">
            <div className="site-shell grid gap-12 py-24 lg:grid-cols-2">
                <div>
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="mt-7 h-28 max-w-lg" />
                </div>
                <Skeleton className="min-h-64" />
            </div>
        </section>
    )
}
