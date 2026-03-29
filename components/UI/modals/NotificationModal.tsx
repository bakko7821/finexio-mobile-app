import { notificationConfig } from "@/utils/configs/notification";
import { NotificationKey } from "@/utils/types/notifications";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

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
}: NotificationModalProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentConfig = notificationConfig[notificationKey];
  const Icon = currentConfig.icon;

  useEffect(() => {
    if (!visible) {
      opacity.setValue(0);
      return;
    }

    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    timeoutRef.current = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          onClose();
        }
      });
    }, 3200);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [visible, onClose, opacity]);

  if (!visible) return null;

  return (
    <View
      pointerEvents="none"
      className="absolute top-14 left-0 right-0 items-center"
      style={{
        zIndex: 9999,
        elevation: 9999,
      }}
    >
      <Animated.View
        className="flex-row items-center w-[80%] gap-2 p-4 rounded-full"
        style={{
          opacity,
          backgroundColor: currentConfig.mainColor,
        }}
      >
        <Icon width={24} height={24} color={currentConfig.titleColor} />

        <Text
          className="text-base font-medium flex-shrink"
          style={{
            color: currentConfig.titleColor,
          }}
        >
          {title}
        </Text>
      </Animated.View>
    </View>
  );
}
