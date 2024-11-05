'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export type Sponsor = {
    username: string
    avatar_url: string
}

export default function SponsorIcon(props: { sponsor: Sponsor; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: props.index * 0.1 }}
        >
            <div className="flex flex-col items-center justify-center">
                <Image
                    src={props.sponsor.avatar_url}
                    alt={`${props.sponsor.username}'s avatar`}
                    className="mb-2 h-16 w-16 rounded-full"
                    width={64}
                    height={64}
                />
                <span className="text-sm text-muted-foreground">
                    {props.sponsor.username}
                </span>
            </div>
        </motion.div>
    )
}
