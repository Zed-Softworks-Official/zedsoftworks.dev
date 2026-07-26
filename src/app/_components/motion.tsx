'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

import { cn } from '~/lib/utils'

type RevealProps = {
    children: ReactNode
    className?: string
    delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
    const shouldReduceMotion = useReducedMotion()

    return (
        <motion.div
            className={className}
            initial={
                shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 18, filter: 'blur(4px)' }
            }
            transition={{
                delay,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ amount: 0.2, once: true }}
            whileInView={
                shouldReduceMotion
                    ? undefined
                    : { opacity: 1, y: 0, filter: 'blur(0px)' }
            }
        >
            {children}
        </motion.div>
    )
}

const polygons = [
    '55,18 153,50 92,115',
    '153,50 258,28 214,126',
    '92,115 153,50 214,126',
    '92,115 214,126 142,207',
    '214,126 309,98 273,195',
    '142,207 214,126 273,195',
    '142,207 273,195 225,286',
    '273,195 354,247 225,286',
    '225,286 354,247 326,348',
    '225,286 326,348 189,377',
]

const lines = [
    [18, 84, 55, 18],
    [258, 28, 337, 8],
    [309, 98, 385, 62],
    [354, 247, 396, 198],
    [326, 348, 382, 397],
    [189, 377, 126, 418],
    [92, 115, 26, 174],
]

export function TechField({ className }: { className?: string }) {
    const shouldReduceMotion = useReducedMotion()

    return (
        <div
            aria-hidden="true"
            className={cn(
                'pointer-events-none absolute inset-0 overflow-hidden',
                className
            )}
        >
            <motion.div
                animate={
                    shouldReduceMotion
                        ? undefined
                        : { rotate: [0, 0.8, 0], scale: [1, 1.015, 1] }
                }
                className="absolute top-1/2 right-[-7rem] h-[42rem] w-[42rem] -translate-y-1/2 opacity-70 sm:right-[-3rem] lg:right-[2vw]"
                transition={{
                    duration: 18,
                    ease: 'easeInOut',
                    repeat: Number.POSITIVE_INFINITY,
                }}
            >
                <svg
                    className="size-full"
                    fill="none"
                    viewBox="0 0 410 430"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>Abstract geometric network</title>
                    {lines.map(([x1, y1, x2, y2], index) => (
                        <line
                            key={`${x1}-${y1}`}
                            stroke="currentColor"
                            strokeOpacity={index % 2 === 0 ? 0.42 : 0.2}
                            strokeWidth="0.75"
                            x1={x1}
                            x2={x2}
                            y1={y1}
                            y2={y2}
                        />
                    ))}
                    {polygons.map((points, index) => (
                        <motion.polygon
                            animate={
                                shouldReduceMotion
                                    ? undefined
                                    : {
                                          fillOpacity: [
                                              0.03 + (index % 3) * 0.035,
                                              0.13 + (index % 2) * 0.04,
                                              0.03 + (index % 3) * 0.035,
                                          ],
                                      }
                            }
                            fill="currentColor"
                            fillOpacity={0.05 + (index % 3) * 0.035}
                            key={points}
                            points={points}
                            stroke="currentColor"
                            strokeOpacity={0.28 + (index % 2) * 0.22}
                            strokeWidth="0.75"
                            transition={{
                                delay: index * 0.18,
                                duration: 5 + (index % 4),
                                ease: 'easeInOut',
                                repeat: Number.POSITIVE_INFINITY,
                            }}
                        />
                    ))}
                    {[
                        [55, 18],
                        [153, 50],
                        [214, 126],
                        [273, 195],
                        [354, 247],
                        [326, 348],
                        [189, 377],
                    ].map(([cx, cy]) => (
                        <circle
                            cx={cx}
                            cy={cy}
                            fill="currentColor"
                            key={`${cx}-${cy}`}
                            r="1.7"
                        />
                    ))}
                </svg>
            </motion.div>
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/95 to-transparent lg:via-background/60" />
        </div>
    )
}
