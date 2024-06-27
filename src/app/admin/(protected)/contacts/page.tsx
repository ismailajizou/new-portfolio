import AdminLayout from "@/components/admin-layout";
import { Mail } from "@/components/ui/mail";
import connectMongo from "@/server/db";
import Contact from "@/server/db/models/contact";

const Page = async () => {
  await connectMongo();
  const mails = await Contact.find().sort({ createdAt: -1 }).exec();
  const data = mails.map((mail) => ({
    ...mail.toObject(),
    _id: mail._id.toString(),
  }));
  return (
    <AdminLayout>
      <Mail mails={data} />
    </AdminLayout>
  );
};
export default Page;
