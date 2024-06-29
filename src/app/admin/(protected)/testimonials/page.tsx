import AdminLayout from "@/components/admin-layout";
import { Testimonials } from "@/components/testimonial/testimonials";
import connectMongo from "@/server/db";
import Contact from "@/server/db/models/contact";
import Testimonial from "@/server/db/models/testimonial";

const Page = async () => {
  await connectMongo();
  const mails = await Testimonial.find().sort({ createdAt: -1 }).exec();
  const data = mails.map((mail) => ({
    ...mail.toObject(),
    _id: mail._id.toString(),
  }));
  const contactsCount = await Contact.countDocuments().exec();
  return (
    <AdminLayout
      numberOfContacts={contactsCount}
      numberOfTestimonials={data.length}
    >
      <Testimonials data={data} />
    </AdminLayout>
  );
};
export default Page;
