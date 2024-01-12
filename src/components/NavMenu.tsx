import { links, type Link } from "@/config/links";
import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface Props {
  pathname?: string;
}

export const NavMenu: React.FC<Props> = (props) => {
  const { pathname } = props;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {links.map((link) => (
          <NavigationMenuItem>
            {link.children ? (
              <>
                <NavigationMenuTrigger>{link.name}</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background">
                  <ul className="grid w-[250px] gap-2 p-4">
                    {link.children.map((child) => (
                      <li>
                        <a href={child.link}>
                          <NavigationMenuLink
                            className={cn(
                              navigationMenuTriggerStyle(),
                              "w-full justify-start h-auto"
                            )}
                          >
                            {child.name}
                          </NavigationMenuLink>
                        </a>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <a href={link.link}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {link.name}
                </NavigationMenuLink>
              </a>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
