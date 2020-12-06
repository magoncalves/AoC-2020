import { getHighestSeatID, getMySeatID } from "./binary-boarding";
import { getLargeInput } from "./fixture";

describe("Binary Boarding", () => {
  describe("Part One", () => {
    describe("when the input is short", () => {
      it("should respond with the highest seat ID", () => {
        const input = `FBFBBFFRLR
BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`;
        const output = getHighestSeatID(input);

        expect(output).toEqual(820);
      });
    });

    describe("when the input is large", () => {
      it("should respond with the highest seat ID", () => {
        const input = getLargeInput();
        const output = getHighestSeatID(input);

        expect(output).toEqual(911);
      });
    });
  });

  describe("Part Two", () => {
    describe("when the input is short", () => {
      it("should respond with the missing seat ID", () => {
        const input = `FBFBBFFLLL
FBFBBFFLLR
FBFBBFFLRR
FBFBBFFRLL`;
        const output = getMySeatID(input);

        expect(output).toEqual(354);
      });
    });

    describe("when the input is large", () => {
      it("should respond with the missing seat ID", () => {
        const input = getLargeInput();
        const output = getMySeatID(input);

        expect(output).toEqual(629);
      });
    });
  });
});
