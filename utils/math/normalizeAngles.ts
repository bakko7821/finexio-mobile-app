import { PieItem } from "../types/chart";

export const normalizeAngles = (
  data: PieItem[],
  radius: number,
  iconSize = 24,
  padding = 56,
) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  const minArcLength = iconSize + padding;
  const minAngle = (minArcLength / radius) * (180 / Math.PI);

  let angles = data.map((item) => (item.value / total) * 360);

  // минимальный размер
  angles = angles.map((angle) => (angle < minAngle ? minAngle : angle));

  // нормализация обратно в 360°
  const sum = angles.reduce((a, b) => a + b, 0);
  const scale = 360 / sum;

  return angles.map((angle) => angle * scale);
};
