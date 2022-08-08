export const splitArrayByColumns = <T>(array: T[], count: number): T[][] => {
  if (count <= 0) {
    return [];
  }

  const builtColumns: T[][] = [];

  for (let i = 0; i < count; i++) {
    const columnData: T[] = [];

    for (let j = i % count; j < array.length; j += count) {
      columnData.push(array[j]);
    }

    builtColumns.push(columnData);
  }

  return builtColumns;
};
