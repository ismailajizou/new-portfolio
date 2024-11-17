import connectMongo from "@/server/db";
import Testimonial from "@/server/db/models/testimonial";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongo();
    const filter = {
      status: req.nextUrl.searchParams.get("status") ?? "",
    };
    const testimonials = await Testimonial.find(filter);
    return NextResponse.json(testimonials);
  } catch (error) {
    // return a 500 error with the error message
    const message =
      error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json({ message }, { status: 500 });
  }
}
