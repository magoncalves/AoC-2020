import { pipe } from "ramda";

const PREAMBLE = 25;

const extractSequence = (input: string): number[] =>
  input.split("\n").map(Number);

const findNumberNotMatchingPreamble = (preamble: number) => (
  sequence: number[]
): number => {
  const findNumber = (
    list: number[],
    target: number,
    nextIndex: number
  ): number => {
    const search = list.find((value, idx, arr) => {
      if (idx === arr.length - 1) {
        return false;
      }

      const remaining = target - value;
      const found = arr.slice(idx + 1).find((a) => a === remaining);

      return Boolean(found);
    });

    if (!search) {
      return target;
    }

    const newIndex = nextIndex + preamble;
    return findNumber(
      sequence.slice(nextIndex, newIndex),
      sequence[newIndex],
      nextIndex + 1
    );
  };

  return findNumber(sequence.slice(0, preamble), sequence[preamble], 1);
};

const getContiguousSet = (sequence: number[]) => (target: number) => {
  // const findSet = (
  //   list: number[],
  //   nextIndex: number,
  //   relativeIndex: number,
  //   accumulator
  // ): number[] => {
  //   const newList = list.concat(sequence[relativeIndex]);
  //   const sum = accumulator + sequence[relativeIndex];

  //   if (sum === target) {
  //     return newList;
  //   }
  //   if (sum < target) {
  //     return findSet(newList, nextIndex, relativeIndex + 1, sum);
  //   }
  //   return findSet([], nextIndex + 1, nextIndex + 1, 0);
  // };

  // return findSet([], 0, 0, 0);

  // NOTE: Solution above is exceeding the maximum call stack for the larger data set :(
  for (let i = 0; i < sequence.length; i++) {
    let total = sequence[i];

    for (let j = i + 1; j < sequence.length; j++) {
      const subTotal = total + sequence[j];

      if (subTotal > target) {
        break;
      } else if (subTotal === target) {
        return sequence.slice(i, j);
      } else {
        total += sequence[j];
      }
    }
  }
};

const getEncryptionWeakness = (contiguousSet: number[]): number => {
  const sortedList = [...contiguousSet].sort((a, b) => a - b);
  return sortedList[0] + sortedList[sortedList.length - 1];
};

export const getNumberNotMatchingPreamble = (
  input: string,
  preamble = PREAMBLE
): number => {
  const number = pipe(
    extractSequence,
    findNumberNotMatchingPreamble(preamble)
  )(input);

  return number;
};

export const findEncryptionWeakness = (
  input: string,
  preamble = PREAMBLE
): number => {
  const sequence = extractSequence(input);

  const number = pipe(
    findNumberNotMatchingPreamble(preamble),
    getContiguousSet(sequence),
    getEncryptionWeakness
  )(sequence);

  return number;
};
