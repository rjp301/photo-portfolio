import { AtSign, Facebook, Instagram, type LucideIcon } from "lucide-react";

export interface Contact {
  name: string;
  link: string;
  icon: LucideIcon;
}

export const contacts: Contact[] = [
  {
    name: "Email",
    link: "mailto:rileypaul96@gmail.com",
    icon: AtSign,
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/riley_was_there",
    icon: Instagram,
  },
  {
    name: "Facebook",
    link: "https://www.facebook.com/rileypaulphoto",
    icon: Facebook,
  },
];
