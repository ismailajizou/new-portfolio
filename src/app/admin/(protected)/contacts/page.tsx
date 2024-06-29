import AdminLayout from "@/components/admin-layout";
import { Mail } from "@/components/ui/mail";
import connectMongo from "@/server/db";
import Contact from "@/server/db/models/contact";
import Testimonial from "@/server/db/models/testimonial";

const Page = async () => {
  await connectMongo();
  const mails = await Contact.find().sort({ createdAt: -1 }).exec();
  const data = mails.map((mail) => ({
    ...mail.toObject(),
    _id: mail._id.toString(),
  }));
  const testimonialsCount = await Testimonial.countDocuments().exec();
  return (
    <AdminLayout
      numberOfContacts={data.length}
      numberOfTestimonials={testimonialsCount}
    >
      <Mail mails={data} />
    </AdminLayout>
  );
};
export default Page;
