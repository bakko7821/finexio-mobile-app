import CrossIcon from "@/assets/ui/CrossFilled.svg";
import { useTheme } from "@/hooks/useTheme";
import { Category } from "@/utils/types/categories";
import { getContrastColor, withOpacity } from "@/utils/colors";
import { Transaction } from "@/utils/types/transactions";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { RenderIcon } from "../../RenderIcon";

interface DeleteModalProps {
  category?: Category;
  transactionsFromCategory?: Transaction[];
  transaction?: Transaction;
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function DeleteModal({
  visible,
  onClose,
  onSubmit,
  category,
  transaction,
  transactionsFromCategory,
}: DeleteModalProps) {
  const theme = useTheme();

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
        style={{ backgroundColor: theme.header }}
        className="rounded-3xl p-4 gap-3 flex-col w-[85%]"
      >
        <View className="w-full flex-row items-center justify-between">
          <View className="flex-row gap-2 items-center justify-center">
            {category && (
              <RenderIcon
                width={24}
                height={24}
                color={theme.text}
                name={category.icon}
              />
            )}
            <Text style={{ color: theme.text }} className="text-xl font-medium">
              Удаление {category ? `${category.name}` : "транзакции"}
            </Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <CrossIcon width={24} height={24} color={theme.text} />
          </TouchableOpacity>
        </View>
        {category && (
          <>
            <Text
              style={{ color: theme.text }}
              className="text-base font-regular"
            >
              Все транзакции (
              <Text style={{ color: theme.text }} className="font-medium">
                {transactionsFromCategory?.length || 0}
              </Text>
              ) связанные с этой категорией будут удалены.
            </Text>

            <Text
              style={{ color: theme.text }}
              className="text-base font-regular"
            >
              Категорию нельзя будет восстановить. Если вы хотите скрыть
              категорию выберите{" "}
              <Text style={{ color: theme.text }} className="font-medium">
                Архивировать
              </Text>
            </Text>
          </>
        )}
        {transaction && (
          <>
            <Text
              style={{ color: theme.text }}
              className="text-base font-regular"
            >
              Транзакция будет удалена. Действие невозможно будет отменить.
            </Text>
          </>
        )}
        <View className="w-full flex-row gap-2 item-center justify-end">
          <TouchableOpacity
            className="rounded-xl px-3 py-2 items-center justify-center"
            onPress={onClose}
          >
            <Text
              style={{ color: theme.primary }}
              className="text-base font-medium"
            >
              Отменить
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: withOpacity(theme.primary, 0.4) }}
            className="rounded-xl px-3 py-2 items-center justify-center"
            onPress={onSubmit}
          >
            <Text
              style={{
                color: getContrastColor(theme.primary),
              }}
              className="text-base font-medium"
            >
              Удалить
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
