import Image from 'next/image'
import ParticlesBackground from '~/components/particles'

export default function HomePage() {
    return (
        <main>
            <div className="pointer-events-none flex h-screen w-screen flex-col items-center justify-center gap-5 bg-transparent">
                <Image
                    src={'/logo.svg'}
                    alt="Zed Softworks Logo"
                    width={250}
                    height={250}
                />
                <h1 className="text-3xl font-bold text-white">Zed Softworks</h1>
            </div>
            <ParticlesBackground />
        </main>
    )
}
