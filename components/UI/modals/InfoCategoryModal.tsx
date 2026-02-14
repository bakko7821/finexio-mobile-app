import ArchiveIcon from "@/assets/ui/Archivebox.svg";
import EditIcon from "@/assets/ui/Edit.svg";
import TrashIcon from "@/assets/ui/Trash.svg";
import {
  deleteCategory,
  getAllTransactionsByCategory,
  getTransactionsByCategoryAndDateAsync,
  updateCategory,
} from "@/database";
import { useTheme } from "@/hooks/useTheme";
import { Category, UpdateCategoryDto } from "@/utils/categories";
import { getSum } from "@/utils/chart";
import { getContrastColor, withOpacity } from "@/utils/colors";
import { getCurrentMonthAndYear } from "@/utils/date";
import { Transaction } from "@/utils/transactions";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { RenderIcon } from "../RenderIcon";
import ArchiveModal from "./ArchiveModal";
import CreateCategoryModal from "./CreateCategory";
import DeleteModal from "./DeleteModal";

interface InfoCategoryModalProps {
  onRefresh?: () => void;
  category: Category | null;
  visible: boolean;
  onClose: () => void;
}

export default function InfoCategoryModal({
  onRefresh,
  category,
  visible,
  onClose,
}: InfoCategoryModalProps) {
  const theme = useTheme();
  const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [allTransactionsByCategory, setAllTransactionsByCategory] = useState<
    Transaction[]
  >([]);

  const handleDeleteModal = async () => {
    if (!category) return;

    await deleteCategory(category?.id);
    console.log("категория удаления");
    setIsVisibleDeleteModal(false);
    onClose();
    onRefresh?.();
  };

  const [isEditCategory, setIsEditCategory] = useState(false);
  const [isOpenArchiveModal, setIsOpenArchiveModal] = useState(false);

  const handleArhiveCategory = async () => {
    if (!category) return;

    try {
      const dto: UpdateCategoryDto = {
        isArchive: true,
      };

      await updateCategory(category.id, dto);
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
      if (!category) return;
      const fetchTransactionsByCategoryIdAndDate = async () => {
        const { month, year } = getCurrentMonthAndYear();
        const data = await getTransactionsByCategoryAndDateAsync({
          categoryId: category.id,
          month,
          year,
        });
        setTransactions(data);
      };

      const fetchAllTransactionsByCategory = async () => {
        const data = await getAllTransactionsByCategory({
          categoryId: category.id,
        });
        setAllTransactionsByCategory(data);
      };

      fetchTransactionsByCategoryIdAndDate();
      fetchAllTransactionsByCategory();
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
          <TouchableOpacity
            className="gap-2 flex-col items-center justify-center"
            onPress={() => setIsEditCategory(true)}
          >
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
          <TouchableOpacity
            className="gap-2 flex-col items-center justify-center"
            onPress={() => setIsOpenArchiveModal(true)}
          >
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
        transactionsFromCategory={allTransactionsByCategory}
      />
      <CreateCategoryModal
        onRefresh={onRefresh}
        category={category}
        visible={isEditCategory}
        onClose={() => setIsEditCategory(false)}
        title={""}
        handleCloseSmallModal={onClose}
      />
      <ArchiveModal
        visible={isOpenArchiveModal}
        category={category}
        onClose={() => setIsOpenArchiveModal(false)}
        onSubmit={handleArhiveCategory}
      />
    </Modal>
  );
}
