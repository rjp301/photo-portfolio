import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import robotsTxt from 'astro-robots-txt'

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), tailwind(), svelte(), mdx(), robotsTxt()],
  site: "https://photo.rileypaul.ca"
});