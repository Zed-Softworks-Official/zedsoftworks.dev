'use client'

import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadTrianglesPreset } from '@tsparticles/preset-triangles'

export default function ParticlesBackground() {
    const [init, setInit] = useState(false)

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadTrianglesPreset(engine)
        })
            .then(() => {
                setInit(true)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    if (!init) {
        return null
    }

    return (
        <Particles
            id="tsparticles"
            options={{
                preset: 'triangles'
            }}
        />
    )
}
