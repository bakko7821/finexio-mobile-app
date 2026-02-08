import ArrowIcon from "@/assets/ui/arrow-prev-small-svgrepo-com.svg";
import TrashIcon from "@/assets/ui/TrashAltSolid.svg";
import CategoryComponent from "@/components/category/CategoryComponent";
import NavHeader from "@/components/Headers/NavHeader";
import DeleteModal from "@/components/Modals/DeleteModal";
import NumberInput from "@/components/UI/NumberInput";
import { deleteTransaction } from "@/db/transactions";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/color";
import {
  dateToIso,
  formatDateToDayMonth,
  isoToDateSafe,
  nowDay,
} from "@/utils/date";
import { Transaction } from "@/utils/types/transactions";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function EditCategoriesScreen() {
  const theme = useTheme();

  const { transaction } = useLocalSearchParams<{ transaction?: string }>();

  const parsedTransaction: Transaction | null = transaction
    ? JSON.parse(transaction)
    : null;

  const [isOpenValueModal, setIsOpenValueModal] = useState(false);
  const [isOpenDateModal, setIsOpenDateModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [transactionValue, setTransactionValue] = useState(
    parsedTransaction?.count.toString() ?? "0",
  );

  const [transactionDate, setTransactionDate] = useState(
    parsedTransaction?.date ?? nowDay,
  );
  const [transactionNote, setTransactionNote] = useState(
    parsedTransaction?.note ?? "",
  );

  const [isOpenGasInfo, setIsOpenGasInfo] = useState(true);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isOpenGasInfo ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOpenGasInfo]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-90deg", "90deg"],
  });

  if (!parsedTransaction) return null;

  //   const handleDoneEditFunction = async () => {
  //     await updateCategory(parsedTransaction.id, {
  //       name: categoryNameValue,
  //       icon: selectedIconName,
  //       color: selectedColor,
  //     });
  //     router.push("/category");
  //   };

  const handleDeleteTransaction = async (id: number) => {
    if (!id) return;

    try {
      await deleteTransaction(id);

      router.push("/transactions");
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="w-full h-full items-center justify-start"
    >
      <NavHeader
        title="Изменение транзакции"
        isSave
        // handleDone={handleDoneEditFunction}
      />
      <View
        style={{ backgroundColor: parsedTransaction.category.color }}
        className="w-full px-2"
      >
        <CategoryComponent category={parsedTransaction.category} fullsize />
      </View>
      <View className="flex-col gap-2 w-full flex-1">
        <View className="px-3 py-2 flex-col gap-1 w-full items-start justify-start">
          <Text
            style={{ color: theme.secondary }}
            className="text-sm font-medium"
          >
            Заметка:
          </Text>
          <TextInput
            style={{
              color: theme.text,
              borderColor: theme.secondary,
            }}
            placeholderTextColor={theme.secondary}
            className="w-full border border-solid rounded-lg px-2"
            value={transactionNote}
            placeholder="Перевод от мамы"
            onChange={(e) => setTransactionNote(e.nativeEvent.text)}
          />
        </View>
        <View className="px-3 py-2 flex-row gap-1 w-full items-start justify-between">
          <Text
            style={{ color: theme.secondary }}
            className="text-sm font-medium"
          >
            Значение:
          </Text>
          <TouchableOpacity onPress={() => setIsOpenValueModal(true)}>
            <Text
              style={{
                color: parsedTransaction.type === 1 ? theme.red : theme.green,
              }}
              className="text-base font-medium"
            >
              {`${parsedTransaction.type === 1 ? "-" : "+"}${transactionValue} ₽`}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="px-3 py-2 flex-row gap-1 w-full items-start justify-between">
          <Text
            style={{ color: theme.secondary }}
            className="text-sm font-medium"
          >
            Дата:
          </Text>
          <TouchableOpacity>
            <Text
              style={{ color: theme.text }}
              className="text-base font-medium"
              onPress={() => setIsOpenDateModal(true)}
            >
              {formatDateToDayMonth(transactionDate)}
            </Text>
          </TouchableOpacity>
        </View>
        {parsedTransaction.category.isGas && (
          <View
            style={{ backgroundColor: theme.card }}
            className="px-3 py-2 flex-col gap-2 items-start w-full"
          >
            <View className="w-full flex-row items-center justify-between">
              <Text
                style={{ color: theme.text }}
                className="text-base font-semibold"
              >
                Топливо
              </Text>
              <TouchableOpacity
                onPress={() => setIsOpenGasInfo((prev) => !prev)}
              >
                <Animated.View
                  style={{
                    transform: [{ rotate }],
                  }}
                >
                  <ArrowIcon width={24} height={24} color={theme.text} />
                </Animated.View>
              </TouchableOpacity>
            </View>
            {isOpenGasInfo && (
              <View className="flex-col gap-1 w-full">
                <View className="flex-row gap-1 w-full items-start justify-between">
                  <Text
                    style={{ color: theme.secondary }}
                    className="text-sm font-medium"
                  >
                    Тип топлива:
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={{ color: theme.text }}
                      className="text-base font-medium"
                      onPress={() => setIsOpenDateModal(true)}
                    >
                      {parsedTransaction.category.gasSettings?.gasType}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="flex-row gap-1 w-full items-start justify-between">
                  <Text
                    style={{ color: theme.secondary }}
                    className="text-sm font-medium"
                  >
                    Количество:
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={{ color: theme.text }}
                      className="text-base font-medium"
                      onPress={() => setIsOpenDateModal(true)}
                    >
                      {`${parsedTransaction.gasValue} литров`}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
        <View className="w-full px-3 py-2 items-center justify-center">
          <TouchableOpacity
            style={{ backgroundColor: theme.red }}
            className="flex-row p-2 mt-[8px] rounded-xl gap-1 w-full items-center justify-center"
            onPress={() => setIsOpenDeleteModal(true)}
          >
            <TrashIcon
              width={24}
              height={24}
              color={getContrastColor(theme.red)}
            />
            <Text
              style={{ color: getContrastColor(theme.red) }}
              className="text-base font-medium"
            >
              Удалить транзакцию
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {isOpenDeleteModal && (
        <DeleteModal
          isTransaction
          visible={isOpenDeleteModal}
          onClose={() => setIsOpenDeleteModal(false)}
          handleDone={() => handleDeleteTransaction(parsedTransaction.id)}
        />
      )}
      {isOpenValueModal && (
        <Modal
          visible={isOpenValueModal}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setIsOpenValueModal(false)}
        >
          <TouchableWithoutFeedback onPress={() => setIsOpenValueModal(false)}>
            <View className="flex-1 items-center justify-center bg-black/50 relative">
              <TouchableWithoutFeedback>
                <View
                  style={{ backgroundColor: theme.card }}
                  className="rounded-t-3xl flex-1 p-2 gap-2 w-full bottom-0 absolute flex-col items-start justify-start"
                >
                  <Text
                    style={{
                      color:
                        parsedTransaction.type === 1 ? theme.red : theme.green,
                      backgroundColor: theme.header,
                    }}
                    className="w-full text-center items-center justify-center text-3xl font-medium p-2 px-3 rounded-xl"
                  >
                    {`${parsedTransaction.type === 1 ? "-" : "+"}${transactionValue} ₽`}
                  </Text>
                  <View className="w-full items-center justify-center">
                    <NumberInput
                      value={`${transactionValue}`}
                      setValue={setTransactionValue}
                      onRequest={() => setIsOpenValueModal(false)}
                      nullDate
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      {Platform.OS === "android" && isOpenDateModal && (
        <DateTimePicker
          value={isoToDateSafe(transactionDate)}
          mode="date"
          display="default"
          themeVariant={theme.isDark ? "dark" : "light"}
          onChange={(event, selectedDate) => {
            setIsOpenDateModal(false);
            if (!selectedDate) return;
            setTransactionDate(dateToIso(selectedDate));
          }}
        />
      )}
    </View>
  );
}
