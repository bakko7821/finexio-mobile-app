import CrossIcon from "@/assets/ui/CrossFilled.svg";
import { useTheme } from "@/hooks/useTheme";
import { notificationConfig } from "@/utils/configs/notification";
import { NotificationKey } from "@/utils/types/notifications";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

interface NotificationModalProps {
  visible: boolean;
  title: string;
  notificationKey: NotificationKey;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function NotificationModal({
  visible,
  title,
  notificationKey,
  onClose,
  children,
}: NotificationModalProps) {
  const theme = useTheme();
  const SCREEN_HEIGHT = Dimensions.get("window").height;

  const currentConfig = notificationConfig[notificationKey];
  const Icon = currentConfig.icon;

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={0}
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View
        style={{
          minHeight: SCREEN_HEIGHT * 0.25,
          backgroundColor: theme.header,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: 20,
          gap: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              flex: 1,
              paddingRight: 12,
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: currentConfig.mainColor + "20",
              }}
            >
              <Icon width={22} height={22} />
            </View>

            <Text
              style={{
                color: theme.text,
                fontSize: 18,
                fontWeight: "600",
                flexShrink: 1,
              }}
            >
              {title}
            </Text>
          </View>

          <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
            <CrossIcon width={22} height={22} />
          </TouchableOpacity>
        </View>

        <View>{children}</View>
      </View>
    </Modal>
  );
}
