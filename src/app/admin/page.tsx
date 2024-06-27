import Navbar from "@/components/navigation/admin-navbar";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session?.user) {
    return redirect("/admin/login");
  }
  return redirect("/admin/dashboard");
};
export default Page;
