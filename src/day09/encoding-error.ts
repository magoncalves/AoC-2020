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
  const findSet = (
    list: number[],
    nextIndex: number,
    relativeIndex: number,
    accumulator
  ): number[] => {
    // new Promise((resolve) => {
    const newList = list.concat(sequence[relativeIndex]);
    const sum = accumulator + sequence[relativeIndex];

    // console.log({ newList, sum });

    if (sum === target) {
      // resolve(newList);
      return newList;
    }
    if (sum < target) {
      // return setImmediate(() =>
      return findSet(newList, nextIndex, relativeIndex + 1, sum);
      // );
    }
    // return setImmediate(() =>
    return findSet([], nextIndex + 1, nextIndex + 1, 0);
    // );
  };
  // });

  return findSet([], 0, 0, 0);
};

const getEncryptionWeakness = (contiguousSet: number[]): number => {
  const sortedList = [...contiguousSet].sort();
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
  // return getEncryptionWeakness(contiguousSet);
};
