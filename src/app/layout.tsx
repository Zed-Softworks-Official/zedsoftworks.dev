import '~/styles/globals.css'
import { ThemeProvider } from 'next-themes'

import localFont from 'next/font/local'

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
    icons: [{ rel: 'icon', url: '/favicon.ico' }]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${codePro.className}`}>
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
