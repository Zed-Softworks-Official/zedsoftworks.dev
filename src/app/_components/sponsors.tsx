import { ArrowUpRight, Heart, Users } from 'lucide-react'
import Link from 'next/link'
import { unstable_rethrow } from 'next/navigation'

import { Reveal } from '~/app/_components/motion'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { api } from '~/trpc/server'

type Sponsor = Awaited<ReturnType<typeof api.github.sponsors>>[number]

export async function Sponsors() {
    let sponsors: Sponsor[] = []
    let unavailable = false

    try {
        sponsors = await api.github.sponsors()
    } catch (error) {
        unstable_rethrow(error)
        unavailable = true
        console.error('Unable to load GitHub sponsors', error)
    }

    return (
        <section className="border-border border-b" id="sponsors">
            <div className="site-shell py-24 sm:py-32">
                <Reveal>
                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                        <div>
                            <p className="section-kicker">03 / SPONSORS</p>
                            <h2 className="mt-5 text-balance font-medium text-3xl tracking-[-0.06em] sm:text-5xl">
                                Backed by people who believe in open work.
                            </h2>
                            <p className="mt-6 max-w-lg text-pretty text-muted-foreground text-sm leading-7">
                                Sponsorship keeps experiments independent and
                                open-source development moving. Every
                                contribution creates more room to build.
                            </p>
                            <Button asChild className="mt-8" size="lg">
                                <Link
                                    href="https://github.com/sponsors/Zed-Softworks-Official"
                                    target="_blank"
                                >
                                    <Heart data-icon="inline-start" />
                                    Become a sponsor
                                    <ArrowUpRight data-icon="inline-end" />
                                </Link>
                            </Button>
                        </div>

                        <div className="border-border border-t lg:border-t-0 lg:border-l lg:pl-12">
                            <div className="flex items-center justify-between border-border border-b py-4 text-[0.65rem] tracking-[0.16em]">
                                <span>GITHUB SPONSORS</span>
                                <span className="text-muted-foreground">
                                    {sponsors.length
                                        .toString()
                                        .padStart(2, '0')}{' '}
                                    ACTIVE
                                </span>
                            </div>
                            <SponsorGrid
                                sponsors={sponsors}
                                unavailable={unavailable}
                            />
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

function SponsorGrid({
    sponsors,
    unavailable,
}: {
    sponsors: Sponsor[]
    unavailable: boolean
}) {
    if (unavailable) {
        return (
            <div className="flex min-h-56 items-center gap-4 text-muted-foreground text-xs">
                <Users className="size-5" />
                Sponsor data is temporarily unavailable.
            </div>
        )
    }

    if (sponsors.length === 0) {
        return (
            <div className="flex min-h-56 items-center gap-4 text-muted-foreground text-xs">
                <Users className="size-5" />
                The next name here could be yours.
            </div>
        )
    }

    return (
        <ul className="grid grid-cols-2 border-border border-l sm:grid-cols-3">
            {sponsors.map((sponsor) => (
                <li
                    className="border-border border-r border-b"
                    key={sponsor.username}
                >
                    <Link
                        aria-label={`View ${sponsor.username} on GitHub`}
                        className="group flex min-h-40 flex-col justify-between p-4 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-inset"
                        href={sponsor.profileUrl}
                        target="_blank"
                    >
                        <Avatar className="size-11 rounded-none after:rounded-none">
                            <AvatarImage
                                alt=""
                                className="rounded-none grayscale transition-all duration-300 group-hover:grayscale-0"
                                src={sponsor.avatarUrl}
                            />
                            <AvatarFallback className="rounded-none">
                                {sponsor.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <span className="flex items-center justify-between gap-2 text-[0.68rem]">
                            <span className="truncate">
                                @{sponsor.username}
                            </span>
                            <ArrowUpRight className="size-3 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
