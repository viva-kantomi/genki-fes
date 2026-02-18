// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://viva-kantomi.github.io',
  base: '/genki-fes/',
  integrations: [sitemap()],
  output: 'static',
  trailingSlash: 'always',
});
