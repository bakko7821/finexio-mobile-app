import CrossIcon from "@/assets/ui/cross-svgrepo-com.svg";
import { createTransaction } from "@/db/transactions";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/color";
import { dateToIso, isoToDateSafe, nowDay } from "@/utils/date";
import { Category, SmallCategory } from "@/utils/types/categories";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import CategoryComponent from "../category/CategoryComponent";
import NumberInput from "../UI/NumberInput";
import InputModal from "./InputModal";

interface MenuComponentProps {
  visible: boolean;
  onClose: () => void;
  category: Category | undefined;
  type: number;
  onTransactionAdded?: () => void;
}

export default function CategoryModal({
  visible,
  onClose,
  category,
  type,
  onTransactionAdded,
}: MenuComponentProps) {
  const theme = useTheme();
  const [transactionValue, setTransactionValue] = useState("0");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(nowDay);
  const [gasValue, setGasValue] = useState("0");
  const [isOpenInput, setIsOpenInput] = useState(false);
  const [isOpenDateModal, setIsOpenDateModal] = useState(false);
  const [selectedSmallCategory, setSelectedSmallCategory] =
    useState<SmallCategory | null>(null);

  const postTransaction = async () => {
    if (!category) return;

    console.log(selectedSmallCategory);

    try {
      await createTransaction({
        categoryId: category.id,
        smallCategoryId: selectedSmallCategory?.id, // 💥 ВОТ ОНО
        type,
        count: Number(transactionValue),
        note,
        date: date || new Date().toISOString(),
        gasValue: category.isGas ? Number(gasValue) : undefined,
      });

      setTransactionValue("0");
      setNote("");
      setSelectedSmallCategory(null);
      onClose();
      onTransactionAdded?.();
    } catch (e) {
      console.error("Ошибка создания транзакции", e);
    }
  };

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
      <View
        style={{ backgroundColor: theme.header }}
        className="rounded-t-3xl p-3"
      >
        {/* HEADER */}
        <View className="w-full flex-row items-center justify-between mb-2">
          <Text style={{ color: theme.text }} className="text-base font-medium">
            Новая транзакция ({type === 1 ? "Расходы" : "Доходы"})
          </Text>

          <TouchableOpacity onPress={onClose}>
            <CrossIcon width={24} height={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* CONTENT */}
        <View className="flex-col gap-3">
          {category && <CategoryComponent category={category} fullsize />}
          {category?.smallCategories?.length ? (
            <View className="flex-col items-start justify-start w-full gap-2">
              <Text
                style={{ color: theme.secondary }}
                className="text-sm font-medium"
              >
                Подкатегории:
              </Text>

              <View className="flex-wrap w-full flex-row gap-2">
                {category.smallCategories.map((smallCategory) => (
                  <TouchableOpacity
                    key={smallCategory.id}
                    style={{
                      borderColor: category.color,
                      backgroundColor:
                        selectedSmallCategory === smallCategory
                          ? category.color
                          : "transparent",
                    }}
                    className="px-3 py-1 rounded-lg border-[2px] border-solid"
                    onPress={() => setSelectedSmallCategory(smallCategory)}
                  >
                    <Text
                      style={{
                        color:
                          selectedSmallCategory === smallCategory
                            ? getContrastColor(category.color)
                            : getContrastColor(theme.header),
                      }}
                      className="text-sm font-medium"
                    >
                      {smallCategory.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : null}

          <View className="flex-row justify-between">
            <Text
              style={{ color: theme.secondary }}
              className="text-sm font-medium"
            >
              Тип транзакции:
            </Text>
            <Text
              style={{ color: type === 1 ? theme.red : theme.green }}
              className="text-sm font-medium"
            >
              {type === 1 ? "Расходы" : "Доходы"}
            </Text>
          </View>

          {category?.isGas && (
            <>
              <View className="flex-row justify-between">
                <Text
                  style={{ color: theme.secondary }}
                  className="text-sm font-medium"
                >
                  Тип топлива:
                </Text>
                <Text
                  style={{ color: theme.text }}
                  className="text-sm font-medium"
                >
                  {category.gasSettings?.gasType
                    ? category.gasSettings?.gasType
                    : "Не указан"}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text
                  style={{ color: theme.secondary }}
                  className="text-sm font-medium"
                >
                  Количество:
                </Text>
                <TouchableOpacity onPress={() => setIsOpenInput(true)}>
                  <Text
                    style={{ color: theme.text }}
                    className="text-sm font-medium"
                  >
                    {`${gasValue} литров`}
                  </Text>
                </TouchableOpacity>
              </View>
              <InputModal
                visible={isOpenInput}
                title="Укажите количество топлива"
                onClose={() => setIsOpenInput(false)}
                value={gasValue}
                onChange={setGasValue}
              />
            </>
          )}

          <View
            style={{ backgroundColor: theme.card }}
            className="w-full p-3 rounded-xl items-center"
          >
            <Text
              style={{ color: type === 1 ? theme.red : theme.green }}
              className="text-3xl font-medium"
            >
              {transactionValue} ₽
            </Text>
          </View>

          <NumberInput
            value={transactionValue}
            setValue={setTransactionValue}
            openCalendar={() => setIsOpenDateModal(true)}
            onRequest={postTransaction}
          />
        </View>
      </View>
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
