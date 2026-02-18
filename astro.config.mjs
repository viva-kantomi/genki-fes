// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const { PUBLIC_SITE_URL, PUBLIC_BASE_PATH } = loadEnv(
  process.env.NODE_ENV ?? 'production',
  process.cwd(),
  ''
);

// https://astro.build/config
export default defineConfig({
  site: PUBLIC_SITE_URL || 'https://viva-kantomi.github.io',
  base: PUBLIC_BASE_PATH ? `${PUBLIC_BASE_PATH}/` : '/',
  integrations: [sitemap()],
  output: 'static',
  trailingSlash: 'always',
});
