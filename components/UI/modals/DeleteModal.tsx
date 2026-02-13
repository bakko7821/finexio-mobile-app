import CrossIcon from "@/assets/ui/CrossFilled.svg";
import { useTheme } from "@/hooks/useTheme";
import { Category } from "@/utils/categories";
import { Transaction } from "@/utils/transactions";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

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
          <Text>Удаление {category ? "категории" : "транзакции"}</Text>
          <TouchableOpacity onPress={onClose}>
            <CrossIcon width={24} height={24} color={theme.text} />
          </TouchableOpacity>
        </View>
        {category && (
          <>
            <Text>
              Удаление категории{" "}
              <Text
                style={{ color: category.color }}
              >{`"${category.name}"`}</Text>{" "}
              так же удалит <Text>({transactionsFromCategory?.length})</Text>{" "}
              транзакций связанных с этой категорией.
            </Text>
            <Text>
              Если вам нужно временно скрыть категорию, возспользуйтесь кнопкой Архивировать.
              Если вы все же хотите удалить категорию, нажмите Удалить.
            </Text>
          </>
        )}
      </View>
    </Modal>
  );
}
