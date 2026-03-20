import { useTheme } from "@/hooks/useTheme";
import { Text, View } from "react-native";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const theme = useTheme();
  return (
    <View
      style={{ backgroundColor: theme.header }}
      className="flex-col items-start justify-start gap-1 pt-[50px] p-4 w-full"
    >
      <View className="w-full flex-row items-center justify-between">
        <Text style={{ color: theme.text }} className="text-lg font-medium">
          {title}
        </Text>
      </View>
    </View>
  );
}
