import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { getCollection } from "astro:content";
import { cn } from "@/lib/utils";

const albums = await getCollection("albums");

import { contacts } from "@/config/contact";
import { Menu, X } from "lucide-react";

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

export default function Navbar({ pathname = "" }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const collapse = (event: KeyboardEvent) => {
    if (event.key === "Escape") setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", collapse);
    return () => window.removeEventListener("keydown", collapse);
  }, []);

  return (
    <nav className="w-full shadow-lg z-50 sticky top-0 bg-background">
      <div className="container flex justify-between md:items-center flex-col md:flex-row">
        <div className="flex items-center z-40 justify-between">
          <a id="logo" href="/" className="flex items-center gap-2">
            <div className="w-10 h-16 flex items-center">
              <img className="h-auto w-auto" src="/favicon.png" alt="logo" />
            </div>
            Riley Paul
          </a>
          <Button
            variant="ghost"
            className="md:hidden"
            size="icon"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        <ul
          id="header-links"
          className={cn(
            "flex flex-col md:flex-row items-start md:first-line:items-center text-muted-foreground text-sm gap-2 h-full pb-4 md:pb-0",
            isOpen ? "flex" : "hidden md:flex"
          )}
        >
          {links.map((link) => (
            <li
              key={link.name}
              className={cn(
                "relative group h-full px-2 flex items-center border-l-2 md:border-l-0 md:border-b-2 border-transparent hover:border-muted-foreground",
                link.active(pathname) && "border-primary text-primary"
              )}
            >
              <a href={link.link} className="">
                {link.name}
              </a>
              {link.children && (
                <div className="fixed hidden gap-1 top-16 md:group-hover:flex bg-background shadow-lg flex-col py-2 text-muted-foreground">
                  {link.children.map((child) => (
                    <a
                      key={child.name}
                      href={child.link}
                      className={cn(
                        "p-2 border-l-2 border-transparent hover:border-muted-foreground",
                        child.active(pathname) &&
                          "text-foreground border-primary"
                      )}
                    >
                      {child.name}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
          <div id="social" className="flex gap-4 h-full">
            {contacts.map((c) => (
              <li
                key={c.link}
                className="border-b-2 border-transparent h-full flex items-center hover:border-muted-foreground"
              >
                <a href={c.link} target="_blank" rel="noopener noreferrer">
                  <c.icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </div>
        </ul>

        {/* <span id="page-title">{title}</span> */}
      </div>
    </nav>
  );
}
