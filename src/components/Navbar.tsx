import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { getCollection } from "astro:content";

const contacts = await getCollection("contact");
const pages = await getCollection("pages");

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
    <nav className="w-full bg-gray-50 shadow-lg top-0 z-50 px-4 md:px-8 sticky md:flex md:justify-between md:items-center">
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
        {pages.map((page) => {
          const isCurrent =
            page.data.link === pathname || page.data.link === pathname + "/";

          return (
            <li>
              <a href={page.data.link}>
                <Button
                  variant="link"
                  size="lg"
                  className={`px-4 ${isCurrent ? "underline" : ""}`}
                >
                  {page.data.name}
                </Button>
              </a>
            </li>
          );
        })}
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
