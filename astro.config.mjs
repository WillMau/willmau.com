import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://willmau.com',
  integrations: [
    sitemap({
      // The archive lives under public/archive/ as static files and is
      // noindexed; keep it out of the sitemap regardless.
      filter: (page) => !page.includes('/archive/'),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
