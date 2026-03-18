/** @type {import('next').NextConfig} */
import {fileURLToPath} from 'node:url';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    turbopack: {
        root: fileURLToPath(new URL('.', import.meta.url)),
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.sanity.io',
            port: '',
          },
        ],
      },
};

export default withNextIntl(nextConfig);
