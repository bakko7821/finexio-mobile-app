import { useTheme } from "@/hooks/useTheme";
import { useProgress } from "@/providers/ProgressProvider";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

export default function Loader() {
  const { progress } = useProgress();
  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: progress,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animated, progress]);

  const width = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const theme = useTheme();

  return (
    <View
      className="flex-1 flex-col justify-end gap-1 p-6"
      style={{
        backgroundColor: theme.background,
      }}
    >
      <Text style={{ color: theme.secondary }} className="text-sm font-medium">
        Загрузка приложения...
      </Text>
      <View
        style={{
          borderRadius: 16,
          height: 4,
          width: "100%",
          backgroundColor: theme.card,
        }}
      >
        <Animated.View
          style={{
            borderRadius: 16,
            height: "100%",
            width,
            backgroundColor: theme.primary,
          }}
        />
      </View>
    </View>
  );
}
