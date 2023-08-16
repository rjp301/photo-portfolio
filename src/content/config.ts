import { z, defineCollection } from "astro:content";

const contactCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    link: z.string(),
    icon: z.string(),
  }),
});

export const collections = {
  contact: contactCollection,
};
