import CrossIcon from "@/assets/ui/CrossFilled.svg";
import EditIcon from "@/assets/ui/Edit.svg";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor, withOpacity } from "@/utils/colors";
import { SetNotificationModal } from "@/utils/types/notifications";
import { Wallet } from "@/utils/types/wallet";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { RenderIcon } from "../../RenderIcon";
import EditWalletModal from "./EditWalletModal";

interface InfoWalletModalProps {
  visible: boolean;
  wallet: Wallet | null;
  onRefresh?: () => void;
  onClose: () => void;
  onSubmit?: SetNotificationModal;
}

export default function InfoWalletModal({
  visible,
  onClose,
  wallet,
  onRefresh,
  onSubmit,
}: InfoWalletModalProps) {
  const theme = useTheme();
  const [isVisibleEditModal, setIsVisibleEditModal] = useState(false);

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
          <View
            className="p-4 items-center justify-around flex-row"
            style={{ backgroundColor: theme.header }}
          >
            <TouchableOpacity
              className="flex-col gap-1 items-center justify-center"
              onPress={() => setIsVisibleEditModal(true)}
            >
              <View
                className="rounded-full p-3"
                style={{ backgroundColor: theme.secondary }}
              >
                <EditIcon
                  width={24}
                  height={24}
                  color={getContrastColor(theme.secondary)}
                />
              </View>
              <Text
                className="text-sm font-medium"
                style={{ color: theme.secondary }}
              >
                Изменить
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <EditWalletModal
          visible={isVisibleEditModal}
          wallet={wallet}
          onClose={() => setIsVisibleEditModal(false)}
          onCloseSmallModal={() => onClose()}
          onRefresh={onRefresh}
          onSubmit={onSubmit}
        />
      </Modal>
    );
}
