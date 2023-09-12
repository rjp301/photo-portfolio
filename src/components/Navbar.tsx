import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { getCollection } from "astro:content";
import { cn } from "@/lib/utils";

const contacts = await getCollection("contact");
const albums = await getCollection("albums");

interface Link {
  name: string;
  link: string;
  active: (pathname: string) => boolean;
  children?: Link[];
}

const links: Link[] = [
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
  },
  {
    name: "About",
    link: "/about",
    active: (pathname) => pathname.startsWith("/about"),
  },
];

interface Props {
  pathname: string;
}

export default function Navbar({ pathname }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const collapse = (event: KeyboardEvent) => {
    if (event.key === "Escape") setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", collapse);
    return () => window.removeEventListener("keydown", collapse);
  }, []);

  return (
    <nav className="w-full bg-card shadow-lg top-0 z-50 px-4 md:px-8 sticky md:flex md:justify-between md:items-center">
      <div className="flex items-center z-40 justify-between">
        <a id="logo" href="/" className="flex items-center gap-2 py-4">
          <img className="h-12" src="/favicon.png" alt="logo" />
          Riley Paul
        </a>
        <Button
          variant="ghost"
          className="md:hidden"
          size="icon"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <i
            className={`fa-solid text-lg px-4 ${isOpen ? "fa-x" : "fa-bars"}`}
          />
        </Button>
      </div>

      <ul
        id="header-links"
        className={`flex-col py-4 md:flex md:flex-row items-center text-gray-600 ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        {links.map((link) => (
          <li key={link.name} className="relative group">
            <a href={link.link}>
              <Button
                variant="link"
                size="lg"
                className={cn("px-4 w-full", { underline: link.active(pathname) })}
              >
                {link.name}
              </Button>
            </a>
            {link.children && (
              <div className="fixed hidden md:group-hover:flex bg-card shadow-lg flex-col">
                {link.children.map((child) => (
                  <a href={child.link}>
                    <Button
                      variant="link"
                      size="lg"
                      className={cn("px-4", {
                        underline: child.active(pathname),
                      })}
                    >
                      {child.name}
                    </Button>
                  </a>
                ))}
              </div>
            )}
          </li>
        ))}
        <div id="social" className="flex gap-2">
          {contacts.map((c) => (
            <li key={c.data.link}>
              <a href={c.data.link} target="_blank" rel="noopener noreferrer">
                <Button variant="link" size="icon" className="px-4">
                  <i className={`${c.data.icon} font-normal`} />
                </Button>
              </a>
            </li>
          ))}
        </div>
      </ul>

      {/* <span id="page-title">{title}</span> */}
    </nav>
  );
}
