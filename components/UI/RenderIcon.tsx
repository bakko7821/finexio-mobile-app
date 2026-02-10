import { iconsArray } from "@/utils/icons";
import React from "react";
import { SvgProps } from "react-native-svg";

interface RenderIconProps {
  name: string;
  width?: number;
  height?: number;
  color?: string;
}

export function RenderIcon({
  name,
  width = 40,
  height = 40,
  color = "#000",
}: RenderIconProps) {
  const iconsMap: Record<string, React.FC<SvgProps>> = {};

  iconsArray.forEach((category) => {
    category.items.forEach((item) => {
      iconsMap[item.name] = item.Icon;
    });
  });
  const Icon = iconsMap[name];

  if (!Icon) return null;

  return <Icon width={width} height={height} color={color} />;
}