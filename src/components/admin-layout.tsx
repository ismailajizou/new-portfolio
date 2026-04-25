"use client";
import { cn } from "@/lib/utils";
import { LayoutDashboard, MessageSquare } from "lucide-react";
import { useState } from "react";
import { usePanelCallbackRef } from "react-resizable-panels";
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
}: {
  children: React.ReactNode;
  navCollapsedSize?: number;
  numberOfTestimonials: number;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [, setPanelRef] = usePanelCallbackRef();

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        orientation="horizontal"
        onLayoutChanged={(layout) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            Object.values(layout),
          )}`;
        }}
        className="bg-background/95 flex h-screen! items-stretch overflow-hidden"
      >
        <ResizablePanel
          defaultSize={60}
          collapsedSize={navCollapsedSize}
          collapsible={false}
          minSize={40}
          maxSize={220}
          panelRef={setPanelRef}
          onResize={({ asPercentage }) => {
            setIsCollapsed(asPercentage <= navCollapsedSize);
          }}
          className={cn(
            isCollapsed && "transition-all duration-300 ease-in-out",
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
