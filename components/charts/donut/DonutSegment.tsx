import { describeArc } from "@/utils/math/arc";
import { useEffect } from "react";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Props {
  cx: number;
  cy: number;
  r: number;
  strokeWidth: number;
  startAngle: number;
  endAngle: number;
  color: string;
  isActive: boolean;
  onFinish: () => void;
}

export default function DonutSegment({
  cx,
  cy,
  r,
  strokeWidth,
  startAngle,
  endAngle,
  color,
  isActive,
  onFinish,
}: Props) {
  const progress = useSharedValue(0);

  const path = describeArc(cx, cy, r, startAngle, endAngle);

  const length = Math.PI * 2 * r * ((endAngle - startAngle) / 360);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: length * (1 - progress.value),
  }));

  useEffect(() => {
    if (!isActive) return;

    progress.value = 0;

    progress.value = withTiming(
      1,
      { duration: 300, easing: Easing.out(Easing.cubic) },
      (finished) => {
        if (finished) {
          runOnJS(onFinish)();
        }
      },
    );
  }, [isActive]);

  return (
    <>
      <AnimatedPath
        d={path}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={[length]}
        animatedProps={animatedProps}
      />
    </>
  );
}
