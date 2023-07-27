import { useEffect, useState } from "react";
import { contact } from "@/lib/config";
import { Button } from "./ui/button";

export default function Navbar() {
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
        <button
          id="nav-toggle-button"
          className="h-12 focus:outline-none flex items-center justify-center md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <i
            className={`fa-solid text-lg px-4 ${isOpen ? "fa-x" : "fa-bars"}`}
          />
        </button>
      </div>

      <ul
        id="header-links"
        className={`flex-col gap-2 py-4 md:flex md:flex-row items-center text-gray-600 ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <li>
          <a href="/">
            <Button variant="link">Portfolio</Button>
          </a>
        </li>
        <li>
          <a href="/blog/">
            <Button variant="link">Blog</Button>
          </a>
        </li>
        <li>
          <a href="/about/">
            <Button variant="link">About</Button>
          </a>
        </li>
        <div id="social" className="flex gap-2">
          {contact.map((c) => (
            <li key={c.link}>
              <a href={c.link} target="_blank" rel="noopener noreferrer">
                <Button variant="link" size="icon">
                  <i className={`${c.icon}`} />
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
