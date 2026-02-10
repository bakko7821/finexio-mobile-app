import { useTheme } from "@/hooks/useTheme";
import { iconsArray } from "@/utils/icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface PickIconComponentProps {
  selectedIcon: string;
  onSelect: (icon: string) => void;
}

export default function PickIconComponent({
  selectedIcon,
  onSelect,
}: PickIconComponentProps) {
  const theme = useTheme();
  return (
    <ScrollView
      className="flex-1 pr-2"
      contentContainerStyle={{
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 8,
      }}
    >
      {iconsArray.map((iconList) => (
        <View key={iconList.id} className="flex-1 flex-col gap-2 pb-[16px]">
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
          <View className="flex flex-row items-center justify-start flex-wrap gap-2">
            {iconList.items.map((item) => {
              const Icon = item.Icon;
              const isSelected = selectedIcon === item.name;

              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => onSelect(item.name)}
                  className="p-2 rounded-xl"
                  style={{ backgroundColor: theme.card }}
                >
                  {isSelected && (
                    <View
                      style={{
                        position: "absolute",
                        top: 0, // отступ от краёв
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 10,
                        borderWidth: 3,
                        borderColor: theme.primary,
                      }}
                    />
                  )}
                  <Icon width={32} height={32} color={theme.text} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
