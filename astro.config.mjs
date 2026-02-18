// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com', // TODO: 本番URLに変更
  integrations: [sitemap()],
  output: 'static',
  trailingSlash: 'always',
});
