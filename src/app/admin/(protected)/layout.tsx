import { AdminSidebar } from "@/components/admin/sidebar";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { testimonials } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return redirect("/admin/login");
  }
  const [pending] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(testimonials)
    .where(eq(testimonials.status, "PENDING"));

  return (
    <div className="bg-background flex min-h-dvh flex-col md:h-dvh md:flex-row md:overflow-hidden">
      <AdminSidebar pendingTestimonials={pending?.count ?? 0} />
      <main className="min-w-0 flex-1 md:overflow-y-auto">{children}</main>
    </div>
  );
};
export default AdminLayout;
