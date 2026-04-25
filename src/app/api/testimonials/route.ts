import { db } from "@/server/db";
import { testimonials, type Testimonial } from "@/server/db/schema";
import { type NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const status = req.nextUrl.searchParams.get("status");

    let result: Testimonial[];
    if (status && ["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      result = await db
        .select()
        .from(testimonials)
        .where(
          eq(
            testimonials.status,
            status as "PENDING" | "APPROVED" | "REJECTED",
          ),
        );
    } else {
      result = await db.select().from(testimonials);
    }

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json({ message }, { status: 500 });
  }
}
