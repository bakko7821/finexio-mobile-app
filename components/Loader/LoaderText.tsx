import { useEffect, useState } from "react";
import { Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const LOADING_TEXTS = [
  "Загружаем приложение...",
  "Подключаем базу данных...",
  "Считаем финансы...",
  "Оптимизируем расходы...",
  "Наливаем кофе ☕",
  "Ищем потерянные деньги...",
  "Проверяем баланс...",
  "Собираем статистику...",
];

export default function LoaderText({ color }: { color: string }) {
  const [text, setText] = useState(LOADING_TEXTS[0]);
  const opacity = useSharedValue(1);

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(
      () => {
        opacity.value = withTiming(0, { duration: 200 });

        setTimeout(() => {
          let nextIndex;
          do {
            nextIndex = Math.floor(Math.random() * LOADING_TEXTS.length);
          } while (nextIndex === currentIndex);

          currentIndex = nextIndex;
          setText(LOADING_TEXTS[nextIndex]);

          opacity.value = withTiming(1, { duration: 200 });
        }, 200);
      },
      1200 + Math.random() * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Text style={{ color }} className="text-sm font-medium">
        {text}
      </Text>
    </Animated.View>
  );
}
