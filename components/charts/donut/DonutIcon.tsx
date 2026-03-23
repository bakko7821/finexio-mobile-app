import { RenderIcon } from "@/components/UI/RenderIcon";
import { getContrastColor } from "@/utils/colors";
import { PieItem } from "@/utils/types/chart";
import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  x: number;
  y: number;
  active: boolean;
  item: PieItem;
}

export default function DonutIcon({ x, y, active, item }: Props) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (active) {
      opacity.value = 0;
      opacity.value = withTiming(1, { duration: 300 });
    }
  }, [active]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          backgroundColor: item.color,
          padding: 4,
          borderRadius: 999,
          position: "absolute",
          left: x - 16,
          top: y - 16,
        },
        style,
      ]}
    >
      <RenderIcon
        name={item.icon}
        width={24}
        height={24}
        color={getContrastColor(item.color)}
        // color={item.color}
      />
    </Animated.View>
  );
}
