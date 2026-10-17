import { Testimonials } from "@/components/testimonial/testimonials";
import { ResizablePanelGroup } from "@/components/ui/resizable";
import { db } from "@/server/db";
import { testimonials } from "@/server/db/schema";
import { desc } from "drizzle-orm";

const Page = async () => {
  const data = await db
    .select()
    .from(testimonials)
    .orderBy(desc(testimonials.createdAt));
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-[calc(100dvh-7rem)]! items-stretch md:h-dvh!"
    >
      <Testimonials data={data} />
    </ResizablePanelGroup>
  );
};
export default Page;
