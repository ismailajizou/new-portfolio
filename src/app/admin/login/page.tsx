import AdminLoginForm from "@/components/forms/admin-login";
import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user) {
    return redirect("/admin");
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <AdminLoginForm />
    </div>
  );
};
export default Page;
