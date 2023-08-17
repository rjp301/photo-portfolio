import { z, defineCollection } from "astro:content";

const contactCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    link: z.string(),
    icon: z.string(),
  }),
});

const pageCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    link: z.string(),
  }),
});

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    cover: z.string(),
    draft: z.boolean().optional(),
  }),
});

const albumCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  contact: contactCollection,
  headerLinks: pageCollection,
  blog: blogCollection,
  albums: albumCollection,
};
