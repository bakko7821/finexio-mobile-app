import CalendarIcon from "@/assets/ui/Calendar4Week.svg";
import CopyIcon from "@/assets/ui/Copy.svg";
import CrossIcon from "@/assets/ui/CrossFilled.svg";
import SearchIcon from "@/assets/ui/Search.svg";
import DeleteIcon from "@/assets/ui/Trash.svg";
import { deleteTransaction, updateTransaction } from "@/database";
import { useTheme } from "@/hooks/useTheme";
import { Category } from "@/utils/types/categories";
import { getContrastColor, withOpacity } from "@/utils/colors";
import { dateToIso, formatDateRu, isoToDateSafe } from "@/utils/date";
import { Transaction, UpdateTransactionDto } from "@/utils/types/transactions";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import NumberInput from "../../NumberInput";
import { RenderIcon } from "../../RenderIcon";
import DeleteModal from "../categories/DeleteModal";

interface InfoTransactionModalProps {
  setFilter?: (category: Category) => void;
  onRefresh?: () => void;
  transaction: Transaction | null;
  visible: boolean;
  onClose: () => void;
}

export default function InfoTransactionModal({
  setFilter,
  onRefresh,
  transaction,
  visible,
  onClose,
}: InfoTransactionModalProps) {
  const theme = useTheme();
  const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);
  const [transactionValue, setTransactionsValue] = useState(
    `${transaction?.count}` || "0",
  );
  const [transactionNote, setTransactionNote] = useState(
    transaction?.note || "",
  );
  const [isEdit, setIsEdit] = useState(false);
  const [date, setDate] = useState(transaction?.date);
  const [transactionGasValue, setTransactionGasValue] = useState(
    transaction?.gasValue || 0,
  );
  const [isOpenDateModal, setIsOpenDateModal] = useState(false);

  useEffect(() => {
    handleUpdateTransaction();
  }, [date]);

  const handleDelete = async () => {
    if (!transaction) return;

    await deleteTransaction(transaction?.id);

    setIsVisibleDeleteModal(false);
    onClose();
    onRefresh?.();
  };

  const handleUpdateTransaction = async () => {
    if (!transaction) return;

    const dto: UpdateTransactionDto = {
      note: transactionNote ?? "",
      date: date ?? "",
      count: Number(transactionValue),
      gasValue: transactionGasValue ?? null,
    };

    await updateTransaction(transaction.id, dto);
    onClose();
    onRefresh?.();
  };

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
        className="overflow-hidden rounded-t-3xl flex-col"
      >
        <View
          className="p-4 flex-row items-center justify-between"
          style={{ backgroundColor: transaction.category.color }}
        >
          <View className="items-center justify-center flex-row gap-2">
            <RenderIcon
              name={transaction.category.icon}
              width={24}
              height={24}
              color={getContrastColor(transaction.category.color)}
            />
            <Text
              style={{ color: getContrastColor(transaction.category.color) }}
              className="text-base font-medium"
            >
              {transaction.category.name}
            </Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <CrossIcon
              width={24}
              height={24}
              color={getContrastColor(transaction.category.color)}
            />
          </TouchableOpacity>
        </View>
        <View className="flex-col gap-3 p-4">
          <TouchableOpacity
            onPress={() => setIsEdit(true)}
            className="flex-col items-center justify-center"
          >
            <Text
              style={{
                color:
                  transaction.category.type === 1 ? theme.red : theme.green,
              }}
              className="text-sm font-medium"
            >
              {transaction.category.type === 1 ? "Расходы" : "Доходы"}
            </Text>
            <Text
              style={{
                color:
                  transaction.category.type === 1 ? theme.red : theme.green,
              }}
              className="text-2xl font-bold"
            >
              {transactionValue} ₽
            </Text>
          </TouchableOpacity>
          <TextInput
            value={transactionNote}
            onChangeText={(text: string) => setTransactionNote(text)}
            onFocus={() => setIsEdit(false)}
            onPress={() => setIsEdit(false)}
            placeholderTextColor={theme.secondary}
            style={{
              color: theme.text,
              backgroundColor: theme.card,
              padding: 12,
            }}
            className="text-base font-regular rounded-xl w-full items-center justify-center text-center"
            placeholder="Заметка..."
          />
          {transactionNote.length > 0 && !isEdit && (
            <TouchableOpacity
              style={{ backgroundColor: transaction.category.color }}
              className="w-full p-3 items-center justify-center rounded-full"
              onPress={handleUpdateTransaction}
            >
              <Text
                style={{
                  color: getContrastColor(transaction.category.color),
                }}
                className="text-base font-medium"
              >
                Сохранить изменения
              </Text>
            </TouchableOpacity>
          )}
          {isEdit && (
            <View>
              <NumberInput
                value={transactionValue}
                setValue={setTransactionsValue}
              />
              <TouchableOpacity
                style={{ backgroundColor: transaction.category.color }}
                className="w-full p-3 items-center justify-center rounded-full"
                onPress={handleUpdateTransaction}
              >
                <Text
                  style={{
                    color: getContrastColor(transaction.category.color),
                  }}
                  className="text-base font-medium"
                >
                  Сохранить изменения
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <Text
            style={{ color: isEdit ? transaction.category.color : theme.text }}
            className="text-base font-medium w-full items-center justify-center text-center"
          >
            {formatDateRu(date ?? "")}
          </Text>
        </View>
        {!isEdit && (
          <View
            style={{ backgroundColor: theme.card }}
            className="w-full p-4 flex-row items-center justify-evenly"
          >
            <TouchableOpacity
              className="gap-2 flex-col items-center justify-center"
              onPress={() => setIsVisibleDeleteModal(true)}
            >
              <View
                style={{ backgroundColor: withOpacity(theme.red, 0.4) }}
                className="p-3 rounded-full items-center justify-center"
              >
                <DeleteIcon
                  width={24}
                  height={24}
                  color={getContrastColor(withOpacity(theme.red, 0.4))}
                />
              </View>
              <Text
                style={{ color: theme.text }}
                className="text-sm font-medium"
              >
                Удалить
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="gap-2 flex-col items-center justify-center"
              onPress={() => setFilter?.(transaction.category)}
            >
              <View
                style={{
                  backgroundColor: withOpacity(transaction.category.color, 0.4),
                }}
                className="p-3 rounded-full items-center justify-center"
              >
                <SearchIcon
                  width={24}
                  height={24}
                  color={getContrastColor(
                    withOpacity(transaction.category.color, 0.4),
                  )}
                />
              </View>
              <Text
                style={{ color: theme.text }}
                className="text-sm font-medium"
              >
                Транзакции
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="gap-2 flex-col items-center justify-center"
              onPress={() => setIsOpenDateModal(true)}
            >
              <View
                style={{ backgroundColor: withOpacity(theme.secondary, 0.4) }}
                className="p-3 rounded-full items-center justify-center"
              >
                <CalendarIcon width={24} height={24} color={theme.text} />
              </View>
              <Text
                style={{ color: theme.text }}
                className="text-sm font-medium"
              >
                Дата
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="gap-2 flex-col items-center justify-center"
              onPress={() => alert("IN DEV")}
            >
              <View
                style={{ backgroundColor: withOpacity(theme.secondary, 0.4) }}
                className="p-3 rounded-full items-center justify-center"
              >
                <CopyIcon width={24} height={24} color={theme.text} />
              </View>
              <Text
                style={{ color: theme.text }}
                className="text-sm font-medium"
              >
                Дублировать
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <DeleteModal
        visible={isVisibleDeleteModal}
        onClose={() => setIsVisibleDeleteModal(false)}
        onSubmit={handleDelete}
        transaction={transaction}
      />
      {Platform.OS === "android" && isOpenDateModal && (
        <DateTimePicker
          value={isoToDateSafe(date)}
          mode="date"
          display="default"
          themeVariant={theme.isDark ? "dark" : "light"}
          onChange={(event, selectedDate) => {
            setIsOpenDateModal(false);
            if (!selectedDate) return;
            setDate(dateToIso(selectedDate));
          }}
        />
      )}
    </Modal>
  );
}
