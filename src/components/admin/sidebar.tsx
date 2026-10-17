"use client";

import { logout } from "@/app/_actions/auth";
import { COLLECTIONS, COLLECTION_KEYS } from "@/cms/collections";
import { LogoMark } from "@/components/site/logo";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Package,
  SlidersHorizontal,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ICONS: Record<(typeof COLLECTION_KEYS)[number], LucideIcon> = {
  experiences: Briefcase,
  projects: Package,
  skills: Wrench,
  education: GraduationCap,
  certifications: Award,
  events: CalendarDays,
};

function NavLink({
  href,
  icon: Icon,
  children,
  badge,
}: {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  badge?: number;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-9 shrink-0 items-center gap-2.5 rounded-md px-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-foreground hover:bg-muted",
      )}
    >
      <Icon className="size-4 shrink-0" aria-hidden />
      <span className="whitespace-nowrap">{children}</span>
      {badge ? (
        <span
          className={cn(
            "ml-auto rounded-full px-1.5 py-0.5 text-xs leading-none tabular-nums",
            active
              ? "bg-primary-foreground/20"
              : "bg-progress/25 text-progress-ink",
          )}
        >
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

export function AdminSidebar({
  pendingTestimonials,
}: {
  pendingTestimonials: number;
}) {
  return (
    <aside className="border-border bg-card flex shrink-0 flex-col border-b md:h-dvh md:w-60 md:border-r md:border-b-0">
      <div className="flex h-14 items-center justify-between px-4">
        <Link
          href="/admin/dashboard"
          className="font-heading inline-flex items-center gap-2 text-base font-semibold"
        >
          <LogoMark size={22} gradientId="admin-signal" />
          Backoffice
        </Link>
        <Link
          href="/"
          target="_blank"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs"
        >
          View site <ArrowUpRight className="size-3.5" aria-hidden />
        </Link>
      </div>
      <nav
        aria-label="Backoffice"
        className="flex gap-1 overflow-x-auto px-2 pb-2 md:flex-1 md:flex-col md:overflow-x-visible md:overflow-y-auto"
      >
        <NavLink href="/admin/dashboard" icon={LayoutDashboard}>
          Overview
        </NavLink>
        <NavLink href="/admin/settings" icon={SlidersHorizontal}>
          Site settings
        </NavLink>
        <p className="text-muted-foreground hidden px-2.5 pt-4 pb-1 text-xs font-medium md:block">
          Content
        </p>
        {COLLECTION_KEYS.map((key) => (
          <NavLink key={key} href={`/admin/content/${key}`} icon={ICONS[key]}>
            {COLLECTIONS[key].label}
          </NavLink>
        ))}
        <p className="text-muted-foreground hidden px-2.5 pt-4 pb-1 text-xs font-medium md:block">
          Inbox
        </p>
        <NavLink
          href="/admin/testimonials"
          icon={MessageSquare}
          badge={pendingTestimonials}
        >
          Testimonials
        </NavLink>
        <form action={logout} className="md:mt-auto md:pt-4">
          <button
            type="submit"
            className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-9 w-full items-center gap-2.5 rounded-md px-2.5 text-sm font-medium whitespace-nowrap"
          >
            <LogOut className="size-4" aria-hidden /> Log out
          </button>
        </form>
      </nav>
    </aside>
  );
}
