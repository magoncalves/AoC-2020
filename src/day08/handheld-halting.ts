import { clone, pipe } from "ramda";

type Instruction = {
  command: string;
  value: number;
};

const getInstructions = (input: string): string[] => input.split("\n");

const buildInstructions = (instructions: string[]): Instruction[] =>
  instructions.map((i) => {
    const [command, value] = i.trim().split(" ");
    return { command, value: parseInt(value) };
  });

const nextInstructionValues = (
  instructions: Instruction[],
  index: number
): { index: number; value: number } => {
  const { command, value } = instructions[index];

  if (command === "nop") {
    return { index: index + 1, value: 0 };
  }
  if (command === "acc") {
    return { index: index + 1, value };
  }
  // jmp
  return { index: index + value, value: 0 };
};

const getAccumulatorForInfiniteLoop = (
  instructions: Instruction[],
  acc = 0,
  idx = 0,
  visited = []
): number => {
  if (visited.includes(idx)) {
    return acc;
  }

  const { index, value } = nextInstructionValues(instructions, idx);
  return getAccumulatorForInfiniteLoop(instructions, acc + value, index, [
    ...visited,
    idx,
  ]);
};

const tryToAccumulateUntilEnd = (
  instructions: Instruction[],
  acc = 0,
  idx = 0,
  visited = []
): number | null => {
  if (visited.includes(idx)) {
    return null;
  }
  if (idx >= instructions.length) {
    return acc;
  }

  const { index, value } = nextInstructionValues(instructions, idx);
  return tryToAccumulateUntilEnd(instructions, acc + value, index, [
    ...visited,
    idx,
  ]);
};

const accumulateReplacing = (
  instructions: Instruction[],
  from: string,
  to: string,
  replacedIndex = 0
) => {
  const idx = instructions.map((i) => i.command).indexOf(from, replacedIndex);
  if (idx === -1) {
    return null;
  }

  const replacedInstructions = instructions.map((i) => ({ ...i }));
  replacedInstructions[idx].command = to;

  const acc = tryToAccumulateUntilEnd(replacedInstructions);
  if (acc === null) {
    return accumulateReplacing(instructions, from, to, idx + 1);
  }
  return acc;
};

const getAccumulatorFixingLoop = (instructions: Instruction[]): number => {
  const accNopToJmp = accumulateReplacing(instructions, "nop", "jmp");
  const accJmpToNop = accumulateReplacing(instructions, "jmp", "nop");

  return accNopToJmp || accJmpToNop;
};

export const accumulateUntilInfiniteLoop = (input: string): number => {
  const accumulator = pipe(
    getInstructions,
    buildInstructions,
    getAccumulatorForInfiniteLoop
  )(input);

  return accumulator;
};

export const accumulateUntilProgramFinishes = (input: string): number => {
  const accumulator = pipe(
    getInstructions,
    buildInstructions,
    getAccumulatorFixingLoop
  )(input);

  return accumulator;
};
