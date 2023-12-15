import { COLORS_ARRAY } from "@/helpers/colors";

export const getNextColor = (color?: string) => {
  const index = COLORS_ARRAY.findIndex((c) => c === color);

  if (index === -1) return COLORS_ARRAY[0];

  return COLORS_ARRAY[(index + 1) % COLORS_ARRAY.length];
};
