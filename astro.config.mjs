import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://willmau.com',
  integrations: [
    sitemap({
      // The archive lives under public/archive/ as static files and is
      // noindexed; keep it out of the sitemap regardless. The Wood Badge
      // page is shared by link only and is noindexed too.
      filter: (page) => !page.includes('/archive/') && !page.includes('/woodbadge'),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
