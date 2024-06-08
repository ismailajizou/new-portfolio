"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { FileStackIcon, HomeIcon, MessagesSquareIcon, MousePointer2Icon, SquareUserIcon, SquareUserRoundIcon } from "lucide-react";

export default function Navbar() {
  return (
    <div className="container flex items-center justify-between py-4">
      <div className="flex items-center space-x-4">
        <p className="text-xl">LOGO</p>
      </div>
      <NavigationMenu className="fixed bottom-4 left-1/2 flex -translate-x-1/2 rounded-md bg-primary p-2 md:static md:translate-x-0 md:bg-transparent">
        <NavigationMenuList className="">
          {[
            { label: "Home", href: "/docs", icon: HomeIcon },
            { label: "About", href: "/blog", icon: SquareUserIcon },
            { label: "Projects", href: "/community", icon: FileStackIcon },
            { label: "Testemonials", href: "/community", icon: MessagesSquareIcon },
            { label: "Contact", href: "/community", icon: MousePointer2Icon },
          ].map((item) => (
            <NavigationMenuItem key={item.label}>
              <Link href={item.href} passHref legacyBehavior>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <item.icon className="mr-0 md:mr-2" />
                  <p className="hidden md:flex">{item.label}</p>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div>
        <Button className="hidden md:flex">
          <SquareUserRoundIcon className="mr-2" />
          <p>Resume</p>
        </Button>
        <Button className="md:hidden" size={"icon"}>
          <SquareUserRoundIcon />
        </Button>
      </div>
    </div>
  );
}
