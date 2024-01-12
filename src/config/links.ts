import { getCollection } from "astro:content";
import { contacts } from "./contact";

export interface Link {
  name: string;
  link: string;
  active: (pathname: string) => boolean;
  children?: Link[];
}

const albums = await getCollection("albums");
const blogs = await getCollection("blog");

export const links: Link[] = [
  {
    name: "Portfolio",
    link: "/",
    active: (pathname) => pathname.startsWith("/portfolio") || pathname === "/",
    children: albums.map((album) => ({
      name: album.data.name,
      link: `/portfolio/${album.data.slug}`,
      active: (pathname) =>
        pathname.startsWith(`/portfolio/${album.data.slug}`),
    })),
  },
  {
    name: "Blog",
    link: "/blog",
    active: (pathname) => pathname.startsWith("/blog"),
    children: blogs.map((blog) => ({
      name: blog.data.title,
      link: `/blog/${blog.slug}`,
      active: (pathname) => pathname.startsWith(`/blog/${blog.slug}`),
    })),
  },
  {
    name: "Contact",
    link: "/contact",
    active: () => false,
    children: contacts.map((contact) => ({
      name: contact.name,
      link: contact.link,
      active: () => false,
    })),
  },
  {
    name: "About",
    link: "/about",
    active: (pathname) => pathname.startsWith("/about"),
  },
];
