import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function SettingsScreen() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="flex-1 flex-col gap-2 items-start justify-start relative"
    >
      <View
        style={{ backgroundColor: theme.header }}
        className="flex-col items-start justify-start gap-1 pt-[50px] p-4 w-full"
      >
        <View className="w-full flex-row items-center justify-between">
          <Text style={{ color: theme.text }} className="text-lg font-medium">
            Настройки
          </Text>
        </View>
      </View>
      <View className="w-full flex-col gap-2 flex-1 px-4 items-start justify-start">
        <Pressable
          className="bg-red-300 w-full p-2"
          onPress={() => router.push("/(tabs)/settings/profile")}
        >
          <Text>Profile</Text>
        </Pressable>

        <Pressable
          className="bg-red-300 w-full p-2"
          onPress={() => router.push("/(tabs)/settings/notifications")}
        >
          <Text>Notifications</Text>
        </Pressable>
      </View>
    </View>
  );
}
