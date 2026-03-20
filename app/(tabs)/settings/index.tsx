import Header from "@/components/UI/headers/Header";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/colors";
import { SETTINGS_TAB_ROUTES, SETTINGS_TABS } from "@/utils/tabs";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="flex-1 flex-col gap-2 items-start justify-start relative"
    >
      <Header title={"Настройки"} />
      <View className="flex-1 w-full gap-2">
        {SETTINGS_TABS.map((box) => (
          <View key={box.id} className="rounded-3xl flex-col gap-2">
            <View className="w-full flex-row items-center justify-between gap-3">
              <View
                style={{ backgroundColor: theme.secondary }}
                className="flex-1 h-[2px]"
              />
              <Text
                style={{ color: theme.secondary }}
                className="text-base font-medium"
              >
                {box.title}
              </Text>
              <View
                style={{ backgroundColor: theme.secondary }}
                className="flex-1 h-[2px]"
              />
            </View>
            <View className="flex-col gap-2">
              {box.tabs.map((tab) => {
                const routePath = SETTINGS_TAB_ROUTES[tab.name];
                const Icon = tab.icon.image;

                return (
                  <TouchableOpacity
                    style={{ backgroundColor: theme.card }}
                    className=" w-full flex-row items-center justify-start gap-2 p-2 px-4"
                    key={tab.label}
                    onPress={() => router.replace(routePath)}
                  >
                    <View
                      style={{ backgroundColor: tab.icon.color }}
                      className="rounded-full p-2"
                    >
                      <Icon
                        width={16}
                        height={16}
                        color={getContrastColor(tab.icon.color)}
                      />
                    </View>
                    <Text
                      style={{ color: theme.text }}
                      className="text-xl font-medium"
                    >
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
