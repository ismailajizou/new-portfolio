import AdminLayout from "@/components/admin-layout";
import { Testimonials } from "@/components/testimonial/testimonials";
import { db } from "@/server/db";
import { testimonials } from "@/server/db/schema";
import { desc } from "drizzle-orm";

const Page = async () => {
  const mails = await db
    .select()
    .from(testimonials)
    .orderBy(desc(testimonials.createdAt));
  const data = mails.map((mail) => ({
    ...mail,
    _id: mail.id,
  }));
  return (
    <AdminLayout numberOfTestimonials={data.length}>
      <Testimonials data={data as any} />
    </AdminLayout>
  );
};
export default Page;
