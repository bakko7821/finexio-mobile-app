import PickColorComponent from "@/components/Categories/PickColorComponent";
import ThemeOption from "@/components/ThemeOptions";
import SettingsHeader from "@/components/UI/headers/SettingsHeader";
import EmptyModal from "@/components/UI/modals/EmptyBottomModal";
import Plug from "@/components/UI/Plug";
import { useTheme } from "@/hooks/useTheme";
import { useSettings } from "@/store/useSettings";
import { THEME_OPTIONS } from "@/utils/constants/themeOptions";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function PersonalizeScreen() {
  const theme = useTheme();
  const { theme: currentTheme, setTheme, setPrimaryColor } = useSettings();
  const [isOpenPickColorModal, setIsOpenPickColorModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState(theme.primary);

  useEffect(() => {
    setPrimaryColor(selectedColor);
  }, [selectedColor]);

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="flex-1 flex-col gap-2"
    >
      <SettingsHeader title="Персонализация" />

      <View className="w-full flex-1 flex-col gap-3">
        <View className="w-full gap-2">
          <Text
            style={{ color: theme.secondary }}
            className="text-xl font-medium px-4"
          >
            Изменение темы
          </Text>
          <Plug />
          <View className="w-full gap-1">
            {THEME_OPTIONS.map((item) => (
              <ThemeOption
                key={item.value}
                label={item.label}
                isActive={currentTheme === item.value}
                onPress={() => setTheme(item.value)}
              />
            ))}
          </View>
        </View>
        <View className="w-full gap-2">
          <Text
            style={{ color: theme.secondary }}
            className="text-xl font-medium px-4"
          >
            Цвета приложения
          </Text>
          <Plug />
          <View className="w-full gap-1">
            <TouchableOpacity
              onPress={() => setIsOpenPickColorModal(true)}
              className="w-full p-4 flex-row items-center justify-between"
            >
              <Text
                className="text-base font-medium"
                style={{
                  color: theme.text,
                }}
              >
                Основной цвет:
              </Text>
              <View
                style={{ backgroundColor: selectedColor }}
                className="w-6 h-6 rounded-full"
              ></View>
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-full gap-2">
          <Text
            style={{ color: theme.secondary }}
            className="text-xl font-medium px-4"
          >
            Кастомные темы
          </Text>
          <Plug />
          <View className="w-full gap-1"></View>
        </View>
      </View>
      <EmptyModal
        visible={isOpenPickColorModal}
        onClose={() => setIsOpenPickColorModal(false)}
        title="Выберите основной цвет"
      >
        <PickColorComponent
          selectedColor={selectedColor}
          onSelect={setSelectedColor}
        />
      </EmptyModal>
    </View>
  );
}
