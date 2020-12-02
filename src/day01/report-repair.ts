const TARGET: number = 2020;

export const repairReportTwoEntries = (
  input: Array<number>,
  target = TARGET
): number => {
  for (const n of input) {
    const remaining = target - n;
    const found = input.find((i) => i === remaining);

    if (found) {
      return n * found;
    }
  }

  return 0;
};

export const repairReportThreeEntries = (input: Array<number>): number => {
  for (const n of input) {
    const remaining = TARGET - n;
    const found = repairReportTwoEntries(input, remaining);

    if (found) {
      return n * found;
    }
  }

  return 0;
};
