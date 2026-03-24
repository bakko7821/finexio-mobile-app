import CrossIcon from "@/assets/ui/CrossFilled.svg";
import { useTheme } from "@/hooks/useTheme";
import { Wallet } from "@/utils/types/wallet";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { getContrastColor, withOpacity } from "@/utils/colors";
import Modal from "react-native-modal";
import { RenderIcon } from "../../RenderIcon";

interface SelectWalletModalProps {
  title: string;
  visible: boolean;
  wallets: Wallet[] | null;
  onClose: () => void;
  handleDone?: () => void;
  selectedWallet: Wallet | null;
  onSelect: (wallet: Wallet) => void;
}

export default function SelectWalletModal({
  visible,
  title,
  onClose,
  wallets,
  handleDone,
  selectedWallet,
  onSelect,
}: SelectWalletModalProps) {
  const theme = useTheme();

  const handleSelectWallet = (wallet: Wallet) => {
    onSelect(wallet);
    onClose();
  };

  if (wallets)
    return (
      <Modal
        isVisible={visible}
        /** АНИМАЦИИ */
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        /** TIMING */
        animationInTiming={300}
        animationOutTiming={250}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={200}
        /** ФОН */
        backdropOpacity={0.5}
        /** ЗАКРЫТИЕ */
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        /** КРИТИЧНО */
        useNativeDriver
        hideModalContentWhileAnimating
        style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
      >
        <View
          style={{ backgroundColor: theme.card }}
          className="rounded-3xl max-w-[90%] w-[90%] p-3 flex-col items-start justify-start gap-2"
        >
          <View className="w-full flex-row items-center justify-between">
            <Text style={{ color: theme.text }} className="text-sm font-medium">
              {title}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <CrossIcon width={24} height={24} color={theme.text} />
            </TouchableOpacity>
          </View>
          <View className="w-full">
            {wallets.length > 0 ? (
              <View className="flex-col gap-1 w-full">
                {wallets.map((wallet) => (
                  <TouchableOpacity
                    onPress={() => handleSelectWallet(wallet)}
                    key={wallet.id}
                    style={{ backgroundColor: wallet.color }}
                    className="p-2 w-full flex-row gap-2 rounded-xl"
                  >
                    <RenderIcon
                      name={wallet.icon}
                      width={40}
                      height={40}
                      color={getContrastColor(wallet.color)}
                    />
                    <View className="flex-col">
                      <Text
                        style={{
                          color: getContrastColor(wallet.color),
                        }}
                        className="text-base font-medium"
                      >
                        {wallet.name}
                      </Text>
                      <Text
                        style={{
                          color: withOpacity(
                            getContrastColor(wallet.color),
                            0.6,
                          ),
                        }}
                        className="text-sm font-normal"
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
                У вас отсутствуют транзакции.
              </Text>
            )}
          </View>
        </View>
      </Modal>
    );
}
