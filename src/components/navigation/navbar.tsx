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
import {
  FileStackIcon,
  HomeIcon,
  MessagesSquareIcon,
  MousePointer2Icon,
  SquareUserIcon,
  SquareUserRoundIcon,
} from "lucide-react";
import RoundedMenu from "./rounded-menu";

const NAV_LINKS = [
  { label: "Home", href: "/docs", icon: HomeIcon },
  { label: "About", href: "/blog", icon: SquareUserIcon },
  { label: "Projects", href: "/community", icon: FileStackIcon },
  {
    label: "Testemonials",
    href: "/community",
    icon: MessagesSquareIcon,
  },
  { label: "Contact", href: "/community", icon: MousePointer2Icon },
];
export default function Navbar() {
  return (
    <div className="container flex items-center justify-between py-4">
      <div className="flex items-center space-x-4">
        <p className="text-xl">LOGO</p>
      </div>
      {/* Big screens Menu */}
      <NavigationMenu className="hidden rounded-md p-2 md:flex">
        <NavigationMenuList className="">
          {NAV_LINKS.map((item) => (
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

      {/* Small screens menu */}
      <RoundedMenu links={NAV_LINKS} />
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
