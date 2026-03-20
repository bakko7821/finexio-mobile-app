interface SizeResult {
  size: number;
}

export const calculateSizes = (
  data: { value: number }[],
  minSize = 32,
  maxSize = 120,
): SizeResult[] => {
  if (!data.length) return [];

  const values = data.map((item) => item.value);

  const min = Math.min(...values);
  const max = Math.max(...values);

  // edge case: все значения одинаковые
  if (min === max) {
    const middle = Math.round((minSize + maxSize) / 2);

    return data.map(() => ({
      size: middle,
    }));
  }

  return data.map((item) => {
    const normalized =
      (Math.log(item.value) - Math.log(min)) / (Math.log(max) - Math.log(min));

    const size = minSize + normalized * (maxSize - minSize);

    return {
      size: Math.round(size),
    };
  });
};
