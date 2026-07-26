import { ArrowUpRight, CircuitBoard, RadioTower } from 'lucide-react'
import Link from 'next/link'

import { Reveal } from '~/app/_components/motion'
import { Button } from '~/components/ui/button'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/components/ui/card'

type Project = {
    name: string
    description: string
    href: string
    eyebrow: string
    tags: readonly string[]
    icon: typeof CircuitBoard
}

const projects: readonly Project[] = [
    {
        name: 'nemu',
        description:
            'An open-source smart home controller built for local control, transparent automation, and hardware that remains yours.',
        href: 'https://nemu.sh',
        eyebrow: 'Smart home / Open source',
        tags: ['LOCAL FIRST', 'OPEN SOURCE', 'IN DEVELOPMENT'],
        icon: RadioTower,
    },
]

export function Projects() {
    return (
        <section className="section-grid border-border border-y" id="projects">
            <div className="site-shell py-24 sm:py-32">
                <Reveal>
                    <div className="mb-12 grid gap-6 border-border border-b pb-8 md:grid-cols-[1fr_1.1fr] md:items-end">
                        <div>
                            <p className="section-kicker">02 / PROJECTS</p>
                            <h2 className="mt-5 max-w-xl text-balance font-medium text-3xl tracking-[-0.06em] sm:text-5xl">
                                Useful software.
                                <br />
                                Open by default.
                            </h2>
                        </div>
                        <p className="max-w-lg text-pretty text-muted-foreground text-sm leading-7 md:justify-self-end">
                            We build focused tools for the systems around us.
                            The catalog is small on purpose. Every project
                            should earn its place.
                        </p>
                    </div>
                </Reveal>

                <div className="grid gap-px bg-border lg:grid-cols-2">
                    {projects.map((project, index) => (
                        <Reveal delay={index * 0.08} key={project.name}>
                            <ProjectCard project={project} />
                        </Reveal>
                    ))}
                    <Reveal delay={projects.length * 0.08}>
                        <Card
                            aria-label="Future project slot"
                            className="min-h-[26rem] justify-between border-0 bg-background/80"
                        >
                            <CardHeader>
                                <p className="section-kicker">
                                    NEXT / UNASSIGNED
                                </p>
                                <CardAction>
                                    <CircuitBoard className="size-5 text-muted-foreground" />
                                </CardAction>
                            </CardHeader>
                            <CardContent>
                                <p className="max-w-xs text-muted-foreground text-sm leading-7">
                                    More experiments are taking shape. New work
                                    will appear here when it is ready.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <span className="text-[0.65rem] text-muted-foreground tracking-[0.18em]">
                                    RESERVED FOR FUTURE WORK
                                </span>
                            </CardFooter>
                        </Card>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

function ProjectCard({ project }: { project: Project }) {
    const Icon = project.icon

    return (
        <Card className="min-h-[26rem] justify-between border-0 bg-card transition-colors duration-300 hover:bg-card/80">
            <CardHeader>
                <p className="section-kicker">{project.eyebrow}</p>
                <CardAction>
                    <Icon className="size-5" />
                </CardAction>
            </CardHeader>
            <CardContent>
                <CardTitle className="text-5xl tracking-[-0.08em] sm:text-7xl">
                    {project.name}
                    <span className="text-primary">.</span>
                </CardTitle>
                <CardDescription className="mt-6 max-w-md text-sm leading-7">
                    {project.description}
                </CardDescription>
            </CardContent>
            <CardFooter className="flex-wrap justify-between gap-5">
                <ul
                    aria-label={`${project.name} attributes`}
                    className="flex flex-wrap gap-x-4 gap-y-2 text-[0.62rem] text-muted-foreground tracking-[0.14em]"
                >
                    {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                    ))}
                </ul>
                <Button asChild size="lg">
                    <Link href={project.href} target="_blank">
                        Visit {project.name}
                        <ArrowUpRight data-icon="inline-end" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
