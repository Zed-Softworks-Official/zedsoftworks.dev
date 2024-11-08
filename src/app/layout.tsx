import '~/styles/globals.css'
import { ThemeProvider } from 'next-themes'

import localFont from 'next/font/local'
import type { Metadata } from 'next'

const codePro = localFont({
    src: [
        {
            path: '../../public/fonts/codecProRegular.woff2',
            weight: '400',
            style: 'normal'
        },
        { path: '../../public/fonts/codecProBold.woff2', weight: '700', style: 'bold' }
    ],
    display: 'swap',
    style: 'normal'
})

export const metadata = {
    title: 'Zed Softworks',
    description:
        'Zed Softworks is a software development company that specializes in web development and cloud services.',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
    openGraph: {
        title: 'Zed Softworks',
        description:
            'Zed Softworks is a software development company that specializes in web development and cloud services.',
        images: ['/logo.svg']
    },
    twitter: {
        title: 'Zed Softworks',
        description:
            'Zed Softworks is a software development company that specializes in web development and cloud services.',
        images: ['/logo.svg']
    }
} satisfies Metadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${codePro.className}`} suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
