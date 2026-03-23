import { PieItem } from "@/utils/types/chart";

export interface Segment extends PieItem {
  startAngle: number;
  endAngle: number;
}
