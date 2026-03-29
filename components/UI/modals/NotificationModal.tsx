import { notificationConfig } from "@/utils/configs/notification";
import { NotificationKey } from "@/utils/types/notifications";
import { useEffect, useRef } from "react";
import { Text, View } from "react-native";
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentConfig = notificationConfig[notificationKey];
  const Icon = currentConfig.icon;

  useEffect(() => {
    if (visible) {
      timeoutRef.current = setTimeout(() => {
        onClose();
      }, 2500);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [onClose, visible]);

  return (
    <Modal
      isVisible={visible}
      /** АНИМАЦИИ */
      animationIn="fadeIn"
      animationOut="fadeOut"
      /** TIMING */
      animationInTiming={1500}
      animationOutTiming={1500}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      /** ФОН */
      backdropOpacity={0}
      /** ЗАКРЫТИЕ */
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      /** PERF */
      useNativeDriver
      hideModalContentWhileAnimating
      style={{
        margin: 0,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 16,
      }}
    >
      <View
        style={{ backgroundColor: currentConfig.mainColor }}
        className="flex-row items-center w-[80%] gap-2 p-4 rounded-full"
      >
        <Icon width={24} height={24} color={currentConfig.titleColor} />

        <Text
          style={{ color: currentConfig.titleColor }}
          className="text-base font-medium"
        >
          {title}
        </Text>
      </View>
    </Modal>
  );
}
