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
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (active) {
      rotation.value = 0;
      rotation.value = withTiming(360, { duration: 200 });
    }
  }, [active]);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: x - 12,
          top: y - 12,
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
