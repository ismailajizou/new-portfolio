"use client";

import dynamic from "next/dynamic";
import type { DynamicCloudProps } from "./icon-cloud";

const IconCloud = dynamic(() => import("./icon-cloud"), { ssr: false });

export default function IconCloudClient(props: DynamicCloudProps) {
  return <IconCloud {...props} />;
}
