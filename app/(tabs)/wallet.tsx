import PlusIcon from "@/assets/ui/Plus.svg";
import Header from "@/components/UI/headers/Header";
import CreateNewWalletModal from "@/components/UI/modals/wallet/CreateNewWalletModal";
import InfoWalletModal from "@/components/UI/modals/wallet/InfoWalletModal";
import { RenderIcon } from "@/components/UI/RenderIcon";
import { getAllWallets } from "@/database/queries/wallets";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor, withOpacity } from "@/utils/colors";
import { Wallet } from "@/utils/types/wallet";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function WalletScreen() {
  const theme = useTheme();

  const [isOpenNewWalletModal, setIsOpenNewWalletModal] = useState(false);
  const [isOpenInfoWalletModal, setIsOpenInfoWalletModal] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loadingWallets, setLoadingWallets] = useState(true);

  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);

  useFocusEffect(
    useCallback(() => {
      setRefreshFlag((prev) => prev + 1);
    }, []),
  );

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const data = await getAllWallets();

        console.log(data);
        setWallets(data);
      } catch (error: unknown) {
        console.error(error);
      }
    };

    fetchWallets();

    fetchWallets().finally(() => setLoadingWallets(false));
  }, [refreshFlag]);

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="flex-1 flex-col gap-2 items-start justify-start relative"
    >
      <Header title={"Кошелёк"} />
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
        {loadingWallets && (
          <Text
            style={{ color: theme.secondary }}
            className="text-sm font-medium px-4"
          >
            Кошельки загружаются...
          </Text>
        )}

        {!loadingWallets && wallets.length === 0 && (
          <Text
            style={{ color: theme.secondary }}
            className="text-sm font-medium px-4"
          >
            У вас отсутствуют счета.
          </Text>
        )}

        {!loadingWallets && wallets.length > 0 && (
          <View className="w-full flex-col">
            {wallets.map((wallet) => (
              <TouchableOpacity
                onPress={() => (
                  setSelectedWallet(wallet),
                  setIsOpenInfoWalletModal(true)
                )}
                key={wallet.id}
                style={{ backgroundColor: withOpacity(wallet.color, 0.6) }}
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
        )}
      </ScrollView>
      <CreateNewWalletModal
        visible={isOpenNewWalletModal}
        onClose={() => setIsOpenNewWalletModal(false)}
        onRefresh={() => setRefreshFlag((prev) => prev + 1)}
      />
      <InfoWalletModal
        wallet={selectedWallet}
        visible={isOpenInfoWalletModal}
        onClose={() => setIsOpenInfoWalletModal(false)}
        onRefresh={() => setRefreshFlag((prev) => prev + 1)}
      />
    </View>
  );
}
