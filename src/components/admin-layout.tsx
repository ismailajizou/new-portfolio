"use client";
import { cn } from "@/lib/utils";
import { Inbox, LayoutDashboard, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Nav } from "./ui/nav";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { TooltipProvider } from "./ui/tooltip";

const AdminLayout = ({
  children,
  navCollapsedSize = 4,
  numberOfTestimonials,
  numberOfContacts,
}: {
  children: React.ReactNode;
  navCollapsedSize?: number;
  numberOfTestimonials: number;
  numberOfContacts: number;

}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-screen items-stretch flex overflow-hidden bg-background/95"
      >
        <ResizablePanel
          defaultSize={265}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'collapsed' implicitly has an 'any' type.
          onCollapse={(collapsed: boolean) => {
            setIsCollapsed(collapsed);
            // document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            //   collapsed,
            // )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out",
          )}
        >
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Dashboard",
                label: "",
                icon: LayoutDashboard,
                href: "/admin/dashboard",
              },
              {
                title: "Inbox",
                label: numberOfContacts.toString(),
                icon: Inbox,
                href: "/admin/contacts",
              },
              {
                title: "Testimonials",
                label: numberOfTestimonials.toString(),
                icon: MessageSquare,
                href: "/admin/testimonials",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        {children}
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};
export default AdminLayout;
