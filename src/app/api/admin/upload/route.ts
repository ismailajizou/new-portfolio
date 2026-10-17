import { auth } from "@/server/auth";
import { isStorageConfigured, uploadPublicFile } from "@/server/storage";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "application/pdf": "pdf",
};
const MAX_BYTES = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (!isStorageConfigured()) {
    return NextResponse.json(
      {
        message:
          "File storage is not configured. Set the S3_* variables, or paste a link instead.",
      },
      { status: 503 },
    );
  }

  const file = (await request.formData()).get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ message: "No file received." }, { status: 400 });
  }
  const extension = TYPES[file.type];
  if (!extension) {
    return NextResponse.json(
      { message: "Use a JPG, PNG, WebP or AVIF image, or a PDF." },
      { status: 415 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { message: "The file is larger than 5 MB." },
      { status: 413 },
    );
  }

  try {
    const key = `portfolio/${crypto.randomUUID()}.${extension}`;
    const url = await uploadPublicFile(
      key,
      new Uint8Array(await file.arrayBuffer()),
      file.type,
    );
    return NextResponse.json({ url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Upload failed. Check the storage credentials." },
      { status: 502 },
    );
  }
}
