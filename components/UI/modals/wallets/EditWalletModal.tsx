import CrossIcon from "@/assets/ui/CrossFilled.svg";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/colors";
import { Wallet } from "@/utils/types/wallet";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

interface EditWalletModalProps {
  visible: boolean;
  wallet: Wallet | null;
  onRefresh?: () => void;
  onClose: () => void;
}

export default function EditWalletModal({
  visible,
  onClose,
  wallet,
  onRefresh,
}: EditWalletModalProps) {
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
          <View className="p-4 w-full items-center justify-between flex-row">
            <Text
              style={{ color: theme.text }}
              className="text-base font-medium"
            >
              Изменение счёта:{" "}
              <Text style={{ color: wallet.color }}>{wallet.name}</Text>
            </Text>
            <TouchableOpacity onPress={onClose}>
              <CrossIcon width={24} height={24} color={theme.text} />
            </TouchableOpacity>
          </View>
          <View></View>
          <View className="p-4 w-full items-center justify-center">
            <TouchableOpacity
              style={{ backgroundColor: theme.primary }}
              className="p-3 rounded-full w-full items-center justify-center"
            >
              <Text
                style={{ color: getContrastColor(theme.primary) }}
                className="text-base font-medium"
              >
                Сохранить
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
}
