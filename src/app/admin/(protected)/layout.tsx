import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return redirect("/admin/login");
  }
  return children;
};
export default AdminLayout;
