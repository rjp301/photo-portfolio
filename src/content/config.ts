import { z, defineCollection } from "astro:content";

const contactCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    link: z.string(),
    icon: z.string(),
  }),
});

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      cover: image(),
      draft: z.boolean().optional(),
    }),
});

const albumCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    slug: z.string(),
  }),
});

export const collections = {
  contact: contactCollection,
  blog: blogCollection,
  albums: albumCollection,
};
