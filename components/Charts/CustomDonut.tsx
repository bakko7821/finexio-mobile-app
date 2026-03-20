import { View } from "react-native";
import Svg, { G, Path } from "react-native-svg";

import { getContrastColor } from "@/utils/colors";
import { describeArc, polarToCartesian } from "@/utils/math/arc";
import { normalizeAngles } from "@/utils/math/normalizeAngles";
import { PieItem } from "@/utils/types/chart";
import { RenderIcon } from "../UI/RenderIcon";

interface Props {
  data: PieItem[];
}

export default function CustomDonut({ data }: Props) {
  const size = 220;
  const strokeWidth = 40;

  const center = size / 2;
  const radius = (size - strokeWidth) / 2;

  const iconSize = 24;
  const ICON_ANGLE_OFFSET = 34;

  const angles = normalizeAngles(data, radius);

  let currentAngle = 0;

  return (
    <View>
      <Svg width={size} height={size}>
        {data.map((item, index) => {
          const angle = angles[index];

          const startAngle = currentAngle;
          const endAngle = currentAngle + angle;

          const path = describeArc(
            center,
            center,
            radius,
            startAngle,
            endAngle,
          );

          // 📍 радиус для иконки (по внешнему краю)
          const iconRadius = radius;

          // 📍 угол — КОНЕЦ сегмента
          const iconAngle = endAngle - ICON_ANGLE_OFFSET;

          const iconPos = polarToCartesian(
            center,
            center,
            iconRadius,
            iconAngle,
          );

          currentAngle += angle;

          return (
            <G key={index}>
              <Path
                d={path}
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                fill="none"
              />

              {/* ИКОНКА */}
              <G x={iconPos.x - iconSize / 2} y={iconPos.y - iconSize / 2}>
                <RenderIcon
                  name={item.icon}
                  width={iconSize}
                  height={iconSize}
                  color={getContrastColor(item.color)}
                />
              </G>
            </G>
          );
        })}
      </Svg>
    </View>
  );
}
