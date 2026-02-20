import { useTheme } from "@/hooks/useTheme";
import { Text, View } from "react-native";

export default function WalletScreen() {
  const theme = useTheme();
  return (
    <View
          style={{ backgroundColor: theme.background }}
          className="flex-1 flex-col gap-2 items-start justify-start relative"
        >
          <View style={{backgroundColor: theme.header}} className="flex-col items-start justify-start gap-1 pt-[50px] p-4 w-full">
            <View className="w-full flex-row items-center justify-between">
              <Text style={{ color: theme.text }} className="text-lg font-medium">
                Кошелёк
              </Text>
            </View>
          </View>
    </View>
  );
}
