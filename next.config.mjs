/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.itsmurf-servers.dk',
                port: '',
                pathname: '/aftensmad/**',
            },
        ],
    },
}

export default nextConfig