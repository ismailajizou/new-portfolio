"use client";

import { ResizablePanel } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import AdminLayout from "@/components/admin-layout";

const Page = () => {
  return (
    <AdminLayout>
      <ResizablePanel defaultSize={440} minSize={30}>
        <div className="flex items-center px-4 py-2">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <Separator />
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"></div>
      </ResizablePanel>
    </AdminLayout>
  );
};
export default Page;
