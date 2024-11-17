"use client";

import { type JSX, useEffect, useMemo, useState } from "react";
import {
  Cloud,
  fetchSimpleIcons,
  type ICloud,
  renderSimpleIcon,
  type SimpleIcon,
} from "react-icon-cloud";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
    // dragControl: false,
  },
};

export const renderCustomIcon = (icon: SimpleIcon, theme: string): JSX.Element => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e) => e.preventDefault(),
    },
  }) as JSX.Element;
};

export type DynamicCloudProps = {
  iconSlugs: string[];
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export default function IconCloud({ iconSlugs }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null);
  // const { theme } = useTheme();

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData).catch(console.error);
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;

    return Object.values(data.simpleIcons).map((icon: SimpleIcon): JSX.Element =>
      renderCustomIcon(icon, "dark"),
    );
  }, [data]);

  return (
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  );
}
