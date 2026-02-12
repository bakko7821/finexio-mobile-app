import IconCalendar from "@/assets/ui/Calendar4Week.svg";
import IconClear from "@/assets/ui/ClearCharacterOutline.svg";
import IconCross from "@/assets/ui/CrossFilled.svg";
import IconDevide from "@/assets/ui/MathDivide.svg";
import { useTheme } from "@/hooks/useTheme";
import { withOpacity } from "@/utils/colors";
import { Dispatch, SetStateAction } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { JSX } from "react/jsx-runtime";

interface NumberInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  nullDate?: boolean;
  openCalendar?: () => void;
}

export default function NumberInput({
  value,
  setValue,
  openCalendar,
  nullDate = false,
}: NumberInputProps) {
  const theme = useTheme();
  const numbers = [
    "/",
    7,
    8,
    9,
    "cross",
    "*",
    4,
    5,
    6,
    "calendar",
    "-",
    1,
    2,
    3,
    "",
    "+",
    "₽",
    0,
    ",",
    "",
  ];
  const mainButtons = [7, 8, 9, 4, 5, 6, 1, 2, 3, "₽", 0, ","];
  const gap = 8;
  const cellSize = 60;

  const addCount = (num: string | number) => {
    if (num === "₽" || num === "") return;

    if (num === "/") {
      alert("ДОБАВИТЬ ДЕЛЕНИЕ");
      return;
    }
    if (num === "*") {
      alert("ДОБАВИТЬ УМНОЖЕНИЕ");
      return;
    }
    if (num === "-") {
      alert("ДОБАВИТЬ ВЫЧИТАНИЕ");
      return;
    }
    if (num === "+") {
      alert("ДОБАВИТЬ СЛОЖЕНИЕ");
      return;
    }

    if (num === "cross") {
      setValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
      return;
    }
    if (num === "calendar") {
      openCalendar?.();
      return;
    }

    // обычные числа и знаки вроде 0,1,2,3
    setValue((prev) => (prev === "0" ? String(num) : prev + String(num)));
  };

  return (
    <FlatList
      data={numbers}
      keyExtractor={(_, index) => index.toString()}
      numColumns={5}
      scrollEnabled={false}
      contentContainerStyle={{
        marginHorizontal: -gap / 2,
        paddingVertical: gap / 2,
      }}
      renderItem={({ item, index }) => {
        let content: string | number | JSX.Element = item;
        switch (item) {
          case "/":
            content = <IconDevide width={32} height={32} color={theme.text} />;
            break;
          case "*":
            content = <IconCross width={32} height={32} color={theme.text} />;
            break;
          case "cross":
            content = <IconClear width={32} height={32} color={theme.text} />;
            break;
          case "calendar":
            content = (
              <IconCalendar width={32} height={32} color={theme.text} />
            );
            break;
        }

        const isMainButton = mainButtons.includes(item);
        const backgroundColor = isMainButton
          ? theme.card
          : withOpacity(theme.card, 0.5);
        const borderColor = isMainButton
          ? "transparent"
          : withOpacity(theme.text, 0.5);
        const contentColor = theme.text; // цвет текста или иконки

        return (
          <TouchableOpacity
            style={{
              width: cellSize,
              height: cellSize,
              margin: gap / 2,
              borderRadius: 16,
              backgroundColor,
              borderColor,
              borderWidth: 1.5,
              borderStyle: "solid",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => addCount(item)}
          >
            {typeof content === "string" || typeof content === "number" ? (
              <Text style={{ color: contentColor, fontSize: 32 }}>
                {content}
              </Text>
            ) : (
              content
            )}
          </TouchableOpacity>
        );
      }}
    />
  );
}
