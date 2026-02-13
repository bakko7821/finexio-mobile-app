import ArchiveIcon from "@/assets/ui/Archivebox.svg";
import EditIcon from "@/assets/ui/Edit.svg";
import TrashIcon from "@/assets/ui/Trash.svg";
import { getTransactionsByCategoryAndDateAsync } from "@/database";
import { useTheme } from "@/hooks/useTheme";
import { Category } from "@/utils/categories";
import { getSum } from "@/utils/chart";
import { getContrastColor, withOpacity } from "@/utils/colors";
import { getCurrentMonthAndYear } from "@/utils/date";
import { Transaction } from "@/utils/transactions";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { RenderIcon } from "../RenderIcon";
import DeleteModal from "./DeleteModal";

interface InfoCategoryModalProps {
  category: Category | null;
  visible: boolean;
  onClose: () => void;
}

export default function InfoCategoryModal({
  category,
  visible,
  onClose,
}: InfoCategoryModalProps) {
  const theme = useTheme();
  const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleDeleteModal = () => {
    alert(123);
  };

  useEffect(() => {
    try {
      if (!category) return;
      const fetchTransactionsByCategoryId = async () => {
        const { month, year } = getCurrentMonthAndYear();
        const data = await getTransactionsByCategoryAndDateAsync({
          categoryId: category.id,
          month,
          year,
        });
        setTransactions(data);
      };

      fetchTransactionsByCategoryId();
    } catch (error: unknown) {
      console.error(error);
    }
  }, [category]);

  if (!category) return;

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
          style={{ backgroundColor: category?.color }}
          className="p-4 flex-col gap-2"
        >
          <View className="flex-row items-center justify-center gap-2">
            <View
              style={{ backgroundColor: theme.background }}
              className="p-3 rounded-full items-center justify-center"
            >
              <RenderIcon
                name={category.icon}
                width={32}
                height={32}
                color={theme.text}
              />
            </View>
            <View className="flex-col flex-1 items-start justify-start">
              <Text
                style={{ color: getContrastColor(category.color) }}
                className="text-2xl font-medium"
              >
                {category.name}
              </Text>
              <View className="flex-row w-full items-center justify-between">
                <Text
                  className="text-base font-medium"
                  style={{
                    color: getContrastColor(category.color),
                  }}
                >
                  {transactions.length > 0
                    ? `${transactions.length} транзакций`
                    : "Операций нет"}
                </Text>
                <Text
                  className="text-base font-medium"
                  style={{ color: getContrastColor(category.color) }}
                >
                  {getSum(transactions)} ₽
                </Text>
              </View>
            </View>
          </View>
          <View></View>
        </View>
        <View className="p-4 flex-row items-center justify-around">
          <TouchableOpacity className="gap-2 flex-col items-center justify-center">
            <View
              style={{ backgroundColor: withOpacity(theme.secondary, 0.4) }}
              className="p-3 rounded-full items-center justify-center"
            >
              <EditIcon width={32} height={32} color={theme.text} />
            </View>
            <Text style={{ color: theme.text }} className="text-sm font-medium">
              Изменить
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="gap-2 flex-col items-center justify-center">
            <View
              style={{ backgroundColor: withOpacity("#ffe11e", 0.4) }}
              className="p-3 rounded-full items-center justify-center"
            >
              <ArchiveIcon width={32} height={32} color={theme.text} />
            </View>

            <Text style={{ color: theme.text }} className="text-sm font-medium">
              Архивировать
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsVisibleDeleteModal(true)}
            className="gap-2 flex-col items-center justify-center"
          >
            <View
              style={{ backgroundColor: withOpacity(theme.red, 0.4) }}
              className="p-3 rounded-full items-center justify-center"
            >
              <TrashIcon width={32} height={32} color={theme.text} />
            </View>

            <Text style={{ color: theme.text }} className="text-sm font-medium">
              Удалить
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <DeleteModal
        visible={isVisibleDeleteModal}
        onClose={() => setIsVisibleDeleteModal(false)}
        onSubmit={handleDeleteModal}
        category={category}
        transactionsFromCategory={transactions}
      />
    </Modal>
  );
}
