import { useTheme } from "@/hooks/useTheme";
import { Platform, Text, TouchableOpacity, View } from "react-native";

import CrossIcon from "@/assets/ui/CrossFilled.svg";
import CategoryComponent from "@/components/Categories/CategoryComponent";
import { createTransaction } from "@/database/queries/transactions";
import { Category, SubCategory } from "@/utils/categories";
import { getContrastColor } from "@/utils/colors";
import { dateToIso, isoToDateSafe, nowDay } from "@/utils/date";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import Modal from "react-native-modal";
import NumberInput from "../NumberInput";

interface CreateTransactionModalProps {
  category: Category | null;
  visible: boolean;
  onClose: () => void;
  onRefresh?: () => void;
}

export default function CreateTransactionsModal({
  category,
  visible,
  onClose,
  onRefresh,
}: CreateTransactionModalProps) {
  const theme = useTheme();

  const [countValue, setCoutValue] = useState("0");
  const [gasValue, setGasValue] = useState(0);
  const [isOpenDateModal, setIsOpenDateModal] = useState(false);
  const [date, setDate] = useState(nowDay);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);

  useEffect(() => {
    if (!category?.gasPrice) {
      setGasValue(0);
      return;
    }

    const numericCount = Number(countValue);
    if (isNaN(numericCount)) {
      setGasValue(0);
      return;
    }

    setGasValue(Number((numericCount / category.gasPrice).toFixed(2)));
  }, [countValue, category?.gasPrice]);

  if (category === null) return;

  const handleClose = () => {
    setDate(nowDay);
    setCoutValue("0");
    setGasValue(0);
    onClose();
  };

  const handleCreateTransaction = async () => {
    await createTransaction({
      date: date,
      count: Number(countValue),
      categoryId: category.id,

      subCategoryId: selectedSubCategory?.id,
      note: undefined,
      gasValue: gasValue ? Number(gasValue) : undefined,
    });

    onRefresh?.();
    handleClose();
  };

  return (
    <Modal
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionOutTiming={300}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      useNativeDriver
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View
        style={{ backgroundColor: theme.header }}
        className="rounded-t-3xl gap-3 flex-col p-4"
      >
        <View className="w-full flex-row items-center justify-between">
          <Text style={{ color: theme.text }} className="text-base font-medium">
            Новая транзакция ({category.type === 1 ? "Расходы" : "Доходы"})
          </Text>
          <TouchableOpacity onPress={handleClose}>
            <CrossIcon width={24} height={24} color={theme.text} />
          </TouchableOpacity>
        </View>
        <View className="w-full flex-col gap-3">
          <CategoryComponent category={category} />
          {category.subcategories && category.subcategories.length > 0 && (
            <View className="w-full flex-row flex-wrap gap-2 items-center justify-start">
              {category.subcategories.map((subcategory) => {
                const isSelected = selectedSubCategory?.id === subcategory.id;

                return (
                  <TouchableOpacity
                    key={subcategory.id}
                    onPress={() => setSelectedSubCategory(subcategory)}
                    style={{
                      borderColor: category.color,
                      backgroundColor: isSelected
                        ? category.color
                        : "transparent",
                    }}
                    className="px-3 py-1 items-center justify-center rounded-lg border-[2px] border-solid"
                  >
                    <Text
                      className="text-sm font-medium"
                      style={{ color: isSelected ? "#fff" : theme.text }}
                    >
                      {subcategory.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          <View className="flex-col gap-1 items-start justify-start">
            <Text
              style={{ color: theme.secondary }}
              className="text-sm font-medium"
            >
              Значение:
            </Text>
            <View
              style={{ backgroundColor: theme.card }}
              className="rounded-xl items-center justify-center w-full p-3"
            >
              <Text
                style={{ color: theme.text }}
                className="text-2xl font-bold"
              >
                {countValue} <Text className="text-base font-medium">₽</Text>
              </Text>
            </View>
          </View>
          <View className="flex-col gap-1 items-start justify-start">
            <Text
              style={{ color: theme.secondary }}
              className="text-sm font-medium"
            >
              Калькулятор:
            </Text>

            <NumberInput
              openCalendar={() => setIsOpenDateModal(true)}
              value={countValue}
              setValue={setCoutValue}
            />
          </View>
          {category?.isGas ? (
            <View className="flex-col gap-1 items-start justify-start">
              <View className="w-full flex-row items-center justify-between">
                <Text
                  style={{ color: theme.secondary }}
                  className="text-sm font-medium"
                >
                  Топливо:
                </Text>
                <Text
                  style={{ color: theme.secondary }}
                  className="text-xs font-medium"
                >
                  Вы можете изменить значение.
                </Text>
              </View>
              <View className="w-full flex-row items-center justify-between">
                <Text
                  style={{ color: category.color }}
                  className="text-xl font-medium"
                >
                  {category.gasType} (
                  <Text
                    style={{ color: theme.secondary }}
                    className="text-base"
                  >
                    {category.gasPrice} ₽ / литр
                  </Text>
                  )
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{ color: theme.text }}
                    className="text-base font-medium"
                  >
                    {gasValue} лит.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
        <TouchableOpacity
          style={{ backgroundColor: theme.primary }}
          className="mt-4 flex-row w-full item-center justify-center p-3 rounded-full"
          onPress={handleCreateTransaction}
        >
          <Text
            style={{ color: getContrastColor(theme.primary) }}
            className="text-base font-medium"
          >
            Создать
          </Text>
        </TouchableOpacity>
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
