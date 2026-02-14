import AllCategoriesIcon from "@/assets/ui/Category.svg";
import SettingsIcon from "@/assets/ui/Settings.svg";
import Plug from "@/components/UI/Plug";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/colors";
import { Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const theme = useTheme();
  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="pt-[50px] flex-1 flex-col gap-2 items-start justify-start relative"
    >
      <View className="flex-col w-full gap-2">
        <Text
          style={{ color: theme.text }}
          className="px-4 text-lg font-medium"
        >
          Настройки
        </Text>
        <Plug />
        <View className="flex-col w-full gap-3 px-4">
          <View
            style={{ backgroundColor: theme.card }}
            className="w-full p-2 rounded-3xl overflow-hidden flex-col gap-2"
          >
            <TouchableOpacity className="flex-row w-full gap-2 items-center justify-start">
              <View
                style={{ backgroundColor: "#ff0000" }}
                className="p-2 items-center justify-center rounded-full"
              >
                <AllCategoriesIcon
                  width={24}
                  height={24}
                  color={getContrastColor("#FF0000")}
                />
              </View>
              <View className="flex-col">
                <Text
                  style={{ color: theme.text }}
                  className="text-base font-medium"
                >
                  Список категорий
                </Text>
                <Text
                  style={{ color: theme.secondary }}
                  className="text-sm font-light"
                >
                  Посмотрите все категории.
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row w-full gap-2 items-center justify-start">
              <View
                style={{ backgroundColor: "#33940F" }}
                className="p-2 items-center justify-center rounded-full"
              >
                <SettingsIcon
                  width={24}
                  height={24}
                  color={getContrastColor("#33940F")}
                />
              </View>
              <View className="flex-col">
                <Text
                  style={{ color: theme.text }}
                  className="text-base font-medium"
                >
                  Настройки приложения
                </Text>
                <Text
                  style={{ color: theme.secondary }}
                  className="text-sm font-light"
                >
                  Настройте приложение под себя.
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
