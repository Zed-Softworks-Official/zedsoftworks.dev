import '~/styles/globals.css'

import type { Metadata } from 'next'
import { Geist_Mono } from 'next/font/google'
import { TRPCReactProvider } from '~/trpc/react'

const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
    title: {
        default: 'Zed Softworks',
        template: '%s / Zed Softworks',
    },
    description:
        'Zed Softworks builds focused, open-source software for the systems you live with.',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
    metadataBase: new URL('https://zedsoftworks.dev'),
    openGraph: {
        description:
            'Independent software studio building focused, open-source tools.',
        siteName: 'Zed Softworks',
        title: 'Zed Softworks',
        type: 'website',
        url: '/',
    },
    twitter: {
        card: 'summary',
        description:
            'Independent software studio building focused, open-source tools.',
        title: 'Zed Softworks',
    },
}

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html className={`dark ${geistMono.variable}`} lang="en">
            <body>
                <TRPCReactProvider>{children}</TRPCReactProvider>
            </body>
        </html>
    )
}
