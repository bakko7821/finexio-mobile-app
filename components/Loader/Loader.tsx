import { useProgress } from "@/providers/ProgressProvider";
import { useEffect } from "react";
import { useColorScheme, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import LoaderText from "./LoaderText";

export default function Loader({ onFinish }: { onFinish?: () => void }) {
  const { progress } = useProgress();
  // const progress = 1;
  const scheme = useColorScheme();

  const background = scheme === "dark" ? "#0A0F15" : "#FFFFFF";

  const p = useSharedValue(0);
  const pulse = useSharedValue(1);
  const explode = useSharedValue(0);
  const rotation = useSharedValue(0);

  // прогресс
  useEffect(() => {
    p.value = withTiming(progress, { duration: 400 });

    if (progress >= 1) {
      explode.value = withTiming(1, { duration: 600 }, () => {
        if (onFinish) runOnJS(onFinish)();
      });

      rotation.value = withTiming(1440, { duration: 600 });
    }
  }, [progress]);

  // пульсация круга
  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 800 }),
        withTiming(1, { duration: 800 }),
      ),
      -1,
    );
  }, []);

  // вращение буквы f
  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(720, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
  }, []);

  // стиль круга
  const circleStyle = useAnimatedStyle(() => {
    const scale = interpolate(p.value, [0, 1], [0.8, 1.4]);

    return {
      transform: [{ scale: scale * pulse.value * (1 + explode.value * 2) }],
      opacity: 1 - explode.value,
    };
  });

  // вспышка
  const flashStyle = useAnimatedStyle(() => ({
    opacity: explode.value,
    transform: [{ scale: 1 + explode.value * 4 }],
  }));

  // стиль буквы F
  const textStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
        {
          scale: 1 + explode.value * 0.5,
        },
      ],
      opacity: 1 - explode.value,
    };
  });

  return (
    <View
      className="justify-center items-center flex-1 p-4 flex-col gap-10"
      style={{
        backgroundColor: background,
      }}
    >
      {/* Основной элемент */}
      <Animated.View
        className="rounded-full items-center justify-center h-[120px] w-[120px]"
        style={[
          {
            backgroundColor: "#9d4ae2",
          },
          circleStyle,
        ]}
      >
        <Animated.View
          style={[
            {
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
            },
            textStyle,
          ]}
        >
          <Animated.Text
            style={{
              fontSize: 48,
              fontWeight: "700",
              color: background,
            }}
          >
            F
          </Animated.Text>
        </Animated.View>
      </Animated.View>
      <View className="absolute bottom-4">
        <LoaderText color="#9C9C9C" />
      </View>

      {/* Вспышка */}
      <Animated.View
        className="absolute w-[200px] h-[200px] rounded-full"
        style={[
          {
            backgroundColor: "#9d4ae2",
          },
          flashStyle,
        ]}
      />
    </View>
  );
}
