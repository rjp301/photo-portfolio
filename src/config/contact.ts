import { AtSign, Facebook, Instagram, type LucideIcon } from "lucide-react";

interface Link {
  name: string;
  link: string;
  icon: LucideIcon;
}

export const contacts: Link[] = [
  {
    name: "Email",
    link: "mailto:rileypaul96@gmail.com",
    icon: AtSign,
  },
  {
    name: "Facebook",
    link: "https://www.facebook.com/rileypaulphoto",
    icon: Facebook,
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/riley_was_there",
    icon: Instagram,
  },
];
