import { getLargeInput } from "./fixture";
import {
  accumulateUntilInfiniteLoop,
  accumulateUntilProgramFinishes,
} from "./handheld-halting";

describe("Handheld Halting", () => {
  describe("Part One", () => {
    describe("when the input is short", () => {
      it("should return the accumulator value", () => {
        const input = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;
        const output = accumulateUntilInfiniteLoop(input);

        expect(output).toEqual(5);
      });
    });

    describe("when the input is large", () => {
      it("should return the accumulator value", () => {
        const input = getLargeInput();
        const output = accumulateUntilInfiniteLoop(input);

        expect(output).toEqual(1941);
      });
    });
  });

  describe("Part Two", () => {
    describe("when the input is short", () => {
      it("should return the accumulator value after the program finishes", () => {
        const input = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;
        const output = accumulateUntilProgramFinishes(input);

        expect(output).toEqual(8);
      });
    });

    describe("when the input is large", () => {
      it("should return the accumulator value after the program finishes", () => {
        const input = getLargeInput();
        const output = accumulateUntilProgramFinishes(input);

        expect(output).toEqual(2096);
      });
    });
  });
});
