import BackIcon from "@/assets/ui/arrow-prev-small-svgrepo-com.svg";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface SettingsHeaderProps {
  title: string;
}

export default function SettingsHeader({ title }: SettingsHeaderProps) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <View
      className="w-full p-4 pt-[50px] flex-row gap-3 items-center justify-start"
      style={{ backgroundColor: theme.header }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <BackIcon width={24} height={24} color={theme.text} />
      </TouchableOpacity>
      <Text className="text-base font-medium" style={{ color: theme.text }}>
        {title}
      </Text>
      <View className="w-6 h-6" />
    </View>
  );
}
