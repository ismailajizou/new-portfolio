import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session?.user) {
    return redirect("/admin/login");
  }
  return (
    <div>
      <h1>Admin Login</h1>
      <p>Log in to access the admin panel</p>
    </div>
  );
};
export default Page;
