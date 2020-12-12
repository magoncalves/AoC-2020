import { pipe } from "ramda";

const getSortedList = (input: string): number[] =>
  input
    .split("\n")
    .map(Number)
    .sort((a, b) => a - b);

const addDeviceBuiltInAdapter = (adapters: number[]) => [
  0,
  ...adapters,
  adapters[adapters.length - 1] + 3,
];

const getJoltDifferences = (targetDifferences: number[]) => (
  adapters: number[]
) =>
  targetDifferences.map((target) =>
    adapters.filter((a, index) => a - (adapters[index - 1] || 0) === target)
  );

const getSets = (adapters: number[]): number[][] =>
  adapters.map((adapter) =>
    adapters.filter((a) => adapter > a && adapter - 3 <= a)
  );

const getLengths = (adaptersSets: number[][]): number[] =>
  adaptersSets.map((set) => set.length);

const countSequences = (sequenceLengths: number[]): number =>
  [...sequenceLengths].reduce((acc, cur, index, arr) => {
    const previousSequence = arr.slice(index - cur, index);

    acc = previousSequence.reduce((a, b) => a + b, 0) || 1;
    arr[index] = acc;

    return acc;
  }, 0);

const getProduct = (joltDifferences: number[][]): number =>
  joltDifferences.map((j) => j.length).reduce((acc, cur) => acc * cur, 1);

export const getProductOfJoltDifferencesBetween = (
  input: string,
  differences: number[]
): number => {
  const product = pipe(
    getSortedList,
    addDeviceBuiltInAdapter,
    getJoltDifferences(differences),
    getProduct
  )(input);

  return product;
};

export const getNumberOfDistinctArrangements = (input: string): number => {
  const product = pipe(
    getSortedList,
    addDeviceBuiltInAdapter,
    getSets,
    getLengths,
    countSequences
  )(input);

  return product;
};
