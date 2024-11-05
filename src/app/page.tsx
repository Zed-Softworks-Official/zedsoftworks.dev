import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowRight, ChevronDown, Heart } from 'lucide-react'
import { unstable_cache } from 'next/cache'

import Projects from '~/components/projects'
import { Button } from '~/components/ui/button'
import SponsorIcon, { type Sponsor } from '~/components/sponsors'
import ParticlesBackground from '~/components/particles'

import { env } from '~/env'
import { Octokit } from '@octokit/rest'
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'

const get_sponsors_cache = unstable_cache(
    async () => {
        const octokit = new Octokit({
            auth: env.GITHUB_ACCESS_TOKEN
        })

        const response = await octokit.graphql<{
            organization: {
                sponsors: {
                    nodes: Array<{
                        login: string
                        avatarUrl: string
                    }>
                }
            }
        }>(
            `query($org: String!) {
                          organization(login: $org) {
                            sponsors(first: 10) {
                              nodes {
                                ... on User {
                                  login
                                  avatarUrl
                                }
                              }
                            }
                          }
                        }
                          `,
            {
                org: env.GITHUB_ORG_NAME
            }
        )

        const result: Sponsor[] = response.organization.sponsors.nodes.map(
            (sponsor: { login: string; avatarUrl: string }) => ({
                username: sponsor.login,
                avatar_url: sponsor.avatarUrl
            })
        )

        return result
    },
    ['sponsors'],
    {
        revalidate: 3600
    }
)

export default function HomePage() {
    return (
        <div className="flex min-h-screen flex-col text-gray-900  dark:text-white">
            <main className="flex-grow">
                <section className="container relative mx-auto flex h-full min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
                    <div className="mb-8 flex flex-col items-center justify-center gap-10">
                        <Image
                            src="/logo.svg"
                            alt="Zed Softworks Logo"
                            width={200}
                            height={200}
                        />
                        <h1 className="text-4xl font-bold">Zed Softworks</h1>
                    </div>
                    <p className="mb-8 text-xl text-gray-600 dark:text-white/80">
                        Innovating Software Solutions for Creators and Developers
                    </p>
                    <Button variant={'default'} asChild>
                        <Link href="#products">
                            Explore Our Products
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <div className="absolute bottom-10">
                        <ChevronDown className="h-10 w-10 animate-bounce text-white/80" />
                    </div>
                </section>

                <section id="products" className="bg-white px-4 py-20 dark:bg-black">
                    <h2 className="mb-12 text-center text-3xl font-bold">Our Products</h2>
                    <Projects />
                </section>

                <Suspense
                    fallback={
                        <div className="container mx-auto px-4 py-20 text-center">
                            Loading...
                        </div>
                    }
                >
                    <SponsorsSection />
                </Suspense>
            </main>
            <ParticlesBackground />

            <footer className="bg-gray-100 py-8 dark:bg-black">
                <div className="container mx-auto flex flex-row justify-between px-4 text-center text-gray-600 dark:text-white/80">
                    <p>&copy; 2024 Zed Softworks LLC. All rights reserved.</p>
                    <div className="flex items-center gap-5">
                        <Link
                            href={`https://github.com/Zed-Softworks-Official`}
                            className="duration-250 text-muted-foreground transition-colors ease-in-out hover:text-foreground"
                            target="_blank"
                        >
                            <GitHubLogoIcon className="size-4" />
                        </Link>
                        <Link
                            href={'https://x.com/ZedSoftworks'}
                            className="duration-250 text-muted-foreground transition-colors ease-in-out hover:text-foreground"
                            target="_blank"
                        >
                            <TwitterLogoIcon className="size-4" />
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

async function SponsorsSection() {
    const sponsors = await get_sponsors_cache()

    return (
        <section id="sponsors" className="bg-white px-4 py-20 dark:bg-black">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Sponsors</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {sponsors.map((sponsor, index) => (
                    <SponsorIcon key={sponsor.username} sponsor={sponsor} index={index} />
                ))}
            </div>
            <div className="mt-12 text-center">
                <Button variant={'default'} size={'lg'}>
                    <Link
                        className="flex flex-row items-center justify-center"
                        href="https://github.com/sponsors/Zed-Softworks-Official"
                        target="_blank"
                    >
                        <Heart className="mr-2 h-5 w-5" />
                        Become a Sponsor
                    </Link>
                </Button>
            </div>
        </section>
    )
}
