'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export type Sponsor = {
    name: string
    avatar: string
}

export default function SponsorIcon(props: { sponsor: Sponsor; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: props.index * 0.1 }}
            className="flex flex-col items-center"
        >
            <Image
                src={props.sponsor.avatar}
                alt={`${props.sponsor.name}'s avatar`}
                className="mb-2 h-16 w-16 rounded-full"
            />
            <span className="text-sm text-gray-600">{props.sponsor.name}</span>
        </motion.div>
    )
}
