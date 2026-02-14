import {
    deleteCategory,
    getAllTransactionsByCategory,
    getTransactionsByCategoryAndDateAsync,
    updateCategory,
} from "@/database";
import { useTheme } from "@/hooks/useTheme";
import { UpdateCategoryDto } from "@/utils/categories";
import { getCurrentMonthAndYear } from "@/utils/date";
import { Transaction } from "@/utils/transactions";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Modal from "react-native-modal";
import DeleteModal from "../categories/DeleteModal";

interface InfoTransactionModalProps {
  onRefresh?: () => void;
  transaction: Transaction | null;
  visible: boolean;
  onClose: () => void;
}

export default function InfoTransactionModal({
  onRefresh,
  transaction,
  visible,
  onClose,
}: InfoTransactionModalProps) {
  const theme = useTheme();
  const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [allTransactionsByCategory, setAllTransactionsByCategory] = useState<
    Transaction[]
  >([]);

  const handleDeleteModal = async () => {
    if (!transaction) return;

    await deleteCategory(transaction?.id);
    console.log("категория удаления");
    setIsVisibleDeleteModal(false);
    onClose();
    onRefresh?.();
  };

  const [isEditCategory, setIsEditCategory] = useState(false);
  const [isOpenArchiveModal, setIsOpenArchiveModal] = useState(false);

  const handleArhiveCategory = async () => {
    if (!transaction) return;

    try {
      const dto: UpdateCategoryDto = {
        isArchive: true,
      };

      await updateCategory(transaction.id, dto);
      console.log("категория архивированна");
      setIsOpenArchiveModal(false);
      onClose();
      onRefresh?.();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      if (!transaction) return;

      const fetchTransactionsByCategoryIdAndDate = async () => {
        const { month, year } = getCurrentMonthAndYear();
        const data = await getTransactionsByCategoryAndDateAsync({
          categoryId: transaction.id,
          month,
          year,
        });
        setTransactions(data);
      };

      const fetchAllTransactionsByCategory = async () => {
        const data = await getAllTransactionsByCategory({
          categoryId: transaction.id,
        });
        setAllTransactionsByCategory(data);
      };

      fetchTransactionsByCategoryIdAndDate();
      fetchAllTransactionsByCategory();
    } catch (error: unknown) {
      console.error(error);
    }
  }, [transaction]);

  if (!transaction) return;

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
        className="overflow-hidden rounded-t-3xl flex-col min-h-[40%]"
      >
        <View>
          <Text>Транзакция за {transaction.date}</Text>
        </View>
      </View>
      <DeleteModal
        visible={isVisibleDeleteModal}
        onClose={() => setIsVisibleDeleteModal(false)}
        onSubmit={handleDeleteModal}
        transaction={transaction}
        transactionsFromCategory={allTransactionsByCategory}
      />
    </Modal>
  );
}
