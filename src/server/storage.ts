import { env } from "@/env";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

let client: S3Client | undefined;

export function isStorageConfigured() {
  return Boolean(
    env.S3_BUCKET &&
    env.S3_ACCESS_KEY_ID &&
    env.S3_SECRET_ACCESS_KEY &&
    env.S3_PUBLIC_URL,
  );
}

function getClient() {
  client ??= new S3Client({
    region: env.S3_REGION ?? "auto",
    endpoint: env.S3_ENDPOINT,
    // Path-style URLs work on MinIO and R2 as well as AWS.
    forcePathStyle: Boolean(env.S3_ENDPOINT),
    credentials: {
      accessKeyId: env.S3_ACCESS_KEY_ID!,
      secretAccessKey: env.S3_SECRET_ACCESS_KEY!,
    },
  });
  return client;
}

export async function uploadPublicFile(
  key: string,
  body: Uint8Array,
  contentType: string,
) {
  await getClient().send(
    new PutObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );
  return `${env.S3_PUBLIC_URL!.replace(/\/$/, "")}/${key}`;
}
