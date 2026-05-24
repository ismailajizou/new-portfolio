import { ResizablePanel } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import AdminLayout from "@/components/admin-layout";
import { db } from "@/server/db";
import { testimonials } from "@/server/db/schema";
import { sql } from "drizzle-orm";

const Page = async () => {
  const testimonialResult = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(testimonials);
  const testimonialCount = testimonialResult[0]?.count ?? 0;
  return (
    <AdminLayout numberOfTestimonials={testimonialCount}>
      <ResizablePanel defaultSize={440} minSize={30}>
        <div className="flex items-center px-4 py-2">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <Separator />
        <div className="bg-background/95 supports-backdrop-filter:bg-background/60 p-4 backdrop-blur"></div>
      </ResizablePanel>
    </AdminLayout>
  );
};
export default Page;
