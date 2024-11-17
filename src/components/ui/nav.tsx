"use client";

import { LogOutIcon, type LucideIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Separator } from "./separator";
import { logout } from "@/app/_actions/auth";
import { usePathname } from "next/navigation";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    href: string;
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className={cn(
                    buttonVariants({ size: "icon", variant: "ghost" }),
                    "h-9 w-9",
                    pathname === link.href &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href={link.href}
              className={cn(
                buttonVariants({ size: "sm", variant: "ghost" }),
                pathname === link.href &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start",
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    pathname === link.href && "text-background dark:text-white",
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          ),
        )}
        <Separator />
        {isCollapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <form action={logout}>
                <Button
                  className={cn(
                    buttonVariants({ variant: "default", size: "icon" }),
                    "h-9 w-9",
                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                  )}
                >
                  <LogOutIcon className="h-4 w-4" />
                  <span className="sr-only">Logout</span>
                </Button>
              </form>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              Logout
            </TooltipContent>
          </Tooltip>
        ) : (
          <form action={logout}>
            <Button
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full justify-start",
              )}
            >
              <LogOutIcon className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </form>
        )}
      </nav>
    </div>
  );
}
