import EditIcon from "@/assets/ui/Edit.svg";
import ReceiptIcon from "@/assets/ui/receipt-item-svgrepo-com.svg";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor, withOpacity } from "@/utils/color";
import { Category } from "@/utils/types/categories";
import { useRouter } from "expo-router";
import React from "react";
import {
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Modal from "react-native-modal";
import { RenderIcon } from "../UI/RenderIcon";

interface CategoryModalSmallProps {
  visible: boolean;
  onClose: () => void;
  category: Category | undefined;
  type: number;
}

export default function CategoryModalSmall({
  visible,
  onClose,
  category,
  type,
}: CategoryModalSmallProps) {
  const theme = useTheme();
  const router = useRouter();

  if (!category) return;

  return (
    <Modal
      isVisible={visible}
      /** АНИМАЦИИ */
      animationIn="slideInUp"
      animationOut="slideOutDown"
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
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View className="rounded-t-3xl flex-1 w-full bottom-0 absolute flex-col items-start justify-start">
        <View
          style={{ backgroundColor: category?.color, minHeight: 120 }}
          className="w-full p-3 relative gap-2"
        >
          <View
            className="border-[2px] border-solid rounded-full items-center justify-center p-3 absolute top-[-24px] right-[12px]"
            style={{
              backgroundColor: theme.header,
              borderColor: category.color,
            }}
          >
            <RenderIcon
              name={category.icon}
              width={36}
              height={36}
              color={getContrastColor(theme.header)}
            />
          </View>
          <Text
            style={{ color: getContrastColor(category.color) }}
            className="text-xl font-medium"
          >
            {category?.name}
          </Text>
        </View>
        <View
          style={{ backgroundColor: theme.header }}
          className="p-3 w-full flex-row items-center justify-around"
        >
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/edit-category",
                params: {
                  category: JSON.stringify(category),
                },
              })
            }
            className="flex-col items-center justify-center gap-1"
          >
            <View
              style={{ backgroundColor: theme.secondary }}
              className="items-center justify-center p-3 rounded-full"
            >
              <EditIcon width={36} height={36} color={theme.text} />
            </View>
            <Text
              style={{ color: theme.secondary }}
              className="text-sm font-regular"
            >
              Изменить
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-col items-center justify-center gap-1"
            onPress={() =>
              router.push({
                pathname: "/transactions",
                params: {
                  filter: JSON.stringify(category),
                },
              })
            }
          >
            <View
              style={{
                backgroundColor: withOpacity(category?.color, 0.4),
              }}
              className="items-center justify-center p-3 rounded-full"
            >
              <ReceiptIcon
                width={36}
                height={36}
                color={getContrastColor(withOpacity(category?.color, 0.4))}
              />
            </View>
            <Text
              style={{
                color: category.color,
              }}
              className="text-sm font-regular"
            >
              Операции
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
