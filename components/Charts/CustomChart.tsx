import { useTheme } from "@/hooks/useTheme";
import { PieItem } from "@/utils/types/chart";
import { TouchableOpacity } from "react-native";

interface CustomChartProps {
  data: PieItem[];
  changeType: () => void;
}

export default function CustomChart({ data, changeType }: CustomChartProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ backgroundColor: theme.card }}
      className="flex-1 w-full relative"
      onPress={changeType}
    ></TouchableOpacity>
  );
}
