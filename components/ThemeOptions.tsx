import CheckIcon from "@/assets/ui/BadgeCheck.svg";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/colors";
import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Props = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

export default function ThemeOption({ label, isActive, onPress }: Props) {
  const theme = useTheme();
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isActive) {
      scale.value = withSpring(1, { damping: 12 });
      opacity.value = withTiming(1, { duration: 150 });
    } else {
      scale.value = 0.8;
      opacity.value = withTiming(0, { duration: 100 });
    }
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: isActive ? theme.primary : theme.card,
      }}
      className="w-full p-4 flex-row items-center justify-between"
    >
      <Text
        className="text-base font-medium"
        style={{
          color: isActive ? getContrastColor(theme.primary) : theme.text,
        }}
      >
        {label}
      </Text>
      <Animated.View style={animatedStyle}>
        <CheckIcon
          width={24}
          height={24}
          color={getContrastColor(theme.primary)}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}
