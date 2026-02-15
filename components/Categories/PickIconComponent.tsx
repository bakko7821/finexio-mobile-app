import { useTheme } from "@/hooks/useTheme";
import { iconsArray } from "@/utils/icons";
import React, { useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface PickIconComponentProps {
  selectedIcon: string;
  onSelect: (icon: string) => void;
}

export default function PickIconComponent({
  selectedIcon,
  onSelect,
}: PickIconComponentProps) {
  const theme = useTheme();

  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <FlatList
      data={iconsArray}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingRight: 8 }}
      initialNumToRender={2} // 🔥 сколько секций рендерить сразу
      windowSize={5}
      removeClippedSubviews
      renderItem={({ item: iconList, index }) => (
        <Animated.View
          entering={FadeInDown.duration(200).delay(Math.min(index * 30, 150))}
          className="flex-1 flex-col gap-2 pb-[16px]"
        >
          {/* Заголовок */}
          <View className="flex flex-row items-center gap-2">
            <Text
              style={{ color: theme.secondary }}
              className="text-xl font-medium"
            >
              {iconList.title}
            </Text>
            <View
              style={{ backgroundColor: theme.secondary }}
              className="flex-1 h-[2px]"
            />
          </View>

          {/* Иконки */}
          <View className="flex flex-row flex-wrap gap-2">
            {iconList.items.map((item) => {
              const Icon = item.Icon;
              const isSelected = selectedIcon === item.name;

              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => onSelect(item.name)}
                  className="w-13 h-13 p-2 rounded-xl items-center justify-center"
                  style={{ backgroundColor: theme.card }}
                >
                  {isSelected && (
                    <View
                      style={{
                        borderColor: theme.primary,
                      }}
                      className="rounded-xl border-[2px] border-soli absolute inset-0"
                    />
                  )}
                  {visible ? (
                    <Icon width={32} height={32} color={theme.text} />
                  ) : (
                    <View className="w-8 h-8 rounded-md bg-gray-300 dark:bg-gray-700" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>
      )}
    />
  );
}
