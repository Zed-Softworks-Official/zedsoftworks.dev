'use client'

import Link from 'next/link'

import { motion } from 'framer-motion'
import { ExternalLink, AudioLines, BotOff } from 'lucide-react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from '~/components/ui/card'
import { Button } from '~/components/ui/button'

export default function Projects() {
    return (
        <div className="container mx-auto grid grid-cols-1 gap-4 md:grid-cols-2">
            <ProjectCard
                title="Amplitude"
                icon={<AudioLines className="h-10 w-10 text-gray-900 dark:text-white" />}
                url="https://github.com/Zed-Softworks-Official/amplitude"
                description="Open-source audio mixer for linux using pipewire"
            />
            <ProjectCard
                title="RBBP"
                icon={<BotOff className="h-10 w-10 text-gray-900 dark:text-white" />}
                url="https://rbbp-docs.vercel.app/"
                description="Role-based bot protection for discord"
            />
        </div>
    )
}

function ProjectCard(props: {
    title: string
    icon: React.ReactNode
    description: string
    url: string
}) {
    return (
        <Card>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <CardHeader>
                    <div className="flex flex-row items-center justify-center gap-4">
                        {props.icon}
                        <CardTitle className="text-xl font-bold">{props.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                    <CardDescription>{props.description}</CardDescription>
                    <div className="flex w-full justify-end">
                        <Button variant={'default'}>
                            <Link
                                href={props.url}
                                target="_blank"
                                className="flex flex-row items-center justify-center gap-2"
                            >
                                <ExternalLink className="h-5 w-5" />
                                Check it out
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </motion.div>
        </Card>
    )
}
