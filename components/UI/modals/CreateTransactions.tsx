import { useTheme } from "@/hooks/useTheme";
import { Text, TouchableOpacity, View } from "react-native";

import CrossIcon from "@/assets/ui/CrossFilled.svg";
import { Category } from "@/utils/categories";
import { getContrastColor } from "@/utils/colors";
import { useEffect, useState } from "react";
import Modal from "react-native-modal";
import NumberInput from "../NumberInput";

interface CreateTransactionModalProps {
  category: Category | null;
  visible: boolean;
  onClose: () => void;
}

export default function CreateTransactionsModal({
  category,
  visible,
  onClose,
}: CreateTransactionModalProps) {
  const theme = useTheme();

  const [countValue, setCoutValue] = useState("0");
  const [gasValue, setGasValue] = useState(0);

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
        className="rounded-t-3xl gap-3 flex-col p-4"
      >
        <View className="w-full flex-row items-center justify-between">
          <Text style={{ color: theme.text }} className="text-base font-medium">
            Новая транзакция ({category.type === 1 ? "Расходы" : "Доходы"})
          </Text>
          <TouchableOpacity onPress={onClose}>
            <CrossIcon width={24} height={24} color={theme.text} />
          </TouchableOpacity>
        </View>
        <View className="w-full flex-col gap-3">
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

            <NumberInput value={countValue} setValue={setCoutValue} />
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
        >
          <Text
            style={{ color: getContrastColor(theme.primary) }}
            className="text-base font-medium"
          >
            Создать
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
