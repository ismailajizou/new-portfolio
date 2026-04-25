import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return redirect("/admin/login");
  }
  return redirect("/admin/dashboard");
};
export default Page;
