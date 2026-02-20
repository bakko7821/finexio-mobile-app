import PlusIcon from "@/assets/ui/Plus.svg";
import CreateNewWalletModal from "@/components/UI/modals/wallet/CreateNewWalletModal";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function WalletScreen() {
  const theme = useTheme();

  const [isOpenNewWalletModal, setIsOpenNewWalletModal] = useState(false)
  const [refreshFlag, setRefreshFlag] = useState(0);

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="flex-1 flex-col gap-2 items-start justify-start relative"
    >
      <View style={{ backgroundColor: theme.header }} className="flex-col items-start justify-start gap-1 pt-[50px] p-4 w-full">
        <View className="w-full flex-row items-center justify-between">
          <Text style={{ color: theme.text }} className="text-lg font-medium">
            Кошелёк
          </Text>
        </View>
      </View>
      <View className="w-full flex-row items-center justify-between px-4">
        <View className="flex-col">
          <Text
            style={{ color: theme.text }}
            className="text-lg font-medium"
          >
            Мои счета
          </Text>
          <Text
            style={{ color: theme.secondary }}
            className="text-sm font-medium"
          >
            Нажимите на плюс, чтобы добавить новый
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setIsOpenNewWalletModal(true)}
        >
          <PlusIcon width={32} height={32} color={theme.secondary} />
        </TouchableOpacity>
      </View>
      <View className="w-full flex-1 p-4 gap-2">

      </View>
      <CreateNewWalletModal
        visible={isOpenNewWalletModal}
        onClose={() => setIsOpenNewWalletModal(false)}
        onRefresh={() => setRefreshFlag((prev) => prev + 1)}
      />
    </View>
  );
}
