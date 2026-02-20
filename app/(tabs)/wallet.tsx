import PlusIcon from "@/assets/ui/Plus.svg";
import CreateNewWalletModal from "@/components/UI/modals/wallet/CreateNewWalletModal";
import { RenderIcon } from "@/components/UI/RenderIcon";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor, withOpacity } from "@/utils/colors";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const walletsArray = [
  { id: 0, name: "Наличные", color: "#ff0000", icon: "money", value: 0 },
  { id: 1, name: "Карта", color: "#f1f199", icon: "card", value: 0 },
];

export default function WalletScreen() {
  const theme = useTheme();

  const [isOpenNewWalletModal, setIsOpenNewWalletModal] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(0);

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
            Кошелёк
          </Text>
        </View>
      </View>
      <View className="w-full flex-row items-center justify-between px-4">
        <View className="flex-col">
          <Text style={{ color: theme.text }} className="text-lg font-medium">
            Мои счета
          </Text>
          <Text
            style={{ color: theme.secondary }}
            className="text-sm font-medium"
          >
            Нажимите на плюс, чтобы добавить новый
          </Text>
        </View>
        <TouchableOpacity onPress={() => setIsOpenNewWalletModal(true)}>
          <PlusIcon width={32} height={32} color={theme.secondary} />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className=" w-full flex-col gap-2"
      >
        {walletsArray.length > 0 ? (
          <View className="w-full flex-col">
            {walletsArray.map((wallet) => (
              <TouchableOpacity
                key={wallet.id}
                style={{ backgroundColor: withOpacity(wallet.color, 0.4) }}
                className="w-full p-4 flex-row items-center justify-start gap-2"
              >
                <RenderIcon
                  width={40}
                  height={40}
                  name={wallet.icon}
                  color={getContrastColor(wallet.color)}
                />
                <View className="flex-col items-start justify-start">
                  <Text
                    style={{ color: getContrastColor(wallet.color) }}
                    className="text-base font-medium"
                  >
                    {wallet.name}
                  </Text>
                  <Text
                    style={{ color: getContrastColor(wallet.color) }}
                    className="text-sm font-regular"
                  >
                    {wallet.value} ₽
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text
            style={{ color: theme.secondary }}
            className="text-sm font-medium px-4"
          >
            У вас отсутствуют счета.
          </Text>
        )}
      </ScrollView>
      <CreateNewWalletModal
        visible={isOpenNewWalletModal}
        onClose={() => setIsOpenNewWalletModal(false)}
        onRefresh={() => setRefreshFlag((prev) => prev + 1)}
      />
    </View>
  );
}
