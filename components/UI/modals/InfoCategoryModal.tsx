import { getTransactions } from "@/database/queries/transactions";
import { useTheme } from "@/hooks/useTheme";
import { Category } from "@/utils/categories";
import { getContrastColor } from "@/utils/colors";
import { getCurrentMonthAndYear } from "@/utils/date";
import { Transaction } from "@/utils/transactions";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Modal from "react-native-modal";
import { RenderIcon } from "../RenderIcon";

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

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    try {
      if (!category) return;
      const { month, year } = getCurrentMonthAndYear();

      const fetchTransactionsByCategoryId = async () => {
        const data = await getTransactions({
          categoryId: category.id,
          month: month,
          year: year,
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
          className="p-4 flex-row items-start justify-start gap-2"
        >
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
          <View className="flex-col items-start justify-start">
            <Text
              style={{ color: getContrastColor(category.color) }}
              className="text-2xl font-medium"
            >
              {category.name}
            </Text>
            <Text>{transactions.length}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
