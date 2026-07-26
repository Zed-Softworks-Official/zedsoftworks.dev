/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env'
import type { NextConfig } from 'next'

const config: NextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'avatars.githubusercontent.com',
                pathname: '/u/**',
                protocol: 'https',
            },
        ],
    },
}

export default config
