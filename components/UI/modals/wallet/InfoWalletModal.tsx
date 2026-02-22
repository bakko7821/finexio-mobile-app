import CrossIcon from "@/assets/ui/CrossFilled.svg";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor, withOpacity } from "@/utils/colors";
import { Wallet } from "@/utils/types/wallet";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { RenderIcon } from "../../RenderIcon";

interface InfoWalletModalProps {
  visible: boolean;
  wallet: Wallet | null;
  onRefresh?: () => void;
  onClose: () => void;
}

export default function InfoWalletModal({
  visible,
  onClose,
  wallet,
  onRefresh,
}: InfoWalletModalProps) {
  const theme = useTheme();

  if (wallet)
    return (
      <Modal
        isVisible={visible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionOutTiming={300}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        useNativeDriver
        style={{ margin: 0, justifyContent: "flex-end" }}
      >
        <View
          style={{ backgroundColor: theme.header }}
          className="overflow-hidden rounded-t-3xl flex-col"
        >
          <View
            style={{ backgroundColor: withOpacity(wallet.color, 0.6) }}
            className="p-4 flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-2">
              <RenderIcon
                name={wallet.icon}
                width={32}
                height={32}
                color={getContrastColor(wallet.color)}
              />
              <Text
                style={{ color: getContrastColor(wallet.color) }}
                className="text-xl font-medium"
              >
                {wallet.name}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <CrossIcon
                width={24}
                height={24}
                color={getContrastColor(wallet.color)}
              />
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: theme.card }} className="p-4"></View>
        </View>
      </Modal>
    );
}
