import { useTheme } from "@/hooks/useTheme";
import { Category } from "@/utils/types/categories";
import { getContrastColor } from "@/utils/colors";
import { Transaction } from "@/utils/types/transactions";
import { useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { RenderIcon } from "../UI/RenderIcon";
import InfoTransactionModal from "../UI/modals/transactions/InfoTransactionModal";

interface TransactionComponentProps {
  setFilter?: (category: Category) => void;
  transaction: Transaction;
  isArchive?: boolean;
  onRefresh?: () => void;
  index: number;
}
export default function TransactionComponent({
  transaction,
  isArchive = false,
  onRefresh,
  index,
  setFilter,
}: TransactionComponentProps) {
  const [isOpenTransactionInfoModal, setIsOpenTransactionInfoModal] =
    useState(false);

  const theme = useTheme();

  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 200,
      delay: index * 50, // 🔥 stagger
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      className="relative overflow-hidden rounded-xl"
      style={{
        opacity: anim,
        transform: [
          {
            translateY: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [10, 0],
            }),
          },
          {
            scale: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.95, 1],
            }),
          },
        ],
      }}
    >
      <TouchableOpacity
        style={{ opacity: isArchive ? 0.5 : 1 }}
        className="w-full p-2 flex-row items-center justify-between"
        onPress={() => setIsOpenTransactionInfoModal(true)}
      >
        <View className="flex-row items-start gap-2">
          <View
            style={{ backgroundColor: transaction.category.color }}
            className="p-2 items-center justify-center rounded-full"
          >
            <RenderIcon
              name={transaction.category.icon}
              width={24}
              height={24}
              color={getContrastColor(transaction.category.color)}
            />
          </View>

          <View>
            <Text
              style={{
                color: theme.text,
                textDecorationLine: isArchive ? "line-through" : "none",
              }}
              className="text-base font-medium"
            >
              {transaction.category.name}{" "}
              {transaction.subCategory?.name !== null
                ? `(${transaction.subCategory?.name})`
                : ""}
            </Text>
            {}
            <Text
              style={{
                color: theme.secondary,
              }}
              className="text-sm"
            >
              {isArchive ? (
                "Категория архивированна"
              ) : transaction.category.isGas ? (
                <Text style={{ color: transaction.category.color }}>
                  {transaction.category.gasType}
                  {""}
                  <Text style={{ color: theme.secondary }}>
                    ( {`${transaction.gasValue} литров`} )
                  </Text>
                </Text>
              ) : (
                transaction.note
              )}
            </Text>
          </View>
        </View>

        <Text
          className="text-base font-medium"
          style={{
            color: transaction.category.type === 1 ? theme.red : theme.green,
            textDecorationLine: isArchive ? "line-through" : "none",
          }}
        >
          {transaction.category.type === 1 ? "-" : "+"}
          {transaction.count} ₽
        </Text>
      </TouchableOpacity>
      <InfoTransactionModal
        setFilter={setFilter}
        visible={isOpenTransactionInfoModal}
        onClose={() => setIsOpenTransactionInfoModal(false)}
        transaction={transaction}
        onRefresh={onRefresh}
      />
    </Animated.View>
  );
}
