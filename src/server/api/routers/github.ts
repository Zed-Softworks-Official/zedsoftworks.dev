import { Octokit } from '@octokit/rest'
import { unstable_cache } from 'next/cache'
import { z } from 'zod'

import { env } from '~/env'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

const sponsorSchema = z.object({
    avatarUrl: z.string().url(),
    profileUrl: z.string().url(),
    username: z.string(),
})

type Sponsor = z.infer<typeof sponsorSchema>

type SponsorNode = {
    avatarUrl?: string
    login?: string
    url?: string
}

type SponsorsResponse = {
    organization: {
        sponsors: {
            nodes: SponsorNode[]
        }
    } | null
}

const getSponsors = unstable_cache(
    async (): Promise<Sponsor[]> => {
        const octokit = new Octokit({ auth: env.GITHUB_ACCESS_TOKEN })
        const response = await octokit.graphql<SponsorsResponse>(
            `query Sponsors($organization: String!) {
                organization(login: $organization) {
                    sponsors(first: 12) {
                        nodes {
                            ... on User {
                                avatarUrl
                                login
                                url
                            }
                            ... on Organization {
                                avatarUrl
                                login
                                url
                            }
                        }
                    }
                }
            }`,
            { organization: env.GITHUB_ORG_NAME }
        )

        if (!response.organization) {
            throw new Error('GitHub organization could not be found')
        }

        return response.organization.sponsors.nodes.flatMap((node) => {
            if (!(node.avatarUrl && node.login && node.url)) {
                return []
            }

            return [
                {
                    avatarUrl: node.avatarUrl,
                    profileUrl: node.url,
                    username: node.login,
                },
            ]
        })
    },
    ['github-sponsors'],
    { revalidate: 3600 }
)

export const githubRouter = createTRPCRouter({
    sponsors: publicProcedure
        .output(z.array(sponsorSchema))
        .query(async () => await getSponsors()),
})
