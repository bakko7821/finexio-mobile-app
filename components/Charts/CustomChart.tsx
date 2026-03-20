import { useTheme } from "@/hooks/useTheme";
import { PieItem } from "@/utils/types/chart";
import { Text, TouchableOpacity, View } from "react-native";

import { withOpacity } from "@/utils/colors";
import { RenderIcon } from "../UI/RenderIcon";

interface CustomChartProps {
  data: PieItem[];
  changeType: () => void;
}

export default function CustomChart({ data, changeType }: CustomChartProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={changeType}
      className="w-full flex-1 flex-wrap flex-row items-start justify-between gap-2"
    >
      {data.map((item) => (
        <View
          key={item.value}
          className="items-center justify-center flex-col gap-1"
        >
          <View
            style={{ backgroundColor: withOpacity(item.color, 0.4) }}
            className="rounded-full items-center justify-center p-2"
          >
            <RenderIcon
              width={32}
              height={32}
              name={item.icon}
              color={item.color}
            />
          </View>
          <Text style={{ color: item.color }} className="text-xs font-medium">
            {item.value} ₽
          </Text>
        </View>
      ))}
    </TouchableOpacity>
  );
}
