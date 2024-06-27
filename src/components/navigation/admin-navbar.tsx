import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import {
  HomeIcon,
  LogOutIcon,
  MessagesSquareIcon,
  MousePointer2Icon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { logout } from "@/app/_actions/auth";

const Navbar = () => {
  return (
    <div className="container flex items-center justify-between py-4">
      <div className="flex items-center space-x-4">
        <p className="text-xl">ADMIN PANEL</p>
      </div>
      <NavigationMenu className="flex rounded-md bg-transparent p-2">
        <NavigationMenuList className="">
          {[
            { label: "Dashboard", href: "/admin", icon: HomeIcon },
            {
              label: "Testimonials",
              href: "/admin/testimonials",
              icon: MessagesSquareIcon,
            },
            {
              label: "Contacts",
              href: "/admin/contacts",
              icon: MousePointer2Icon,
            },
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
        <form action={logout}>
          <Button className="flex">
            <LogOutIcon className="mr-2" />
            <p>Logout</p>
          </Button>
        </form>
      </div>
    </div>
  );
};
export default Navbar;
