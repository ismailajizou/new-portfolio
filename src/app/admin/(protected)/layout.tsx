import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session?.user) {
    return redirect("/admin/login");
  }
  return children;
};
export default AdminLayout;
