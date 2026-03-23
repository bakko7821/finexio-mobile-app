import { polarToCartesian } from "@/utils/math/arc";
import { PieItem } from "@/utils/types/chart";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import Svg from "react-native-svg";
import DonutIcon from "./DonutIcon";
import DonutSegment from "./DonutSegment";

interface Props {
  data: PieItem[];
  size?: number;
}

export default function DonutChart({ data, size = 220 }: Props) {
  const strokeWidth = 32;
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [data]);

  const segments = useMemo(() => {
    if (!data.length) return [];

    // 🔥 1 элемент — весь круг
    if (data.length === 1) {
      return [
        {
          ...data[0],
          startAngle: -90,
          endAngle: 270,
        },
      ];
    }

    // 🔥 2 элемента — делим по value без логарифма
    if (data.length === 2) {
      const total = data[0].value + data[1].value;

      let startAngle = -90;

      return data.map((item) => {
        const angle = (item.value / total) * 360;

        const segment = {
          ...item,
          startAngle,
          endAngle: startAngle + angle,
        };

        startAngle += angle;

        return segment;
      });
    }

    // 🔥 обычный случай (3+)
    const MIN_ANGLE = 6;

    const values = data.map((i) => Math.log(i.value + 1));
    const total = values.reduce((s, v) => s + v, 0);

    const raw = data.map((item, i) => {
      const percent = values[i] / total;
      const angle = Math.max(percent * 360, MIN_ANGLE);

      return { ...item, angle };
    });

    const totalAngle = raw.reduce((s, i) => s + i.angle, 0);

    let startAngle = -90;

    return raw.map((item) => {
      const angle = (item.angle / totalAngle) * 360;

      const segment = {
        ...item,
        startAngle,
        endAngle: startAngle + angle,
      };

      startAngle += angle;

      return segment;
    });
  }, [data]);

  return (
    <View>
      <Svg width={size} height={size}>
        {segments.length > 0 && (
          <>
            {/* все кроме первого */}
            {segments.map((seg, index) => {
              if (index === 0) return null;
              if (index > activeIndex) return null;

              return (
                <DonutSegment
                  key={index}
                  cx={cx}
                  cy={cy}
                  r={r}
                  strokeWidth={strokeWidth}
                  startAngle={seg.startAngle}
                  endAngle={seg.endAngle}
                  color={seg.color}
                  isActive={index === activeIndex}
                  onFinish={() => setActiveIndex(index + 1)}
                />
              );
            })}

            {/* первый сегмент */}
            {segments[0] && activeIndex >= 0 && (
              <DonutSegment
                key="first-segment"
                cx={cx}
                cy={cy}
                r={r}
                strokeWidth={strokeWidth}
                startAngle={segments[0].startAngle}
                endAngle={segments[0].endAngle}
                color={segments[0].color}
                isActive={activeIndex === 0}
                onFinish={() => setActiveIndex(1)}
              />
            )}
          </>
        )}
      </Svg>

      {/* иконки */}
      {segments.map((seg, index) => {
        if (index > activeIndex) return null;

        const pos = polarToCartesian(cx, cy, r, seg.startAngle);

        return (
          <DonutIcon
            item={seg}
            key={index}
            x={pos.x}
            y={pos.y}
            active={index === activeIndex}
          />
        );
      })}
    </View>
  );
}
