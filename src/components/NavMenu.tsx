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
  pathname: string;
}

export const NavMenu: React.FC<Props> = (props) => {
  const { pathname } = props;

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap justify-normal">
        {links.map((link) => (
          <NavigationMenuItem>
            {link.children ? (
              <>
                <NavigationMenuTrigger
                  className={cn(link.active(pathname) && "font-bold")}
                >
                  {link.icon && (
                    <link.icon className="w-4 h-4 mr-3 text-secondary-foreground" />
                  )}
                  {link.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background">
                  <ul className="grid w-[300px] gap-2 p-4">
                    {link.children.map((child) => (
                      <li>
                        <a href={child.link}>
                          <NavigationMenuLink
                            className={cn(
                              navigationMenuTriggerStyle(),
                              "w-full justify-start h-auto",
                              child.active(pathname) && "font-bold"
                            )}
                          >
                            {child.icon && (
                              <child.icon className="w-4 h-4 mr-3 text-secondary-foreground" />
                            )}
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
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    link.active(pathname) && "font-bold"
                  )}
                >
                  {link.icon && (
                    <link.icon className="w-4 h-4 mr-3 text-secondary-foreground" />
                  )}
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
